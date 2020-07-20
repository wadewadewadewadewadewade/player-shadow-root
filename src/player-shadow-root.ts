import { CustomElement } from './CustomElementDecorator';

@CustomElement({
  selector: 'player-shadow-root',
  template: `
    <div class="player-container icon-play loading">
      <svg class="icon-play">
        <path glyph-name="play" d="M772 333l-741-412q-13-7-22-2t-9 20v822q0 14 9 20t22-2l741-412q13-7 13-17t-13-17z" horiz-adv-x="785.7" />
      </svg>
      <svg class="icon-pause">
        <path glyph-name="play" d="M857 743v-786q0-14-10-25t-26-11h-285q-15 0-25 11t-11 25v786q0 14 11 25t25 11h285q15 0 26-11t10-25z m-500 0v-786q0-14-10-25t-26-11h-285q-15 0-25 11t-11 25v786q0 14 11 25t25 11h285q15 0 26-11t10-25z" horiz-adv-x="857.1" />
      </svg>
      <svg class="progress-ring white">
        <circle class="progress-ring__circle"
          stroke="white"
          stroke-width="4"
          fill="transparent" />
      </svg>
      <svg class="progress-ring">
        <circle
          class="progress-ring__circle"
          stroke="gray"
          stroke-width="4"
          fill="transparent" />
      </svg>
    </div>
  `,
  style: `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .player-container {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 2s;
      opacity: 1;
      position:relative;
    }
    .player-container:not(.loading) {
      cursor: pointer;
    }
    .icon-play path, .icon-pause path {
      transform: scale(0.1);
    }
    .player-container .icon-pause, .player-container .icon-play {
      position:absolute;
      fill:rgba(255,255,255,0.5);
      display:none;
      justify-content:center;
      align-items:center;
      overflow:visible;
      width:44%;
      height:44%;
    }
    .player-container.icon-pause .icon-pause {
      display:flex;
      margin:1rem -0.125rem 0 0.125rem;
    }
    .player-container.icon-play .icon-play {
      display:flex;
      margin:1rem -1rem 0 1rem;
    }
    .loading {
      opacity: 0
    }
    /* indicator ring modified from https://css-tricks.com/building-progress-ring-quickly/ */
    .progress-ring {
      position:absolute;
      overflow:visible;
      z-index:2;
      left:0;right:0;top:0;bottom:0;
    }
    .progress-ring.white {
      z-index:3;
    }
    .progress-ring__circle {
      transition: 0.35s stroke-dashoffset;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
    #player { display:none; }
  `,
  useShadow: true
})
class Player extends HTMLElement {
  private defaults = {
    playerType: 'audio',
    width: 120,
    height: 120
  }
  private playing = false
  private initialized = false
  private width: number = 120
  private height: number = 120
  private progressIndicator: SVGCircleElement | null = null
  private wrapper: HTMLElement | null = null
  constructor() {
    super();
  }
  connectedCallback() {
    if (this.initialized) {
      if (this.wrapper) {
        // trigger loading CSS transition
        this.wrapper.classList.remove('loading')
      }
    }
  }
  componentWillMount() {
    if (!this.initialized) {
      const settings = {
        ...this.defaults,
        src: this.getAttribute('src')
      }
      const w = this.getAttribute('width')
      if (w) {
        settings.width = parseInt(w,10)
      }
      const h = this.getAttribute('height')
      if (h) {
        settings.height = parseInt(h,10)
      }
      this.width = settings.width
      this.height = settings.height
      // create DOM
      if (this.shadowRoot) {
        this.wrapper = this.shadowRoot.querySelector('.player-container')
        if (this.wrapper) {
          this.wrapper.setAttribute('style',`width:${settings.width}px;height:${settings.height}px`)
          this.progressIndicator = this.shadowRoot.querySelector('circle') as SVGCircleElement
          const radius = (this.width < this.height ? this.width : this.height) / 2
          const circumference = radius * 2 * Math.PI
          this.progressIndicator.style.strokeDasharray = `${circumference} ${circumference}`
          // size the progress indicator circles
          this.shadowRoot.querySelectorAll('.progress-ring').forEach((svg) => this.sizeCircle(svg))
          // set up the player
          const player: HTMLAudioElement | HTMLVideoElement = document.createElement(settings.playerType) as HTMLAudioElement | HTMLVideoElement;
          if (settings.src) {
            player.src = settings.src
          }
          player.setAttribute('id', 'player')
          const fallbackText = document.createTextNode(`Your browser does not support the {$this.playerType} element.`)
          this.wrapper.appendChild(player)
          // set progress indicator to 0
          this.setProgress(0);
          // event listeners
          player.addEventListener('timeupdate', (e) => {
            this.setProgress(Math.round(player.currentTime / player.duration * 100))
          })
          player.addEventListener('ended', (e) => {
            this.playing = false;
            player.currentTime = 0;
          })
          this.wrapper.addEventListener('click', (e) => {
            e.stopPropagation()
            if (this.wrapper) {
              if (this.playing) {
                player.pause()
                this.playing = false
                this.wrapper.classList.remove('icon-pause')
                this.wrapper.classList.add('icon-play')
              } else {
                player.play()
                this.playing = true
                this.wrapper.classList.remove('icon-play')
                this.wrapper.classList.add('icon-pause')
              }
            }
          })
        }
      }
      this.initialized = true
      !this.wrapper && console.error('player error :', settings)
    }
  }
  componentWillUnmount() {
    this.wrapper && this.wrapper.classList.add('loading')
  }
  disconnectedCallback() {
    this.initialized = false
  }
  private sizeCircle = (svg: Element) => {
    const radius = (this.width < this.height ? this.width : this.height) / 2
    svg.setAttribute('width', (radius * 2).toString())
    svg.setAttribute('height', (radius * 2).toString())
    const circle: SVGCircleElement = svg.querySelector('circle') as SVGCircleElement
    circle.setAttribute('r', radius.toString())
    circle.setAttribute('cx', radius.toString())
    circle.setAttribute('cy', radius.toString())
  }
  private setProgress = (percent: number) => {
    if (this.progressIndicator) {
      const radius = (this.width < this.height ? this.width : this.height) / 2
      const circumference = radius * 2 * Math.PI
      const offset = circumference - percent / 100 * circumference
      this.progressIndicator.style.strokeDashoffset = `${offset}`
    }
  }
}
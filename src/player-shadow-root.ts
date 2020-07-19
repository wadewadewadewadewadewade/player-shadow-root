import { CustomElement } from './CustomElementDecorator';

@CustomElement({
  selector: 'player-shadow-root',
  template: `
    <div class="player-container icon-play loading">
      <svg class="progress-ring">
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
    /* fonts generated by fontello */
    @font-face {
      font-family: 'icons';
      src: url('data:application/octet-stream;base64,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') format('woff'),
      url('data:application/octet-stream;base64,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sgEAQistsFEssgEBQistsFIssgAAPistsFMssgABPistsFQssgEAPistsFUssgEBPistsFYssgAAQCstsFcssgABQCstsFgssgEAQCstsFkssgEBQCstsFossgAAQystsFsssgABQystsFwssgEAQystsF0ssgEBQystsF4ssgAAPystsF8ssgABPystsGAssgEAPystsGEssgEBPystsGIssDcrLrErARQrLbBjLLA3K7A7Ky2wZCywNyuwPCstsGUssAAWsDcrsD0rLbBmLLA4Ky6xKwEUKy2wZyywOCuwOystsGgssDgrsDwrLbBpLLA4K7A9Ky2waiywOSsusSsBFCstsGsssDkrsDsrLbBsLLA5K7A8Ky2wbSywOSuwPSstsG4ssDorLrErARQrLbBvLLA6K7A7Ky2wcCywOiuwPCstsHEssDorsD0rLbByLLMJBAIDRVghGyMhWUIrsAhlsAMkUHiwARUwLQBLuADIUlixAQGOWbABuQgACABjcLEABUKyAAEAKrEABUKzCgIBCCqxAAVCsw4AAQgqsQAGQroCwAABAAkqsQAHQroAQAABAAkqsQMARLEkAYhRWLBAiFixA2REsSYBiFFYugiAAAEEQIhjVFixAwBEWVlZWbMMAgEMKrgB/4WwBI2xAgBEAAA=') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    [class^="icon-"]:before, [class*=" icon-"]:before {
      font-family: "icons";
      font-style: normal;
      font-weight: normal;
    
      display: inline-block;
      text-decoration: inherit;
      width: 1em;
      margin-right: .2em;
      text-align: center;
      /* opacity: .8; */
    
      /* For safety - reset parent styles, that can break glyph codes*/
      font-variant: normal;
      text-transform: none;
    
      /* fix buttons height, for twitter bootstrap */
      line-height: 1em;
    
      /* Animation center compensation - margins should be symmetric */
      /* remove if not needed */
      margin-left: .2em;
    
      /* you can be more comfortable with increased icons size */
      /* font-size: 120%; */
    
      /* Uncomment for 3D effect */
      /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
    }
    .icon-pause:before { content: '\e800'; } /* '' */
    .icon-play:before { content: '\e834'; } /* '' */
    .player-container {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 1s;
      opacity: 1;
      position:relative;
    }
    .player-container:before {
      font-size:20vh;
      position:absolute;
      color:rgba(255,255,255,0.5);
      display:flex;
      justify-content:center;
      align-items:center;
      margin:0;
      padding:0;
    }
    .icon-play:before {
      margin:0px -2vh 0px 2vh;
    }
    .loading {
      opacity: 0
    }
    /* indicator ring modified from https://css-tricks.com/building-progress-ring-quickly/ */
    .progress-ring {
      width:100%;height:100%;
      position:absolute;
      overflow:visible;
      z-index:2;
      left:0;right:0;top:0;bottom:0;
    }
    .progress-ring:first-child {
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
    if (!this.initialized) {
      const settings = {
        ...this.defaults,
        src: this.getAttribute('src')
      }
      const w = this.getAttribute('width')
      if (w) {
        settings.width = parseInt(w,10)
      }
      const h = this.getAttribute('width')
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
          // size the progress indicator circles
          this.shadowRoot.querySelectorAll('circle').forEach((circle) => this.sizeCircle(circle))
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
          player.addEventListener('timeupdated', (e) => {
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
                this.wrapper.classList.remove('icon-play')
                this.wrapper.classList.add('icon-pause')
              } else {
                player.play()
                this.playing = false
                this.wrapper.classList.remove('icon-pause')
                this.wrapper.classList.add('icon-play')
              }
            }
          })
        }
      }
      this.initialized = true
      console.log('player ' + (this.wrapper ? 'loaded' : 'error') + ' :', settings)
    }
  }
  componentWillMount() {
    // trigger loading CSS transition
    this.wrapper && this.wrapper.classList.remove('loading')
  }
  componentWillUnmount() {
    // trigger loading CSS transition
    this.wrapper && this.wrapper.classList.add('loading')
  }
  disconnectedCallback() {
    this.initialized = false
  }
  private sizeCircle = (circle: SVGCircleElement) => {
    const radius = (this.width < this.height ? this.height : this.width) / 2
    circle.setAttribute('r', radius.toString())
    circle.setAttribute('cx', radius.toString())
    circle.setAttribute('cy', radius.toString())
  }
  private setProgress = (percent: number) => {
    if (this.progressIndicator) {
      const radius = this.width < this.height ? this.height : this.width
      const circumference = radius * 2 * Math.PI;
      const offset = this.width - percent / 100 * circumference;
      this.progressIndicator.style.strokeDashoffset = offset.toString();
    }
  }
}
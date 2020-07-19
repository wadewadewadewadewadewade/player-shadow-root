import { CustomElement } from './CustomElementDecorator';
import stylesheet from './player-shadow-root.scss'

interface PlayerSettings {
  playerType: string
  width: number
  height: number
  src: string
}

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
  style: stylesheet,
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
      this.wrapper = this.querySelector('.player-container')
      if (this.wrapper) {
        this.wrapper.setAttribute('style',`width:{$settings.width}px;height:{$settings.height}px`)
        this.progressIndicator = this.querySelector('circle') as SVGCircleElement
        // size the progress indicator circles
        this.querySelectorAll('circle').forEach((circle) => this.sizeCircle(circle))
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
    const radius = this.width < this.height ? this.height : this.width
    circle.setAttribute('r', (radius / 2).toString())
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
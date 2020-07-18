import { CustomElement } from './CustomElementDecorator';
import stylesheet from './player-shadow-root.scss'

interface PlayerSettings {
  playerType: string
  width: number
  height: number
  src: string
}

@CustomElement({
  selector: 'player'
})
class Player extends HTMLElement {
  private defaults = {
    playerType: 'audio',
    width: 120,
    height: 120
  }
  private playing = false
  private width: number
  private height: number
  private progressIndicator: HTMLElement
  private wrapper: HTMLElement
  constructor(document: HTMLDocument, settings: PlayerSettings) {
    super();
    settings = {
      ...this.defaults,
      ...settings
    }
    console.log('player loaded: ', settings)
    this.width = settings.width
    this.height = settings.height
    // create DOM
    this.wrapper = document.createElement('div')
    this.wrapper.setAttribute('class','player-container icon-play loading')
    this.wrapper.setAttribute('style',`width:{$settings.width}px;height:{$settings.height}px`)
    const circle = this.circle(document, 'white')
    this.progressIndicator = circle.children[0] as HTMLElement
    this.wrapper.appendChild(circle)
    this.wrapper.appendChild(this.circle(document, 'gray'))
    const player: HTMLAudioElement | HTMLVideoElement = document.createElement(settings.playerType) as HTMLAudioElement | HTMLVideoElement;
    player.src = settings.src
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
    })
    // create shadow DOM
    var shadow = this.attachShadow({mode: 'open'});
    var style = document.createElement('style');
    style.appendChild(stylesheet)
    shadow.appendChild(style)
    shadow.appendChild(this.wrapper)
  }
  componentWillMount() {
    // trigger loading CSS transition
    this.wrapper.classList.remove('loading')
  }
  componentWillUnmount() {
    // trigger loading CSS transition
    this.wrapper.classList.add('loading')
  }
  private circle = (document: HTMLDocument, stroke: string) => {
    const radius = this.width < this.height ? this.height : this.width
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGElement
    svg.setAttribute('width', (radius * 2).toString())
    svg.setAttribute('height', (radius * 2).toString())
    svg.setAttribute('class', 'progress-ring')
    const circle = document.createElement('circle')
    circle.setAttribute('class', 'progress-ring__circle')
    circle.setAttribute('stroke', stroke)
    circle.setAttribute('stroke-width', '4')
    circle.setAttribute('fill', 'transparent')
    circle.setAttribute('r', (radius / 2).toString())
    circle.setAttribute('cx', radius.toString())
    circle.setAttribute('cy', radius.toString())
    svg.appendChild(circle)
    return svg
  }
  private setProgress = (percent: number) => {
    const radius = this.width < this.height ? this.height : this.width
    const circumference = radius * 2 * Math.PI;
    const offset = this.width - percent / 100 * circumference;
    this.progressIndicator.style.strokeDashoffset = offset.toString();
  }
}
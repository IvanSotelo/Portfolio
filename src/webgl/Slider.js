import gsap from 'gsap'
import Plane from './Plane'

const store = {
  ww: window.innerWidth,
  wh: window.innerHeight,
  isDevice: navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
}

export default class Slider {
  constructor (el, scene, opts = {}) {
    this.bindAll()

    this.el = el

    this.scene = scene

    this.opts = Object.assign({
      speed: 2,
      threshold: 50,
      ease: 0.075
    }, opts)

    this.ui = {
      items: this.el.querySelectorAll('.js-slide'),
      titles: document.querySelectorAll('.js-title'),
      lines: document.querySelectorAll('.js-progress-line')
    }

    this.state = {
      target: 0,
      current: 0,
      currentRounded: 0,
      y: 0,
      on: {
        x: 0,
        y: 0
      },
      off: 0,
      progress: 0,
      diff: 0,
      max: 0,
      min: 0,
      snap: {
        points: []
      },
      flags: {
        dragging: false
      }
    }

    this.items = []

    this.events = {
      move: store.isDevice ? 'touchmove' : 'mousemove',
      up: store.isDevice ? 'touchend' : 'mouseup',
      down: store.isDevice ? 'touchstart' : 'mousedown'
    }

    this.init()
  }

  bindAll () {
    ['onDown', 'onMove', 'onUp']
      .forEach(fn => { this[fn] = this[fn].bind(this) })
  }

  init () {
    return gsap.utils.pipe(
      this.setup(),
      this.on()
    )
  }

  destroy () {
    this.off()
    this.state = null
    this.items = null
    this.opts = null
    this.ui = null
  }

  on () {
    const { move, up, down } = this.events

    window.addEventListener(down, this.onDown)
    window.addEventListener(move, this.onMove)
    window.addEventListener(up, this.onUp)
  }

  off () {
    const { move, up, down } = this.events

    window.removeEventListener(down, this.onDown)
    window.removeEventListener(move, this.onMove)
    window.removeEventListener(up, this.onUp)
  }

  setup () {
    const { ww } = store
    const state = this.state
    const { items, titles } = this.ui

    const {
      width: wrapWidth,
      left: wrapDiff
    } = this.el.getBoundingClientRect()

    // Set bounding
    state.max = -(items[items.length - 1].getBoundingClientRect().right - wrapWidth - wrapDiff)
    state.min = 0

    // Global timeline
    this.tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: 'linear'
      }
    })
      .fromTo('.js-progress-line-2', {
        scaleX: 1
      }, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power3'
      }, 0)
      .fromTo('.js-titles', {
        yPercent: 0
      }, {
        yPercent: -(100 - (100 / titles.length))
      }, 0)
      .fromTo('.js-progress-line', {
        scaleX: 0
      }, {
        scaleX: 1
      }, 0)

    // Cache stuff
    for (let i = 0; i < items.length; i++) {
      const el = items[i]
      const { left, right, width } = el.getBoundingClientRect()

      // Create webgl plane
      const plane = new Plane()
      plane.init(el)

      this.scene.add(plane)

      // Timeline that plays when visible
      const tl = gsap.timeline({ paused: true })
        .fromTo(plane.mat.uniforms.uScale, {
          value: 0.65
        }, {
          value: 1,
          duration: 1,
          ease: 'linear'
        })

      // Push to cache
      this.items.push({
        el,
        plane,
        left,
        right,
        width,
        min: left < ww ? (ww * 0.775) : -(ww * 0.225 - wrapWidth * 0.2),
        max: left > ww ? state.max - (ww * 0.775) : state.max + (ww * 0.225 - wrapWidth * 0.2),
        tl,
        out: false
      })
    }
  }

  calc () {
    const state = this.state
    state.current += (state.target - state.current) * this.opts.ease
    state.currentRounded = Math.round(state.current * 100) / 100
    state.diff = (state.target - state.current) * 0.0005
    state.progress = gsap.utils.wrap(0, 1, state.currentRounded / state.max)

    this.tl && this.tl.progress(state.progress)
  }

  render () {
    this.calc()
    this.transformItems()
  }

  transformItems () {
    const { flags } = this.state

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const { translate, isVisible, progress } = this.isVisible(item)

      item.plane.updateX(translate)
      item.plane.mat.uniforms.uVelo.value = this.state.diff

      if (!item.out && item.tl) {
        item.tl.progress(progress)
      }

      if (isVisible || flags.resize) {
        item.out = false
      } else if (!item.out) {
        item.out = true
      }
    }
  }

  isVisible ({ left, right, width, min, max }) {
    const { ww } = store
    const { currentRounded } = this.state
    const translate = gsap.utils.wrap(min, max, currentRounded)
    const threshold = this.opts.threshold
    const start = left + translate
    const end = right + translate
    const isVisible = start < (threshold + ww) && end > -threshold
    const progress = gsap.utils.clamp(0, 1, 1 - (translate + left + width) / (ww + width))

    return {
      translate,
      isVisible,
      progress
    }
  }

  clampTarget () {
    const state = this.state

    state.target = gsap.utils.clamp(state.max, 0, state.target)
  }

  getPos ({ changedTouches, clientX, clientY, target }) {
    const x = changedTouches ? changedTouches[0].clientX : clientX
    const y = changedTouches ? changedTouches[0].clientY : clientY

    return {
      x, y, target
    }
  }

  onDown (e) {
    const { x, y } = this.getPos(e)
    const { flags, on } = this.state

    flags.dragging = true
    on.x = x
    on.y = y
  }

  onUp () {
    const state = this.state

    state.flags.dragging = false
    state.off = state.target
  }

  onMove (e) {
    const { x, y } = this.getPos(e)
    const state = this.state

    if (!state.flags.dragging) return

    const { off, on } = state
    const moveX = x - on.x
    const moveY = y - on.y

    if ((Math.abs(moveX) > Math.abs(moveY)) && e.cancelable) {
      e.preventDefault()
      e.stopPropagation()
    }

    state.target = off + (moveX * this.opts.speed)
  }
}

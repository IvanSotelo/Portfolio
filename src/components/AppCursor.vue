<template lang="pug">
.cursor(v-bind:class="[mouseClick ? 'click' : '' , mouseDrag ? 'drag' : '', mouseLink ? 'link' : '', mouseZoom ? 'zoom' : '', mouseImgDrag ? 'img-drag' : '']")
  .circle-indicator
    .circle
  .indicator
    .dot
    .arrow.left
    .arrow.right
    .arrow.top
    .arrow.bottom
    .plus
      span
      span
    span.left-addon
      strong Hola
    span.right-addon
      strong Hola
</template>

<script>
import { TweenMax } from 'gsap'
import { getOffset } from '@/utils/dom'

export default {
  name: 'AppCursor',
  data: () => ({
    DOM: {},
    bounds: {},
    magnet: null,
    focus: null,
    scale: 1,
    opacity: 1,
    winsize: {
      width: 0,
      height: 0
    },
    mousePos: {
      x: 0,
      y: 0
    },
    lastMousePos: {
      dot: {
        x: 0,
        y: 0
      },
      circle: {
        x: 0,
        y: 0
      },
      title: {
        x: 0,
        y: 0
      }
    },
    lastScale: 1,
    lastOpacity: 1,
    mouseLink: false,
    mouseClick: false,
    mouseDrag: false,
    mouseZoom: false,
    mouseImgDrag: false
  }),
  mounted () {
    this.DOM.el = this.$el
    this.DOM.dot = this.DOM.el.querySelector('.indicator')
    this.DOM.circle = this.DOM.el.querySelector('.circle-indicator')
    this.winsize.width = window.innerWidth
    this.winsize.height = window.innerHeight
    this.bounds = { dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect() }
    this.initEvents()
    requestAnimationFrame(() => this.render())
  },
  methods: {
    initEvents () {
      // Custom cursor chnages state when hovering on elements with 'data-hover'.
      [...document.querySelectorAll('[data-link]')].forEach((link) => {
        // const title = link.dataset.title ? link.dataset.title : ''
        // // Show the title next to the cursor.
        // link.addEventListener('mouseenter', () => this.setTitle(title))
        // link.addEventListener('mouseleave', () => this.setTitle(''))
        link.addEventListener('mouseenter', ev => this.enterLink(ev))
        link.addEventListener('mousemove', ev => this.moveLink(ev))
        link.addEventListener('mouseleave', ev => this.leaveLink(ev))
      })
      window.addEventListener('resize', () => {
        this.winsize.width = window.innerWidth
        this.winsize.height = window.innerHeight
      })
      window.addEventListener('mousedown', ev => this.click(ev))
      window.addEventListener('mouseup', ev => this.leave(ev))
      window.addEventListener('mousemove', ev => { this.mousePos = this.getMousePos(ev) })
    },
    dragEvents () {
      [...document.querySelectorAll('[data-drag]')].forEach((link) => {
        link.addEventListener('mouseenter', ev => this.enterDrag(ev))
        link.addEventListener('mouseleave', ev => this.leaveDrag(ev))
      })
    },
    lerp (a, b, n) {
      return (1 - n) * a + n * b
    },
    getMousePos (e) {
      const body = document.body
      let posx = 0
      let posy = 0
      !e && (e = window.event)
      if (e.pageX || e.pageY) {
        posx = e.pageX
        posy = e.pageY
      } else if (e.clientX || e.clientY) {
        posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft
        posy = e.clientY + body.scrollTop + document.documentElement.scrollTop
      }
      return { x: posx, y: posy }
    },
    render () {
      this.lastMousePos.dot.x = this.lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width / 2, 1)
      this.lastMousePos.dot.y = this.lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height / 2, 1)
      this.lastMousePos.circle.x = this.lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width / 2, 0.15)
      this.lastMousePos.circle.y = this.lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height / 2, 0.15)
      this.lastScale = this.lerp(this.lastScale, this.scale, 0.15)
      this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`
      this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`
      requestAnimationFrame(() => this.render())
    },
    setTitle (title) {
      // Sets the title content
      this.DOM.title.innerHTML = title
    },
    enterLink (event) {
      event.preventDefault()
      this.mouseLink = true
      this.focus = event.target.querySelector('[data-link-arrow]')
      this.magnet = event.target.querySelector('[data-link-magnet]')
    },
    leaveLink () {
      event.preventDefault()
      this.mouseLink = false
      if (this.magnet) {
        TweenMax.to(this.magnet, 0.3, {
          x: 0,
          y: 0
        })

        this.magnet = null
      }
    },
    moveLink (event) {
      event.preventDefault()
      if (this.magnet) {
        const magnetHeight = this.magnet.clientHeight - 2
        const magnetWidth = this.magnet.clientWidth

        const { left, top } = getOffset(event.target)

        const dx = (event.clientX - left) / magnetWidth - 0.5
        const dy = (event.clientY - top) / magnetHeight - 0.5

        TweenMax.to(this.magnet, 0.3, {
          x: dx * magnetWidth * 0.7,
          y: dy * magnetHeight * 0.7
        })
      }
    },
    enterDrag (event) {
      event.stopPropagation()
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        return event.preventDefault()
      }
      this.mouseDrag = true
    },
    leaveDrag () {
      this.mouseDrag = false
    },
    leave () {
      this.mouseClick = false
    },
    click () {
      this.mouseClick = true
    }
  }
}
</script>

<style lang="scss" scoped>
.cursor{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
    mix-blend-mode: difference;
    .circle-indicator,.indicator {
      position: relative;
      transform: translate3d(0,0,0) scale(1);
      will-change: transform;
    }
    .circle {
      position: absolute;
      width: 56px;
      height: 56px;
      border: 1px solid #fff;
      border-radius: 50%;
      opacity: 0.7;
    }
    .dot {
      position: absolute;
      width: 6px;
      height: 6px;
      background: #fff;
      border-radius: 50%;
    }
    .arrow {
      position: absolute;
      top: -2px;
      left: 0;
      border: 1px solid #fff;
      width: 6px;
      height: 6px;
      border-width: 1px 0 0 1px;
      opacity: 0;
      transition: opacity .3s,transform .3s;
      transform: translateX(-50px) rotate(-45deg);
      &.right {
        left: auto;
        right: 0;
        transform: translateX(50px) rotate(135deg);
      }
      &.top {
        left: -4px;
        top: -2px;
        transform: translateX(0) translateY(-50px) rotate(0);
      }
      &.bottom {
        left: -4px;
        top: auto;
        bottom: -2px;
        transform: translateX(0) translateY(50px) rotate(180deg);
      }
    }
    .circle, .dot {
      transform: translate3d(-50%,-50%,0);
      transition: opacity .3s,width .3s,height .3s;
    }
    .plus {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      opacity: 0;
      transition: opacity .4s;
      span {
        position: absolute;
        display: block;
        width: 100%;
        height: 1px;
        background: #fff;
        transition: transform .4s;
        transform: translate3d(-50%,-50%,0) rotate(-90deg);
      }
    }
    .left-addon,.right-addon {
      position: absolute;
      top: -7px;
      right: 100%;
      margin: 0 30px;
      white-space: nowrap;
      opacity: 0;
      font-size: 16px;
      transition: opacity .3s;
      &.visible {
        opacity: 1;
      }
    }
    &.click {
      .circle {
        transform: translate3d(-50%,-50%,0) scale3d(.9,.9,1);
      }
    }
    &.link,&.click{
      .circle {
        opacity: .6;
        width: 48px;
        height: 48px;
        border-style: dashed;
      }
      .dot {
        opacity: .3;
        width: 19px;
        height: 19px;
      }
    }
    &.drag {
      .arrow {
        opacity: 1;
        transform: translateX(-40px) rotate(-45deg);
        &.right {
          transform: translateX(40px) rotate(135deg);
        }
        &.top {
          opacity: 0;
        }
        &.bottom {
          opacity: 0;
        }
      }
    }
    &.img-drag {
      .arrow {
        opacity: 1;
        transform: translateX(-30px) rotate(-45deg);
        &.right {
          transform: translateX(30px) rotate(135deg);
        }
        &.top {
          transform: translateX(0) translateY(-30px) rotate(45deg);
        }
        &.bottom {
          transform: translateX(0) translateY(30px) rotate(225deg);
        }
      }
    }
    &.next {
      .arrow.right {
        opacity: 1;
        transform: translateX(36px) rotate(135deg);
      }
    }
    &.prev {
      .arrow.left {
        opacity: 1;
        transform: translateX(-36px) rotate(-45deg);
      }
    }
    &.zoom {
      .circle {
        width: 120px;
        height: 120px;
      }
      .dot {
        opacity: 0!important;
      }
      .plus {
        opacity: 1;
        span {
          &:nth-child(1) {
            transform: translate3d(-50%,-50%,0) rotate(0);
          }
          &:nth-child(2) {
            transform: translate3d(-50%,-50%,0) rotate(90deg);
          }
        }
      }
    }
}
</style>

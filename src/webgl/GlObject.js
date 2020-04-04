import * as THREE from 'three'
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

export default class GlObject extends THREE.Object3D {
  init (el) {
    this.el = el

    this.resize()
  }

  resize () {
    this.rect = this.el.getBoundingClientRect()
    const { left, top, width, height } = this.rect

    this.pos = {
      x: (left + (width / 2)) - (store.ww / 2),
      y: (top + (height / 2)) - (store.wh / 2)
    }

    this.position.y = this.pos.y
    this.position.x = this.pos.x

    this.updateX()
  }

  updateX (current) {
    current && (this.position.x = current + this.pos.x)
  }
}

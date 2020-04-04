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

export default class Gl {
  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.OrthographicCamera(
      store.ww / -2,
      store.ww / 2,
      store.wh / 2,
      store.wh / -2,
      1,
      10
    )
    this.camera.lookAt(this.scene.position)
    this.camera.position.z = 1

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setPixelRatio(1.5)
    this.renderer.setSize(store.ww, store.wh)
    this.renderer.setClearColor(0xffffff, 0)

    this.init()
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  init () {
    const div = document.querySelector('.site-footer')
    const domEl = this.renderer.domElement
    domEl.classList.add('dom-gl')
    div.appendChild(domEl)
  }
}

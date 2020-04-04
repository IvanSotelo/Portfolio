<template lang="pug">
.ui-splash-in
  .slider.js-drag-area
    .slider__inner.js-slider
      .slide.js-slide
        .slide__inner.js-slide__inner
          img.js-slide__img(src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex1.jpg" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 120%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 240%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="https://media0.giphy.com/media/UWcK2icE2jDtXj3AQs/giphy.gif?cid=ecf05e47c4d2a0ed73d38814532298fef1735caf78245541&rid=giphy.gif" alt="" crossorigin="anonymous" draggable="false")

  .titles
    .titles__title.titles__title--proxy Lorem ipsum
    .titles__list.js-titles
      .titles__title.js-title Ivan Sotelo
      .titles__title.js-title Juan Sotelo
      .titles__title.js-title knknlm
  .progress
    .progress__line.js-progress-line
    .progress__line.js-progress-line-2
</template>

<script>
import * as THREE from 'three'
import gsap from 'gsap'
import Slider from '@/webgl/Slider'
import Gl from '@/webgl/Gl'

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

export default {
  name: 'Home',
  data: () => ({
    gl: null,
    slider: null,
    cube: null,
    renderer: null,
    scene: null,
    camera: null
  }),
  methods: {
    init () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.OrthographicCamera(
        store.ww / -2,
        store.ww / 2,
        store.wh / 2,
        store.wh / -2,
        1,
        10
      )

      const div = document.querySelector('.site-footer')

      this.camera.lookAt(this.scene.position)
      this.camera.position.z = 1

      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      })
      this.renderer.setPixelRatio(1.5)
      this.renderer.setSize(store.ww, store.wh)
      this.renderer.setClearColor(0xffffff, 0)
      const domEl = this.renderer.domElement
      domEl.classList.add('dom-gl')
      div.appendChild(domEl)

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      this.cube = new THREE.Mesh(geometry, material)
      this.scene.add(this.cube)

      // const render = () => {}
    },
    render () {
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.gl = new Gl()
    this.slider = new Slider(document.querySelector('.js-slider'), this.gl.scene)

    const tick = () => {
      this.gl.render()
      this.slider.render()
    }

    gsap.ticker.add(tick)
  }
}
</script>

<style lang="scss" scoped>
.slider{
  position: fixed;
  padding: 0 22.5vw;
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;
  z-index: 2;

  &__inner{
    display: flex;
    position: relative;
  }
}

.slide{
  overflow: hidden;

  &:first-child{
    position: relative;
  }

  &:not(:first-child) {
    position: absolute;
    top: 0;
    height: 100%;
  }

  &__inner{
    position: relative;
    overflow: hidden;
    width: 45vw;
    padding-top: 56.5%;
  }

  img{
    display: none;

    /*
    height: 100%;
    width: 140%;
    position: absolute;
    top: 0;
    left: -20%;
    object-fit: cover;
    will-change: transform;
    */
  }
}
.titles{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  pointer-events: none;
  z-index: 3;

  &__list{
    position: absolute;
    top: 0;
    left: 0;
  }

  &__title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 6vw;
    font-weight: bold;
    letter-spacing: -0.1vw;
    color: #fff;

    &--proxy{
      visibility: hidden;
    }
  }
}

.progress{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.25rem;
  overflow: hidden;
  pointer-events: none;

  &__line{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: left;
    background-color: #fff;

    &:nth-child(2) {
      transform-origin: right;
    }
  }
}
</style>

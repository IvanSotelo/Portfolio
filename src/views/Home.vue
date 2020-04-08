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
import { gsap, TweenLite, Power2, DrawSVGPlugin } from 'gsap/all'
import Slider from '@/webgl/Slider'
import Gl from '@/webgl/Gl'

gsap.registerPlugin(DrawSVGPlugin)

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
    onResize () {
      const t = 100 / this.$el.querySelectorAll('.js-slide').length
      TweenLite.to(document.querySelector('.progress-f'), 1, {
        drawSVG: '0% ' + t + '%',
        ease: Power2.easeInOut
      })
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
    this.onResize()
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

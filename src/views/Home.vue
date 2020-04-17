<template lang="pug">
.ui-splash-in
  .slider.js-drag-area
    .slider__inner.js-slider(data-drag)
      .slide.js-slide
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/notiregion.png" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 120%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/cobach.jpg" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 240%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/gateway.png" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 360%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/ferlann.png" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 480%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/tex1.jpg" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 600%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/tex2.jpg" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 720%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/tex1.jpg" alt="" crossorigin="anonymous" draggable="false")
      .slide.js-slide(style="left: 840%;")
        .slide__inner.js-slide__inner
          img.js-slide__img(src="@/assets/gateway.png" alt="" crossorigin="anonymous" draggable="false")

  .titles
    .titles__title.titles__title--proxy Notiregion123
    .titles__list.js-titles
      .titles__title.js-title Notiregion
      .titles__title.js-title Cobach app
      .titles__title.js-title Gran Logia
      .titles__title.js-title Ferlann web
      .titles__title.js-title Mrt Mineria
      .titles__title.js-title Expert app
      .titles__title.js-title Notiregion1
      .titles__title.js-title Gateway
      .titles__title.js-title Notiregion
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
  padding: 0 27.5vw;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
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
    line-height: 1.15;
    font-weight: bold;
    letter-spacing: -0.1vw;
    color: #fff;

    &--proxy{
      visibility: hidden;
    }
  }
}
</style>

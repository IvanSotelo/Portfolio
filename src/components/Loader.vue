<template lang='pug'>
div
  .preloader
    .loader-wrapper
      p.loader-text--model Ivan Sotelo
      .loader-text-outter
        p.loader-text.loader-text--sizing Ivan Sotelo
        .loader-text-inner
          p.loader-text.loader-text--mask Ivan Sotelo
</template>

<script>
import ImagePreloader from 'image-preloader'
import { TweenLite, TimelineMax, TweenMax, Expo } from 'gsap'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Loader',
  data: () => ({
    images: [
      ''
    ]
  }),
  computed: {
    ...mapGetters([
      'audio'
    ])
  },
  methods: {
    ...mapActions([
      'setPreloadState'
    ]),
    preloadImages () {
      const preloader = new ImagePreloader()
      let loaded = 0
      preloader.onProgress = () => {
        const e = Math.abs(++loaded % 200)
        let i = -Math.abs(loaded % 200)
        if (Object.is(i, -0)) {
          i = 0
        }
        TweenLite.to(this.$el.querySelector('.loader-text-outter'), 1, {
          y: e
        })
        TweenLite.to(this.$el.querySelector('.loader-text-inner'), 1, {
          y: i
        })
      }
      preloader.preload(this.images)
        .then(status => {
          const t = this
          TweenMax.delayedCall(1, () => {
            const timeLineMax = new TimelineMax({
              paused: false,
              onComplete: () => {
                t.setPreloadState()
              }
            })
            timeLineMax.to(t.$el.querySelector('.preloader'), 1, {
              autoAlpha: 0,
              force3D: false,
              ease: Expo.easeOut
            })
          })
        })
    }
  },
  mounted () {
    var i = this
    const n = new TimelineMax({
      paused: false,
      onComplete: function () {
        i.preloadImages()
      }
    })
    n.from(this.$el.querySelector('.preloader'), 0, {
      autoAlpha: 0,
      ease: Expo.easeInOut
    }).to(this.$el.querySelector('.preloader'), 3, {
      autoAlpha: 1,
      ease: Expo.easeInOut
    })
  }
}
</script>

<style lang="scss">
.preloader{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  z-index: 999;
  opacity: 0;

  .loader-wrapper {
    // font-weight: 700;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    transform: uppercase;
    transition: opacity 1.5s cubic-bezier(.19, 1, .22, 1);

    p {
      font-size: 5rem;
      font-family: msd;
      text-transform: none;
      letter-spacing: 0;
      padding: 2vw 0;

      @media only screen and (max-width:768px) {
        font-size: 2.3rem;
      }
    }
      .loader-text--model {
          color: #54535c;
          position: absolute;
      }

      .loader-text-outter {
          position: relative;
          overflow: hidden;
          transform: translateY(100%);
      }

      .loader-text-inner {
          position: absolute;
          top: 0;
          left: 0;
          transform: translateY(-100%);
      }

      .loader-text--mask {
          color: #fff;
      }

      .loader-text--sizing {
          visibility: hidden;
      }
  }
}
</style>

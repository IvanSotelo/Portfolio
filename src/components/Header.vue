<template lang="pug">
header
  .logo-wrap(data-link)
    Link.ui-splash-in(text="Ivan Sotelo")
  router-link.ui-splash-in.logo-icon(to="/" data-link )
    .in(data-link-magnet)
      Logo.logo(iheight="30px")
  .ui-toggle.js--hover.side.no-events.ui-splash-in(@mouseover="onToggleEnter" @click="toggleMenu" data-link)
    .ui-toggle-in
      .ui-toggle-body
        .in
          .t.t1
            div
          .t.t2
            div
</template>

<script>
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import { TimelineMax, Power2 } from 'gsap'
import { mapActions } from 'vuex'

export default {
  name: 'Header',
  components: {
    Link,
    Logo
  },
  data: () => ({
    mouseHover: false
  }),
  methods: {
    ...mapActions([
      'toggleMenu'
    ]),
    onToggleEnter () {
      if (!this.mouseHover) {
        this.mouseHover = true
        this.$el.querySelectorAll('.t div').forEach((e, i) => {
          const t = new TimelineMax({
            onComplete: () => {
              this.mouseHover = false
            }
          })
          t.to(e, 0.4, {
            x: '100%',
            delay: 0.1 * i,
            ease: Power2.easeInOut
          })
          t.set(e, {
            x: '-100%'
          })
          t.to(e, 0.4, {
            x: '0%',
            ease: Power2.easeOut
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
header {
  position: absolute;
  z-index: 100;
}
.logo-wrap {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: fixed;
  height: 17vh;
  left: 40px;
  display: flex;
}
.logo-icon {
  position: fixed;
  stroke:#fff;
  pointer-events: all;
  -webkit-transform: translate(0);
  transform: translate(0);
  width: 10vh;
  height: 17vh;
  top: 0;
  left: 50%;
  margin-left: -5.5vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  opacity: 1;
  .logo {
    top: 50%;
    left: 50%;
    -webkit-transition: all .82s cubic-bezier(.44,.15,.2,1)!important;
      transition: all .82s cubic-bezier(.44,.15,.2,1)!important;
    -webkit-transform: translate(-50%,-50%) scale(1.4);
    transform: translate(-50%,-50%) scale(1.4);
    position: absolute;
    margin-top: -1px;
    &:hover {
      -webkit-transform: translate(-50%,-50%) scale(1.6);
      transform: translate(-50%,-50%) scale(1.6);
    }
  }
  @media (max-width: 900px) and (orientation: landscape), screen and (max-width: 640px) {
    width: 80px;
    height: 80px;
    margin-left: -40px;
  }
  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 100px;
    margin-left: -50px;
  }
}
.ui-toggle {
    width: 100px;
    height: 100px;
    right: 0;
    top: 0;
    padding-left: 0;
    .t {
      width: 100%;
      height: 2px;
      position: absolute;
      top: 50%;
      margin-top: -1px;
      overflow: hidden;
      -webkit-transition: all .82s cubic-bezier(.44,.15,.2,1)!important;
      transition: all .82s cubic-bezier(.44,.15,.2,1)!important;

      div {
        background: #fafafa;
        height: 100%;
        width: 100%;
        -webkit-transition: background .5s cubic-bezier(.4,.22,.21,1.04);
        transition: background .5s cubic-bezier(.4,.22,.21,1.04);
      }
    }
    .t1 {
      -webkit-transform: translateY(-3px);
      transform: translateY(-3px);
    }
    .t2 {
      -webkit-transform: translateY(3px);
      transform: translateY(3px);
    }
}
.js--menu-open-enter {
  .ui-toggle {
    .t1 {
      -webkit-transform: translate(0) rotate(-45deg);
      transform: translate(0) rotate(-45deg);
    }
    .t2 {
      -webkit-transform: translate(0) rotate(45deg);
      transform: translate(0) rotate(45deg);
    }
  }
}

.ui-toggle, .ui-toggle-in {
    width: 17vh;
    height: 17vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.ui-toggle-body {
    width: 22px;
}
.in {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>

<template lang="pug">
header(v-bind:class="[menuOpen ? 'js--menu-open-enter' : '']")
  .ui-toggle.js--hover.side.no-events.ui-splash-in(@mouseover="onToggleEnter" @click="toggleMenu")
    .ui-toggle-in
      .ui-toggle-body
        .in
          .t.t1
            div
          .t.t2
            div
</template>

<script>
import { TimelineMax, Expo } from 'gsap'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    mouseHover: false
  }),
  computed: {
    ...mapGetters([
      'menuOpen'
    ])
  },
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
            ease: Expo.easeInOut
          })
          t.set(e, {
            x: '-100%'
          })
          t.to(e, 0.4, {
            x: '0%',
            ease: Expo.easeOut
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
.ui-toggle {
    cursor: pointer;
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

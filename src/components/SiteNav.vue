<template lang="pug">
.site-nav
  .in
    nav.site-nav-body
      .body
        .site-nav-in.in
          ul.site-nav-right.site-nav-ul
            li.site-nav-li.clip-p
              .clip-w(@mouseover="onToggleEnter" @mouseleave="onToggleLeave" @click="toggleMenu()")
                router-link.site-nav-a.clip-t(to="/" data-link)
                 span.t
                  span.f
                    span.s WORKS
                  span.b.gs2
                    span.s WORKS
            li.site-nav-li.clip-p
              .clip-w(@mouseover="onToggleEnter" @mouseleave="onToggleLeave" @click="toggleMenu()")
                router-link.site-nav-a.clip-t(to="/about" data-link)
                 span.t
                  span.f
                    span.s ABOUT
                  span.b.gs2
                    span.s ABOUT
            li.site-nav-li.clip-p
              .clip-w(@mouseover="onToggleEnter" @mouseleave="onToggleLeave" @click="toggleMenu()")
                router-link.site-nav-a.clip-t(to="/contact" data-link)
                 span.t
                  span.f
                    span.s CONTACT
                  span.b.gs2
                    span.s CONTACT
    small.site-copy
      span © 2019 Ivan Sotelo.
    .site-nav-footer
      .site-nav-sns
        ul
          li.clip-w.clip-p
</template>

<script>
import Link from '@/components/Link'
import { mapGetters, mapActions } from 'vuex'
import { TweenLite } from 'gsap'

export default {
  name: 'SiteNav',
  components: {
    Link
  },
  data: () => ({
    timer_after: null
  }),
  computed: {
    ...mapGetters(['menuOpen'])
  },
  methods: {
    ...mapActions([
      'toggleMenuLeave',
      'toggleMenu'
    ]),
    onOpen () {
      document.querySelectorAll('.site-nav-a').forEach((e, i) => {
        var t = e.querySelectorAll('.t')
        e.classList.contains('router-link-exact-active') ? TweenLite.set(t, {
          y: '-50%'
        }) : TweenLite.set(t, {
          clearProps: 'all'
        })
      })
      clearTimeout(this.timer_after)
    },
    onClose () {
      const t = this
      this.toggleMenuLeave(true)
      this.timer_after = setTimeout(function () { t.toggleMenuLeave(false) }, 3000)
      // clearTimeout(this.timer_after)
    },
    onToggleEnter (ev) {
      var f = ev.target.querySelector('.site-nav-a') ? ev.target.querySelectorAll('.site-nav-a')[0] : ev.target
      if (!f.classList.contains('router-link-exact-active')) {
        f.classList.add('_hover')
        var t = ev.target.querySelectorAll('.t')
        TweenLite.set(t, {
          y: '-50%'
        })
      }
    },
    onToggleLeave (ev) {
      var f = ev.target.querySelector('.site-nav-a') ? ev.target.querySelectorAll('.site-nav-a')[0] : ev.target
      if (!f.classList.contains('router-link-exact-active')) {
        console.log('enteo')
        f.classList.remove('_hover')
        var t = ev.target.querySelectorAll('.t')
        TweenLite.set(t, {
          y: '0%'
        })
      }
    }
  },
  watch: {
    menuOpen (menuOpen) {
      menuOpen ? this.onOpen() : this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.gs1 {
    -webkit-text-stroke-color: hsla(0, 0%, 100%, .15)
}

.gs1,
.gs2 {
    -webkit-text-stroke-width: 1px;
    color: transparent
}

.gs2 {
    -webkit-text-stroke-color: hsla(0, 0%, 100%, .3)
}
.clip-t {
    -webkit-transform: translateX(120%);
    transform: translateX(120%)
}
.clip-w {
    overflow: hidden;
    position: relative
}
.body {
    width: 70vw;
    margin: 0 auto
}
.site-nav {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: z-index 0s .8s;
    transition: z-index 0s .8s;
    z-index: -999
}
.site-nav-body {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}
.site-nav-ul {
    width: 100%
}

.site-nav-li {
    text-transform: uppercase;
    margin-bottom: -.25em;
    margin-right: -.55em;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    position: relative;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end
}

.site-nav-li .clip-t {
    padding: 0 .05em
}

.site-nav-a {
    padding: 0;
    font-weight: 700;
    font-size: 6.85vw;
    font-family: Neue, sans-serif;
    position: relative;
    overflow: hidden;
    cursor: pointer
}

.site-nav-a,
.site-nav-a .t {
    display: block
}

.site-nav-a * {
    pointer-events: none
}

.site-nav-li .n {
    padding-top: .8em
}

.site-nav .flex-li {
    padding: 0
}

.site-nav-ul span {
    display: block
}

.site-nav-li .site-nav-a {
    line-height: .9;
    height: .9em
}

.site-nav .router-link-exact-active {
    pointer-events: none;
    cursor: default!important
}

.site-nav .section-information {
    width: 20%
}

.site-nav-in {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end
}

.site-copy {
  right: calc(8.5vh - 10px);
  bottom: calc(8.5vh - 10px);
  font-weight: 300;
  color: #8c8c8c;
}

.site-copy,
.site-nav-sns {
    z-index: 2;
    position: absolute
}

.site-copy,
.site-nav-sns,
.site-nav-sns ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.site-nav-sns ul {
    margin: 0 -.75em
}

.site-nav-sns a {
    padding: 0 .75em;
    display: block
}
.site-nav-li .site-nav-a,
.title .flip-a {
    line-height: .9;
    height: .9em
}

.site-nav-a .t {
    -webkit-transition: all .5s cubic-bezier(.4, .22, .21, 1.04);
    transition: all .5s cubic-bezier(.4, .22, .21, 1.04)
}

.site-nav-a .b .s,
.site-nav-a .f .s {
    display: block;
    -webkit-transition: all .5s cubic-bezier(.4, .22, .21, 1.04);
    transition: all .5s cubic-bezier(.4, .22, .21, 1.04)
}

.site-nav-a .f .s {
    -webkit-transform-origin: center left;
    transform-origin: center left;
    -webkit-transform: rotate(0deg) translate(0);
    transform: rotate(0deg) translate(0)
}

.site-nav-a .b .s {
    -webkit-transform-origin: center right;
    transform-origin: center right;
    -webkit-transform: rotate(3deg) translateY(50%);
    transform: rotate(3deg) translateY(50%)
}

.site-nav-a._hover .f .s {
    -webkit-transform: rotate(-3deg) translate(0);
    transform: rotate(-3deg) translate(0)
}

.site-nav-a._hover .b .s {
    -webkit-transform: rotate(0deg) translate(0);
    transform: rotate(0deg) translate(0)
}

.clip-w._hover .f .s {
    -webkit-transform: rotate(-3deg) translate(0);
    transform: rotate(-3deg) translate(0)
}

.clip-w._hover .b .s {
    -webkit-transform: rotate(0deg) translate(0);
    transform: rotate(0deg) translate(0)
}

.js--menu-open-enter .site-nav {
    -webkit-transition: z-index 0s;
    transition: z-index 0s;
    z-index: 9
}

.js--menu-open-enter .clip-t {
    -webkit-transform: translateX(0);
    transform: translateX(0)
}

.router-link-exact-active.site-nav-a .b .s,
.router-link-exact-active.site-nav-a .f .s {
    -webkit-transition: none!important;
    transition: none!important;
    -webkit-transform: rotate(0deg) translate(0)!important;
    transform: rotate(0deg) translate(0)!important
}
</style>

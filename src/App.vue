<template lang="pug">
  #app(v-bind:class="[isLoading ? 'is-loading' : 'is-loaded', menuOpen ? 'js--menu-open-enter' : '' , menuLeave ? 'js--menu-open-leave' : '' , routeName]")
    Header
    SiteNav
    app-cursor(v-if="!isMobile")
    Loader(v-if="isLoading")
    router-view.site-content(v-else)
    Footer
</template>

<script>
import Loader from '@/components/Loader'
import SiteNav from '@/components/SiteNav'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppCursor from '@/components/AppCursor'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Loader,
    Header,
    Footer,
    AppCursor,
    SiteNav
  },
  computed: {
    ...mapGetters(['isMobile', 'isLoading', 'menuOpen', 'menuLeave']),
    routeName () {
      return `is-${this.$route.name}`
    }
  }
}
</script>

<style lang="scss">
@import "./style/_utils.scss";
@import "./style/_reset.scss";
@import "./style/_base.scss";
body {
    font-family: 'source-sans-pro', sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
}

.ui-splash-in {
    opacity: 0;
}

.is-loaded {
  .ui-splash-in, .progress-f{
    -webkit-transition: opacity .82s cubic-bezier(.4,.22,.21,1.04);
    transition: opacity .82s cubic-bezier(.4,.22,.21,1.04);
    opacity: 1;
  }
  .site-mask {
    opacity: .85;
  }
  .progress-b {
    opacity: .15;
  }
}

.side {
  position: fixed;
}

.dom-gl{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.scroll-content {
    display: block;
    width: 100%;
    height: 100%;
    padding: 9rem 5vw 5rem;

    color: #fff;

    @include maxw($bp-mobile) {
        padding-top: 0;
    }
}

.scrollarea {
    height: 100%;
}

.scrollarea-ctn {
    position: relative;
    z-index: 5;
}

.page-title {
    position: fixed;
    top: 9rem;
    left: 5vw;
    z-index: -1;

    white-space: nowrap;
    font-size: calc(4vw + 8rem);
    line-height: .975;
    color: var(--textColor);

    opacity: .1;
}

.line-ctn {
    display: block;
    overflow: hidden;
}

.btn-inline {
    display: inline-block;

    line-height: 1.5;

    border-bottom: .1rem solid;
}

.js--menu-open-enter .clip-t,
.js--menu-open-enter .dom-gl,
.js--menu-open-enter .page-content,
.js--menu-open-enter .page-header,
.js--menu-open-enter .site-content,
.js--menu-open-enter .ui-fade-out,
.js--menu-open-enter .ui-splash-in,
.js--menu-open-enter .ui-toggle .t {
    -webkit-transition: all .82s cubic-bezier(.44, .15, .2, 1)!important;
    transition: all .82s cubic-bezier(.44, .15, .2, 1)!important
}

.js--menu-open-enter .dom-gl,
.js--menu-open-enter .site-content,
.js--menu-open-enter .ui-fade-out {
    opacity: 0!important
}

.js--menu-open-leave {
    overflow: hidden!important
}

.js--menu-open-leave .clip-t,
.js--menu-open-leave .page-content,
.js--menu-open-leave .page-header,
.js--menu-open-leave .ui-fade-out,
.js--menu-open-leave .ui-toggle .t {
    -webkit-transition: all .72s cubic-bezier(.55, .23, .18, 1.01);
    transition: all .72s cubic-bezier(.55, .23, .18, 1.01)
}

.js--menu-open-leave .dom-gl,
.js--menu-open-leave .site-content {
    -webkit-transition: all .82s cubic-bezier(.55, .23, .18, 1.01);
    transition: all .82s cubic-bezier(.55, .23, .18, 1.01)
}

.js--menu-open-leave .clip-t,
.js--menu-open-leave .ui-toggle-a .b {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%)
}

.js--menu-open-leave .ui-toggle-a .b {
    -webkit-transition: all .82s cubic-bezier(.55, .23, .18, 1.01);
    transition: all .82s cubic-bezier(.55, .23, .18, 1.01)
}

</style>

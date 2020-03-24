<template lang="pug">
  #app(v-bind:class="[isLoading ? 'is-loading' : 'is-loaded' , routeName]")
    Header
    Loader(v-if="isLoading")
    router-view(v-else)
</template>

<script>
import Loader from '@/components/Loader'
import Header from '@/components/Header'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Loader,
    Header
  },
  computed: {
    ...mapGetters(['isLoading']),
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
  .ui-splash-in {
    -webkit-transition: opacity .82s cubic-bezier(.4,.22,.21,1.04);
    transition: opacity .82s cubic-bezier(.4,.22,.21,1.04);
    opacity: 1;
  }
}

.side {
  position: fixed;
}

#scene {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100vh;

    pointer-events: none;
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
</style>

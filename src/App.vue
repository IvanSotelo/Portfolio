<template lang="pug">
  #app
    main
      .message This is a hover effects demo, please view on desktop.
      h1.page-title.title MY LAST &nbsp;
        span.slideshow__title__offset.title__offset WORKS
</template>
<style lang="scss">
@import "./style/_utils.scss";
@import "./style/_reset.scss";
@import "./style/_base.scss";
body {
    font-family: 'source-sans-pro', sans-serif;
    font-size: 1.4rem;
    font-weight: 400;
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

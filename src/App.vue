<template lang="pug">
  #app
    main
      .message This is a hover effects demo, please view on desktop.
      h1.page-title.title What's your next &nbsp;
        span.slideshow__title__offset.title__offset destination?
</template>
<style lang="stylus">
*,
*::after,
*::before
  box-sizing border-box

:root
    --color-text1: #fff;
    --color-text2: #ffcbcc;
    --color-text3: #b9e6e3;
    --color-text4: #e1d0a1;
    --color-text5: #ccd3f6;
    --color-bg1: #060606;
    --color-bg2: #493f46;
    --color-bg3: #2b3242;
    --color-bg4: #3b3232;
    --color-bg5: #2d3a40;
    --color-text: var(--color-text1);
    --color-bg: var(--color-bg1);
    --color-link: var(--color-text);
    --color-link-hover: #fff;
    font-size: 62.5%;
/* MAIN
--------------------------------------------------------- */
body
  margin: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--color-text);
  background-color: var(--color-bg);
  // font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;

  transition: background-color .5s;
  font-family 'source-sans-pro', sans-serif
  font-size 1.4rem
  font-weight 400

  .message
    background var(--color-text)
    color var(--color-bg)
    padding 1rem
    text-align center

  .title
    position: relative;
    font-family: 'orpheuspro', serif;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;

    &--medium
        font-size: calc(2rem + 2.5vw)

    &--large
        font-size: calc(10rem + 3vw)
  .page-title
    position:fixed;
    top: 9rem;
    left: 5vw;
    z-index: -1;
    white-space: nowrap;
    font-size: calc(4vw + 8rem);
    line-height: .975;
    color: var(--textColor);
    opacity: .1;

  .title__offset
    display: block;
    margin-left: 15%;

    &--medium
        @include minw($bp-mobile)
            margin-left: 23%;
</style>

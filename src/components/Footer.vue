<template lang="pug">
.site-footer.ui-splash-in
  .site-control.site-control-progress
    .in
      .site-control-in.ui-fade-out
        .in.ui-fade
      .site-control-in.ui-fade-out
        .in.ui-fade
          .site-control-body
            svg.progress-svg(viewBox="0 0 200 200")
              path.path.progress-b(d="M100,20a80,80,0,1,1-80,80,80,80,0,0,1,80-80")
              path.path.progress-f(d="M100,20a80,80,0,1,1-80,80,80,80,0,0,1,80-80")
    .site-mask
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.site-control {
  position: fixed;
  width: 8.5vh;
  height: 8.5vh;
  left: calc(8.5vh - 10px);
  bottom: calc(8.5vh - 10px);
  .in {
    z-index: 5;
  }
  .site-control-in {
    position: absolute;
    top: -1.0625vh;
    left: -1.0625vh;
    width: 10.625vh;
    height: 10.625vh;
  }
  .site-control-body {
    position: absolute;
    height: 100%;
    width: 100%;
    .path {
      fill: none;
      stroke: #fafafa;
      stroke-width: 2;
      stroke-linecap: square;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
      &.progress-f {
        stroke-width: 5;
      }
    }
  }
}
.site-mask {
  pointer-events: none;
  width: 200%;
  height: 100%;
  position: fixed;
  top: 0;
  left: -50%;
  z-index: 1;
  opacity: 0;
  transition: opacity .8s cubic-bezier(.44,.15,.2,1);
  box-shadow: inset 0 0 12.5vh 12.5vh #060606;
}
</style>

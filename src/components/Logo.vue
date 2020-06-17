<template>
  <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164.84 164.43" v-bind:style="{ height: iheight }">
    <title></title>
    <polygon class="cls-1" points="37.13 28.46 7.92 28.46 39.31 81.13 53.91 56.63 37.13 28.46"/>
    <polygon class="cls-1" points="127.72 28.46 110.93 56.63 125.53 81.13 156.92 28.46 127.72 28.46"/>
    <polygon class="cls-1" points="54.56 107.46 82.42 155.46 110.28 107.46 82.42 59.46 54.56 107.46"/>
    <polygon class="cls-1" points="54.56 56.96 82.42 104.96 110.28 56.96 82.42 8.96 54.56 56.96"/>
  </svg>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    iheight: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.cls-1{
  fill: none;
  stroke: inherit;
  stroke-miterlimit:10;
  stroke-width:9px;
}
</style>

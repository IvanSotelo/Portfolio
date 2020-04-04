<template lang="pug">
router-link(to="/" data-link)
  span.flip-a
    span.t
      span.f
        span.s {{ text }}
      span.b
        span.s {{ text }}
</template>

<script>
export default {
  name: 'Link',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-a {
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
  line-height: 1.3;
  height: 1.3em;
  .t {
    display: block;
    -webkit-transition: all .5s cubic-bezier(.4,.22,.21,1.04);
    transition: all .5s cubic-bezier(.4,.22,.21,1.04);
    .s {
      display: block;
      -webkit-transition: all .5s cubic-bezier(.4,.22,.21,1.04);
      transition: all .5s cubic-bezier(.4,.22,.21,1.04);
    }
    .f {
      display: block;
      .s {
        -webkit-transform-origin: center left;
        transform-origin: center left;
        -webkit-transform: rotate(0) translate(0);
        transform: rotate(0) translate(0);
      }
    }
    .b {
      display: block;
      .s {
        -webkit-transform-origin: center right;
        transform-origin: center right;
        -webkit-transform: rotate(8deg) translateY(50%);
        transform: rotate(8deg) translateY(50%);
      }
    }
  }
}
a {
 &:hover {
   .t {
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      .f {
        .s {
          -webkit-transform: rotate(-8deg) translate(0);
          transform: rotate(-8deg) translate(0);
        }
      }
      .b {
        .s {
          -webkit-transform: rotate(0) translate(0);
          transform: rotate(0) translate(0);
        }
      }
   }
 }
}
</style>

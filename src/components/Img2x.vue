<template>
  <img :src="`/static/img${src}`"
       :srcset="`/static/img${name}@2x.${ext} 2x`"
       :alt="alt">
</template>

<style lang="scss">

</style>

<script>
  export default {
    name: 'Img2x',

    props: {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: '',
      }
    },

    watch: {
      src(val, old) {
        this.update(val);
      }
    },

    computed: {
      name() {
        return this.src.split('.')[0];
      },
      ext() {
        return this.src.split('.')[1];
      }
    },
  }
</script>

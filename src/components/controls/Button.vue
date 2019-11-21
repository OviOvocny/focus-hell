<template>
  <component :is="tag" :to="to">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: String
  },
  computed: {
    tag () {
      return this.to ? 'router-link' : 'button'
    }
  }
}
</script>

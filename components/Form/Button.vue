<template>
  <b-button v-bind="$attrs" :disabled="loading" @click="$emit('click')">
    <b-spinner v-if="loading" label="Spinning" small :variant="loadingVariant" />
    <slot v-else>Button</slot>
  </b-button>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    loadingVariant: {
      type: String,
      default: 'light',
    },
  },
}
</script>

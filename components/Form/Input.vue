<template>
  <b-form-group :label="placeholder + ':'" :label-for="'input-' + name" :invalid-feedback="error" :state="error ? false : null">
    <b-form-select
      v-if="select"
      :id="'input-' + name"
      :name="name"
      :state="error ? false : null"
      :value="value"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="onInput"
    />
    <b-form-datepicker
      v-else-if="date"
      :id="'input-' + name"
      :name="name"
      :state="error ? false : null"
      :value="value"
      :placeholder="placeholder"
      reset-button
      reset-value=""
      v-bind="$attrs"
      @input="onInput"
    />
    <b-form-textarea
      v-else-if="textarea"
      :id="'input-' + name"
      :name="name"
      :state="error ? false : null"
      :value="value"
      :placeholder="placeholder"
      rows="3"
      max-rows="6"
      v-bind="$attrs"
      @input="onInput"
    />
    <b-form-input
      v-else
      :id="'input-' + name"
      :name="name"
      :state="error ? false : null"
      :value="value"
      :type="ctype"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="onInput"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    password: {
      type: Boolean,
      default: false,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean, Array],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    select: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    ctype() {
      if (this.password) {
        return 'password'
      }
      return this.type
    },
  },
  methods: {
    onInput(value) {
      if (this.uppercase) {
        this.$emit('input', value.toUpperCase())
      } else {
        this.$emit('input', value)
      }
    },
  },
}
</script>

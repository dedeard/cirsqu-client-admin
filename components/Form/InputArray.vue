<template>
  <b-form-group :label="placeholder + ':'" :label-for="'input-' + name" :invalid-feedback="error" :state="error ? false : null">
    <b-list-group>
      <b-list-group-item v-for="(n, i) in value" :key="i" class="d-flex p-2">
        <span class="d-block flex-1 my-auto">
          {{ n }}
        </span>
        <span class="d-block my-auto ml-auto">
          <b-button variant="danger" size="sm" @click="remove(i)">
            <b-icon icon="x" />
          </b-button>
        </span>
      </b-list-group-item>
    </b-list-group>
    <b-input-group class="mt-3">
      <b-form-input v-model="input" placeholder="Add item" />
      <b-input-group-append>
        <b-button variant="outline-primary" @click="add">Add</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  name: 'FormInputArray',
  props: {
    value: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input: '',
    }
  },
  methods: {
    add() {
      if (this.input) {
        this.$emit('input', [...this.value, this.input])
        this.input = ''
      }
    },
    remove(i) {
      this.$emit(
        'input',
        this.value.filter((_, j) => j !== i)
      )
    },
  },
}
</script>

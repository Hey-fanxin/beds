<template>
  <a-input
    type='text'
    :value="number"
    :disabled="disabled"
    @change="handleNumberChange"
  />
</template>
<script>
export default {
  props: {
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: function () { return false }
    }
  },
  data () {
    const value = this.value || ''
    return {
      number: value || ''
    }
  },
  watch: {
    value (val = '') {
      this.number = val || ''
    }
  },
  methods: {
    handleNumberChange  (e) {
      const number = e.target.value
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ((!isNaN(number) && reg.test(number)) || number === '') {
        this.number = number
      }
      if (isNaN(number)) {
        return
      }
      this.$emit('change', number)
    }
  }
}
</script>

<template id="vehicle-field-select-template" xmlns="http://www.w3.org/1999/xhtml">
    <div class="form-group">
        <select class="form-control" v-model="selected" @change="updateValue()">
            <option :value="currentId" disabled>{{currentValue}}</option>
            <option v-for="value in values" :value="value.id" :key="value.id">{{value.name}}</option>
        </select>
    </div>
</template>

<script>
export default {
  props: ['values', 'currentValue', 'currentId'],

  data: function () {
    return {
      selected: this.currentId
    }
  },

  methods: {
    updateValue: function () {
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style>
</style>

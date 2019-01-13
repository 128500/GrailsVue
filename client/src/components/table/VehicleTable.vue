<template id="fulltable-template" xmlns="http://www.w3.org/1999/xhtml">
  <table class="table table-bordered">
    <thead class="thead-inverse">
    <tr>
      <td>ID</td>
      <td>Name</td>
      <td>Make</td>
      <td>Model</td>
      <td>Driver</td>
      <td>Edit</td>
      <td>Delete</td>
    </tr>
    </thead>
    <table-row
      v-for="vehicle in vehicles"
      :item="vehicle"
      :key="vehicle.id"
      @edit="edit"
    @deleteVehicle="deleteVehicle">
    </table-row>
  </table>
</template>

<script>
import TableRow from './TableRow.vue'
export default {
  props: {
    vehicles: {
      type: Array
    }
  },
  components: {
    'TableRow': TableRow
  },
  methods: {
    edit (value) {
      this.$emit('edit', value)
    },
    deleteVehicle (value) {
      this.$emit('deleteVehicle', value)
    }
  }
}
</script>

<style>
</style>

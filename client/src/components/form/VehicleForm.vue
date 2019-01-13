<template id="add-vehicle-temlate" xmlns="http://www.w3.org/1999/xhtml">
  <div>
    <vehicle-form-header/>
    <div id="input-row" class="row">
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Enter a name..." v-model="vehicle.name"/>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="row">
          <div class="col-sm-4">
            <field-select v-model="vehicle.make" :values="makes" :field="'Manufacturer'"></field-select>
          </div>
          <div class="col-sm-4">
            <field-select v-model="vehicle.model" :values="models" :field="'Model'"></field-select>
          </div>
          <div class="col-sm-4">
            <field-select v-model="vehicle.driver" :values="drivers" :field="'Driver'"></field-select>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="btn-group" role="group" aria-label="Add new vehicle">
          <button type="button" class="btn-success" @click="submit()">Add to the garage</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleFormHeader from './VehicleFormHeader'
import FieldSelect from './FieldSelect'

export default {
  props: ['vehicle', 'makes', 'models', 'drivers'],
  model: {
    prop: 'vehicle',
    event: 'change'
  },
  components: {
    'VehicleFormHeader': VehicleFormHeader,
    'FieldSelect': FieldSelect
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style>
</style>

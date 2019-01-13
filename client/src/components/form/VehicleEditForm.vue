<template id="add-vehicle-temlate" xmlns="http://www.w3.org/1999/xhtml">
  <div>
    <h1>Change vehicle info</h1>
    <div id="input-row" class="row">
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="form-control" v-model="vehicle.name"/>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="row">
          <div class="col-sm-4">
            <vehicle-field-select :values="makes"
                                  :currentValue="vehicle.make.name"
                                  :currentId="vehicle.make.id"
                                  v-model="vehicle.make">
            </vehicle-field-select>
          </div>
          <div class="col-sm-4">
            <vehicle-field-select :values="models"
                                  :currentValue="vehicle.model.name"
                                  :currentId="vehicle.model.id"
                                  v-model="vehicle.model">
            </vehicle-field-select>
          </div>
          <div class="col-sm-4">
            <vehicle-field-select :values="drivers"
                                  :currentValue="vehicle.driver.name"
                                  :currentId="vehicle.driver.id"
                                  v-model="vehicle.driver">
            </vehicle-field-select>
          </div>
        </div>
      </div>
      <div class="col-sm-2">
        <div class="btn-group" role="group" aria-label="Change vehicle">
          <button type="button" class="btn-success" @click="submitVehicleChanges()">Submit changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleFieldSelect from './VehicleFieldSelect'

export default {
  model: {
    prop: 'vehicle',
    event: 'change'
  },
  components: {
    'VehicleFieldSelect': VehicleFieldSelect
  },
  data: function () {
    return {
      vehicle: {id: null, name: '', make: null, model: null, driver: null},
      models: [],
      makes: [],
      drivers: [],
      serverURL: process.env.SERVER_URL
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      try {
        await Promise.all([
          this.fetchVehicle(),
          this.fetchModels(),
          this.fetchModels(),
          this.fetchMakes(),
          this.fetchDrivers()
        ])
      } catch (error) {
        console.log(error)
      }
      console.log(this.vehicle.make.name)
    },
    fetchVehicle: function () {
      let tokens = this.$route.path.split('/')
      let id = tokens[tokens.length - 2]
      fetch(`${this.serverURL}/vehicle/${id}`)
        .then(r => r.json())
        .then(json => { this.vehicle = json })
        .catch(error => console.error('Error retrieving vehicle: ' + error))
    },
    fetchModels: function () {
      fetch(`${this.serverURL}/model`)
        .then(r => r.json())
        .then(json => { this.models = json })
        .catch(error => console.error('Error retrieving models: ' + error))
    },
    fetchMakes: function () {
      fetch(`${this.serverURL}/make`)
        .then(r => r.json())
        .then(json => { this.makes = json })
        .catch(error => console.error('Error retrieving makes: ' + error))
    },
    fetchDrivers: function () {
      fetch(`${this.serverURL}/driver`)
        .then(r => r.json())
        .then(json => { this.drivers = json })
        .catch(error => console.error('Error retrieving drivers: ' + error))
    },
    submitVehicleChanges: function () {
      const vehicle = this.vehicle
      fetch(`${this.serverURL}/vehicle/${this.vehicle.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(vehicle)
      }).then(r => r.json())
        .then(() => { this.$router.push('/garage') })
        .catch(ex => console.error('Unable to save vehicle', ex))
    }
  }
}
</script>

<style>
  h1{
    text-align: center;
  }
</style>

<template>
  <div id="garage">
    <div class="container">
      <div class='jumbotron'>
        <h1>Welcome to the garage</h1>
      </div>
    </div>
    <vehicle-form v-model="vehicle"
                  :makes="makes"
                  :models="models"
                  :drivers="drivers"
                  @submit="submitNewVehicle()">

    </vehicle-form>
    <vehicle-table :vehicles="vehicles"
                   @edit="edit"
                   @deleteVehicle="deleteVehicle">
    </vehicle-table>
  </div>
</template>

<script>
import VehicleForm from './form/VehicleForm'
import VehicleTable from './table/VehicleTable'

export default {
  components: {
    VehicleForm,
    VehicleTable
  },
  data: function () {
    return {
      vehicles: [],
      vehicle: {name: '', make: null, model: null, driver: null},
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
          this.fetchVehicles(),
          this.fetchModels(),
          this.fetchModels(),
          this.fetchMakes(),
          this.fetchDrivers()
        ])
      } catch (error) {
        console.log(error)
      }
    },
    fetchVehicles: function () {
      fetch(`${this.serverURL}/vehicle`)
        .then(r => r.json())
        .then(json => { this.vehicles = json })
        .catch(error => console.error('Error retrieving vehicles: ' + error))
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
    submitNewVehicle: function () {
      const vehicle = this.vehicle
      fetch(`${this.serverURL}/vehicle`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(vehicle)
      }).then(r => r.json())
        .then(json => {
          this.vehicles.push(json)
          this.vehicle = {name: '', make: null, model: null, driver: null}
        })
        .catch(ex => console.error('Unable to save vehicle', ex))
    },
    edit (value) {
      let answer = confirm('Are you sure of editing this vehicle?')
      if (answer) {
        this.$router.push(`/vehicle/${value}/edit`)
      }
    },
    deleteVehicle (id) {
      let answer = confirm('Are you sure of deleting this vehicle?')
      if (answer) {
        fetch(`${this.serverURL}/vehicle/${id}`, {
          method: 'DELETE'
        }).then(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id)
          } else {
            this.$router.push(`error/${response.status}`)
          }
        })
          .catch(ex => console.error('Unable to delete vehicle', ex))
      }
    }
  }
}
</script>

<!-- Per Component Custom CSS Rules -->
<style>
  #garage {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
</style>

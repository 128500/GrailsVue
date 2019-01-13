<template id="make-form-template">
  <div class="container">
    <div class="jumbotron">
      <div class="form-group">
        <label for="name-input">Driver</label>
        <input type="text" class="form-control" placeholder="Enter a name of the driver..."
               v-model="driver.name" id="name-input" @keyup.enter="submitNewDriver()"/>
      </div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-success" @click="submitNewDriver()">Add new Driver</button>
      </div>
    </div>
    <div class="well">
      <h3>Existing makes:</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="driver in drivers" :key="driver.id">{{driver.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  data: function () {
    return {
      driver: {name: ''},
      drivers: [],
      serverURL: process.env.SERVER_URL
    }
  },
  methods: {
    submitNewDriver: function () {
      const driver = this.driver
      fetch(`${this.serverURL}/driver`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(driver)
      }).then(r => r.json())
        .then(json => {
          this.drivers.push(json)
          this.driver.name = ''
        })
        .catch(ex => console.error('Unable to save driver', ex))
    },
    fetchExistingDrivers () {
      fetch(`${this.serverURL}/driver`)
        .then(r => r.json())
        .then(json => { this.drivers = json })
        .catch(error => console.error('Error retrieving drivers ' + error))
    }
  },
  created () {
    this.fetchExistingDrivers()
  }
}
</script>

<style>

</style>

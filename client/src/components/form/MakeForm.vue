<template id="make-form-template">
  <div class="container">
    <div class="jumbotron">
      <div class="form-group">
        <label for="name-input">Manufacturer</label>
        <input type="text" class="form-control" placeholder="Enter a name of the manufacturer..."
               v-model="make.name" id="name-input" @keyup.enter="submitNewMake()"/>
      </div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-success" @click="submitNewMake()">Add new Make</button>
      </div>
    </div>
    <div class="well">
      <h3>Existing makes:</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="make in makes" :key="make.id">{{make.name}}</li>
      </ul>
    </div>
  </div>
</template>
/*TODO add validation*/
<script>
export default{
  data: function () {
    return {
      make: {name: ''},
      makes: [],
      serverURL: process.env.SERVER_URL
    }
  },
  methods: {
    submitNewMake: function () {
      const make = this.make
      fetch(`${this.serverURL}/make`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(make)
      }).then(r => r.json())
        .then(json => {
          this.makes.push(json)
          this.make.name = ''
        })
        .catch(ex => console.error('Unable to save make', ex))
    },
    fetchExistingMakes () {
      fetch(`${this.serverURL}/make`)
        .then(r => r.json())
        .then(json => { this.makes = json })
        .catch(error => console.error('Error retrieving makes ' + error))
    }
  },
  created () {
    this.fetchExistingMakes()
  }
}
</script>

<style>

</style>

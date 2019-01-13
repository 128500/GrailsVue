<template id="make-form-template">
  <div class="container">
    <div class="jumbotron">
      <div class="form-group">
        <label for="name-input">Model</label>
        <input type="text" class="form-control" placeholder="Enter a name of the model..."
               v-model="model.name" id="name-input" @keyup.enter="submitNewModel()"/>
      </div>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-success" @click="submitNewModel()">Add new Model</button>
      </div>
    </div>
    <div class="well">
      <h3>Existing models:</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="model in models" :key="model.id">{{model.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  data: function () {
    return {
      model: {name: ''},
      models: [],
      serverURL: process.env.SERVER_URL
    }
  },
  methods: {
    submitNewModel: function () {
      const model = this.model
      fetch(`${this.serverURL}/model`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(model)
      }).then(r => r.json())
        .then(json => {
          this.models.push(json)
          this.model.name = ''
        })
        .catch(ex => console.error('Unable to save model', ex))
    },
    fetchExistingModels () {
      fetch(`${this.serverURL}/model`)
        .then(r => r.json())
        .then(json => { this.models = json })
        .catch(error => console.error('Error retrieving models ' + error))
    }
  },
  created () {
    this.fetchExistingModels()
  }
}
</script>

<style>

</style>

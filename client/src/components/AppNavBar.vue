<template id="app-nav-bar-template">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">WebSiteName</a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active"><router-link to="/">Home</router-link></li>
        <li><router-link to="/garage">Garage</router-link></li>
        <li><router-link to="/add/make">Add Manufacturer</router-link></li>
        <li><router-link to="/add/model">Add Model</router-link></li>
        <li><router-link to="/add/driver">Add Drive</router-link></li>
      </ul>
      <button class="btn btn-danger navbar-btn">Button</button>
    </div>
  </nav>
</template>

<script>
export default{
  name: 'app-nav-bar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-brand{
  margin-top: 12px;
  width: 200px;
}
.navbar-btn{
  margin-top: 15px;
}
</style>

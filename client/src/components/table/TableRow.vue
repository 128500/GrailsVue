<template id="tablerow-template" xmlns="http://www.w3.org/1999/xhtml">
     <tr class="table table-bordered">
       <td>{{item.id}}</td>
       <td>{{item.name}}</td>
       <td>{{item.make.name}}</td>
       <td>{{item.model.name}}</td>
       <td>{{item.driver.name}}</td>
       <td><button class="btn btn-primary" @click="edit(item.id)">Edit</button></td>
       <td><button class="btn btn-danger" @click="deleteVehicle(item.id)">Delete</button></td>
     </tr>
</template>

<script>
export default{
  props: {
    item: {
      type: Object
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

import Vue from 'vue'
import Router from 'vue-router'
import Garage from '@/components/Garage.vue'
import MakeForm from '@/components/form/MakeForm.vue'
import ModelForm from '@/components/form/ModelForm.vue'
import DriverForm from '@/components/form/DriverForm.vue'
import VehicleEditForm from '@/components/form/VehicleEditForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/garage',
      name: 'Garage',
      component: Garage
    },
    {
      path: '/add/make',
      name: 'MakeForm',
      component: MakeForm
    },
    {
      path: '/add/model',
      name: 'ModelForm',
      component: ModelForm
    },
    {
      path: '/add/driver',
      name: 'DriverForm',
      component: DriverForm
    },
    {
      path: '/vehicle/:id/edit',
      name: 'VehicleEditForm',
      component: VehicleEditForm
    }
  ]
})

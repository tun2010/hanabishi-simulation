<template>
  <CustomerComponent />
</template>

<script>
import { provide } from 'vue'
import customer from '@/store/customer'

import CustomerComponent from '@/components/customer/CustomerComponent.vue'

export default {
  name: 'CustomerView',
  components: {
    CustomerComponent
  },
  setup() {
    provide('customer', customer)
  }
}
</script>

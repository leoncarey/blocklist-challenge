<template>
  <div class="list-user">
    <DataTable />
  </div>
</template>

<script lang="ts">
import DataTable from '../../components/DataTable/DataTable.vue'

export default {
  components: {
    DataTable,
  },
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>

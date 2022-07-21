<template>
  <div class="content-wrapper">
    <div class="inner-content-wrapper">
      <header>
        <div class="inner-header">
          <h1 class="title">Blockclist de CPF/CNPJ</h1>
        </div>
      </header>

      <DataTable />
    </div>
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

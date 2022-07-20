<template>
  <div class="data-table">
    <el-table class="data-table-element" :data="tableData" :default-sort="{ prop: 'order', order: 'descending' }">
      <el-table-column class="column-table" sortable prop="name" label="Nome" />
      <el-table-column class="column-table" sortable prop="document" label="Documento" />
      <el-table-column class="column-table" sortable prop="documentType" label="Tipo Documento" />
      <el-table-column class="column-table" sortable prop="blocked" label="Bloqueado" />

      <el-table-column label="Ações" fixed="right" width="180">
        <template #default>
          <div class="buttons-action-group">
            <el-button size="small" type="warning" plain @click="handleEdit(scope.$index, scope.row)">
              Bloquerar
            </el-button>

            <ModalDeleteUser user-id="lalal" user-name="Lulu" />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import ModalDeleteUser from '@/components/ModalDeleteUser/ModalDeleteUser.vue'

export default {
  components: { ModalDeleteUser },
  setup() {
    const tableData = [
      {
        _id: 'dlsjkfhlasdf4545df6',
        name: 'Petter Parker',
        document: '12345678915',
        documentType: 'CPF',
        blocked: true,
        order: 1,
      },
      {
        _id: '84as65d45s4d65as4d6',
        name: 'Senhor Stark',
        document: '12345678915',
        documentType: 'CPF',
        blocked: false,
        order: 0,
      },
    ]

    for (let us = 0; us < 20; us++) {
      tableData.push(tableData[0])
    }

    return {
      tableData,
    }
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>

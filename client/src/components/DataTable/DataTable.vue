<template>
  <div class="data-table">
    <header>
      <el-select
        @change="reloadTable"
        v-model="configTable.pageLimit"
        class="m-2"
        placeholder="Limite por página"
        size="small"
      >
        <el-option v-for="item in pageLimitOptions" :key="item" :label="item" :value="item" />
      </el-select>
    </header>

    <el-table
      v-loading="loading"
      class="data-table-element"
      table-layout="auto"
      :data="tableData"
      :default-sort="configTable.sortTable"
      @sort-change="handleSortTable"
    >
      <el-table-column class="column-table" sortable prop="name" label="Nome" align="center" />
      <el-table-column
        class="column-table"
        sortable
        prop="document"
        label="Documento"
        align="center"
        :formatter="documentTypeFilter"
      />

      <el-table-column
        class="column-table"
        sortable
        prop="documentType"
        label="Tipo Documento"
        align="center"
        width="180"
      />
      <el-table-column class="column-table" sortable prop="blocked" label="Bloqueio" align="center" width="180">
        <template #default="scope">
          <div v-if="!scope.row.blocked">
            <div class="icon-block">
              <el-icon class="text-green-700" :size="iconSize">
                <Unlock />
              </el-icon>
            </div>

            <span class="block-label is-unblock">desbloqueado</span>
          </div>

          <div v-if="scope.row.blocked">
            <div class="icon-block">
              <el-icon class="text-red-700" :size="iconSize">
                <Lock />
              </el-icon>
            </div>

            <span class="block-label is-block">bloqueado</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Ações" width="240" align="center">
        <template #default="scope">
          <div class="buttons-action-group">
            <BlockUser :user-id="scope.row._id" :blocked="scope.row.blocked" />

            <ModalDeleteUser :user-id="scope.row._id" :user-name="scope.row.name" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <footer>
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </footer>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Lock, Unlock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import ModalDeleteUser from '../ModalDeleteUser/ModalDeleteUser.vue'
import BlockUser from '../BlockUser/BlockUser.vue'
import type { User } from '../../interfaces/user/user'
import { UserService } from '../../services'
import { UserFilterParams, UserFilterResponse } from '../../interfaces/user/get-user-filter'
import { OrderSort } from '../../constants'

const loading = ref(true)

export default {
  components: { ModalDeleteUser, BlockUser, Lock, Unlock },
  data() {
    return {
      iconSize: '24px',
      pageLimitOptions: [1, 3, 5],
      tableData: [],
      configTable: {
        pageLimit: 5,
        sortTable: {
          prop: 'order',
          order: 'descending',
        },
        isBlocked: null,
        offset: 0,
      },
      loading,
    }
  },
  methods: {
    async handleSortTable({ prop, order }: any) {
      this.configTable.sortTable = { prop, order }
      await this.reloadTable()
    },
    async reloadTable() {
      this.loading = true

      const filters: UserFilterParams = {
        isBlocked: this.configTable.isBlocked,
        limit: this.configTable.pageLimit,
        offset: this.configTable.offset,
        orderFilter: this.configTable.sortTable.prop,
        order: OrderSort[this.configTable.sortTable.order as keyof typeof OrderSort],
      }

      try {
        const data: UserFilterResponse = await UserService.getUsers(filters, {})
        this.tableData = data.items

        const self = this
        setTimeout(() => {
          self.loading = false
        }, 1000)
      } catch (error: any) {
        ElMessage({
          type: 'error',
          message: 'Houve um problema ao tentar carregar a lista de usuários',
        })
      }
    },
    documentTypeFilter: (user: User) => {
      if (user.document.length > 11) {
        return user.document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
      } else {
        return user.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      }
    },
  },
  mounted() {
    this.reloadTable()
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>

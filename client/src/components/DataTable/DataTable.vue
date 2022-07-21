<template>
  <div class="data-table">
    <header class="header-table">
      <SelectLimitPage
        v-model:pageLimit="configTable.pageLimit"
        :pageLimitOptions="pageLimitOptions"
        :reloadTable="reloadTable"
      />

      <div class="filter-right">
        <SearchInput :reloadTable="reloadTable" v-model:document="configTable.document" />

        <ModalAddUser v-model:loader="loader" :reloadTable="reloadTable" />
      </div>
    </header>

    <el-table
      v-loading="loader"
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
            <BlockUser
              :user-id="scope.row._id"
              :blocked="scope.row.blocked"
              v-model:loader="loader"
              :reloadTable="reloadTable"
            />

            <ModalDeleteUser
              :user-id="scope.row._id"
              :user-name="scope.row.name"
              v-model:loader="loader"
              :reloadTable="reloadTable"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <footer class="footer-table">
      <el-pagination
        background
        layout="pager"
        :page-size="configTable.pageLimit"
        :total="totalItems"
        v-model:offset="configTable.offset"
        @current-change="updatePagination"
      />
    </footer>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Lock, Unlock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import SelectLimitPage from '../SelectLimitPage/SelectLimitPage.vue'
import SearchInput from '../SearchInput/SearchInput.vue'
import ModalAddUser from '../ModalAddUser/ModalAddUser.vue'
import ModalDeleteUser from '../ModalDeleteUser/ModalDeleteUser.vue'
import BlockUser from '../BlockUser/BlockUser.vue'
import type { User } from '../../interfaces/user/user'
import { UserService } from '../../services'
import { UserFilterParams, UserFilterResponse } from '../../interfaces/user/get-user-filter'
import { OrderSort } from '../../constants'

const loader = ref(true)

export default {
  components: {
    SearchInput,
    ModalAddUser,
    ModalDeleteUser,
    SelectLimitPage,
    BlockUser,
    Lock,
    Unlock,
  },
  data() {
    return {
      iconSize: '24px',
      pageLimitOptions: [1, 3, 5],
      tableData: [],
      totalItems: 0,
      configTable: {
        pageLimit: 5,
        sortTable: {
          prop: 'order',
          order: 'descending',
        },
        isBlocked: null,
        offset: 0,
        document: '',
      },
      loader,
    }
  },
  mounted() {
    this.reloadTable()
  },
  methods: {
    async handleSortTable({ prop, order }: any) {
      this.configTable.sortTable = { prop, order }
      await this.reloadTable()
    },
    async reloadTable() {
      this.loader = true

      const filters: UserFilterParams = {
        isBlocked: this.configTable.isBlocked,
        limit: this.configTable.pageLimit,
        offset: this.configTable.offset,
        orderFilter: this.configTable.sortTable.prop,
        order: OrderSort[this.configTable.sortTable.order as keyof typeof OrderSort],
      }

      const search = {
        document: null,
      }

      if (this.configTable.document !== '') search.document = this.configTable.document.replace(/\D/gu, '')

      try {
        const data: UserFilterResponse = await UserService.getUsers(filters, search)
        this.totalItems = data.totalCount
        this.tableData = data.items

        const self = this
        setTimeout(() => {
          self.loader = false
        }, 1000)
      } catch (error: any) {
        ElMessage({
          type: 'error',
          message: 'Houve um problema ao tentar carregar a lista de usuários',
        })
        this.loader = false
      }
    },
    documentTypeFilter: (user: User) => {
      if (user.document.length > 11) {
        return user.document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
      } else {
        return user.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      }
    },
    updatePagination(currentPage: any) {
      this.configTable.offset = currentPage - 1
      this.reloadTable()
    },
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>

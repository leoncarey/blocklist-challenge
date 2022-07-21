<template>
  <div class="content-wrapper">
    <div class="inner-content-wrapper">
      <header>
        <div class="inner-header">
          <h1 class="title">Blockclist de CPF/CNPJ</h1>

          <div class="fields-header">
            <el-row>
              <el-input
                v-model="searchInput"
                class="w-50 m-2"
                placeholder="Digite o CPF/CNPF desejado..."
                :prefix-icon="Search"
              >
                <template #append>
                  <el-button :icon="Refresh" />
                </template>
              </el-input>
            </el-row>

            <ModalAddUser />
          </div>
        </div>
      </header>

      <DataTable />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import ModalAddUser from '../../components/ModalAddUser/ModalAddUser.vue'
import DataTable from '../../components/DataTable/DataTable.vue'

const searchInput = ref('')

export default {
  setup() {
    return {
      Search,
      Refresh,
      searchInput,
    }
  },
  components: {
    DataTable,
    ModalAddUser,
  },
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>

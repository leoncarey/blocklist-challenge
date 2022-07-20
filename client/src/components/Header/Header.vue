<template>
  <div class="header">
    <div class="inner-header">
      <h1 class="title">Blockclist de CPF/CNPJ</h1>

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
    </div>
  </div>
</template>

<script lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchInput = ref('')

export default {
  setup() {
    return {
      Search,
      Refresh,
      searchInput,
    }
  },
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>

<template>
  <div>
    <el-row>
      <el-input
        v-model="searchInput"
        size="small"
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
</template>

<script lang="ts">
import { ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

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

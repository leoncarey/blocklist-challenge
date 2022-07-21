<template>
  <div class="search-input">
    <el-button v-if="searchInput !== ''" :icon="MagicStick" @click="cleanSearch">Limpar a busca</el-button>

    <el-form @submit="handleSearch" class="form-searcheable">
      <el-row class="row">
        <el-tooltip
          placement="top-start"
          content="Não esqueça: o documento deve ser digitado por completo."
          effect="customized"
        >
          <el-input
            v-model="searchInput"
            size="small"
            class="w-50 m-2"
            placeholder="Digite o CPF/CNPF desejado..."
            v-maska="{ mask: ['###.###.###-##', '##.###.###/####-##'] }"
            clearable
            :prefix-icon="Search"
          >
            <template #append>
              <el-button :icon="Refresh" @submit="handleSearch" />
            </template>
          </el-input>
        </el-tooltip>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Search, Refresh, MagicStick } from '@element-plus/icons-vue'
import { maska } from 'maska'

const searchInput = ref('')

export default {
  emits: ['update:document'],
  props: {
    reloadTable: {
      type: Function,
    },
  },
  data() {
    return {
      searchInput,
    }
  },
  directives: {
    maska,
  },
  methods: {
    async handleSearch(event: any) {
      event && event.preventDefault()

      this.$emit('update:document', this.searchInput)
      await this.reloadTable()
    },
    cleanSearch() {
      this.searchInput = ''
      this.handleSearch()
    },
  },
  setup() {
    return {
      Search,
      Refresh,
      MagicStick,
    }
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>

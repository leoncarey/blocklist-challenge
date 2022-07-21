<template>
  <div class="select-limit-page">
    <span class="title-filter">por página:</span>

    <el-select @change="handleChange" v-model="pageLimit" class="m-2 w-14" placeholder="Limite por página" size="small">
      <el-option v-for="item in pageLimitOptions" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>

<script lang="ts">
export default {
  emit: ['update:pageLimit'],
  props: {
    pageLimit: {
      type: Number,
      default: 5,
    },
    pageLimitOptions: {
      type: Array,
      default: [],
    },
    reloadTable: {
      type: Function,
    },
  },
  methods: {
    async handleChange() {
      this.$emit('update:pageLimit', this.pageLimit)
      await this.reloadTable()
    },
  },
}
</script>

<style lang="scss">
@import './style.scss';
</style>

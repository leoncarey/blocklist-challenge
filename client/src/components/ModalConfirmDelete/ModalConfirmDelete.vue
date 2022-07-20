u
<template>
  <div class="modal-confirm-deletion">
    <el-button size="small" type="danger" plain @click="open">Excluir</el-button>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  props: {
    userName: {
      type: String,
      default: '',
      require: true,
    },
    userId: {
      type: String,
      default: '',
      require: true,
    },
  },
  methods: {
    open() {
      ElMessageBox.confirm(`Você deseja deletar o usuário: ${this.userName}. Continuar?`, 'Atenção', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        type: 'warning',
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Usuário excluído com sucesso!',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Exclusão cancelada',
          })
        })
    },
  },
}
</script>

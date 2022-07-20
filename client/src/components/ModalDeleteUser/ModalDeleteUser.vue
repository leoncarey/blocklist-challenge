<template>
  <div class="modal-delete-user">
    <el-button size="small" type="danger" plain @click="open">Excluir</el-button>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { UserService } from '../../services'

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
          this.deleteUser()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Exclusão cancelada',
          })
        })
    },
    deleteUser() {
      UserService.deleteUser(this.userId)
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Usuário excluído com sucesso!',
          })
        })
        .catch((error) => {
          ElMessage({
            type: 'error',
            message: `Houve um problema ao tentar excluir o usuário: [${error.message}]`,
          })
        })
    },
  },
}
</script>

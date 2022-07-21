<template>
  <div class="modal-delete-user">
    <el-button size="small" type="danger" plain @click="handleDelete">Excluir</el-button>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { UserService } from '../../services'

export default {
  emits: ['update:loader'],
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
    reloadTable: {
      type: Function,
    },
  },
  methods: {
    async handleDelete() {
      this.$emit('update:loader', true)

      try {
        await ElMessageBox.confirm(`Você deseja deletar o usuário: ${this.userName}. Continuar?`, 'Atenção', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          type: 'warning',
        })

        await this.deleteUser()
      } catch (error) {
        ElMessage({
          type: 'info',
          message: 'Exclusão cancelada',
        })
      }
    },
    async deleteUser() {
      try {
        await UserService.deleteUser(this.userId)

        ElMessage({
          type: 'success',
          message: 'Usuário excluído com sucesso!',
        })

        this.reloadTable()
      } catch (error: any) {
        const errorResponseMessage = error.response.data

        ElMessage({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: `Houve um problema ao tentar excluir o usuário:<br>[${errorResponseMessage}]`,
          duration: 5000
        })
      }
    },
  },
}
</script>

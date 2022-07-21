<template>
  <el-button
    size="small"
    :type="blocked ? 'success' : 'warning'"
    :icon="blocked ? Unlock : Lock"
    style="width: 110px"
    plain
    @click="handleEdit"
  >
    {{ blocked ? 'Desbloquear' : 'Bloquear' }}
  </el-button>
</template>

<script lang="ts">
import { Lock, Unlock } from '@element-plus/icons-vue'
import { UserService } from '../../services'
import { ElMessage } from 'element-plus'

export default {
  emits: ['update:loader'],
  props: {
    blocked: {
      type: Boolean,
      default: false,
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
    loader: {
      type: Boolean,
    },
  },
  methods: {
    async handleEdit() {
      this.$emit('update:loader', true)

      try {
        /*
         * this.blocked is current state
         * exclamation will change boolean state
         */
        const newStateBlockUser = !this.blocked
        await UserService.updateBlockUser(this.userId, newStateBlockUser)

        const currentStateUser = newStateBlockUser ? 'bloqueado' : 'desbloqueado'

        ElMessage({
          type: 'success',
          message: `Usuário ${currentStateUser} com sucesso!`,
        })

        this.reloadTable()
      } catch (error: any) {
        const errorResponseMessage = error.response.data

        ElMessage({
          type: 'error',
          message: `Houve um problema ao tentar excluir o usuário: [${errorResponseMessage}]`,
        })

        this.$emit('update:loader', false)
      }
    },
  },
  setup() {
    return {
      Lock,
      Unlock,
    }
  },
}
</script>

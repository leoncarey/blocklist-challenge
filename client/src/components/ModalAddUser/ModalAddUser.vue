<template>
  <el-button :icon="Avatar" @click="modalAddUser = true">Adicionar Novo</el-button>

  <el-dialog class="modal-add-user" v-model="modalAddUser" title="Adicionar novo usuário">
    <el-form :model="formAddUser" label-width="160px">
      <el-form-item label="Nome do usuário">
        <el-input v-model="formAddUser.userName" />
        <span class="error-field" v-if="v$.userName.$errors.length !== 0">{{ v$.userName.$errors[0].$message }}</span>
      </el-form-item>

      <el-form-item label="Documento do usuário">
        <el-input
          v-model="formAddUser.document"
          masked="true"
          v-maska="{ mask: ['###.###.###-##', '##.###.###/####-##'] }"
          clearable
        />
        <span class="error-field" v-if="v$.document.$errors.length !== 0">{{ v$.document.$errors[0].$message }}</span>
      </el-form-item>

      <el-form-item label="Usuário bloqueado?">
        <el-switch v-model="formAddUser.blocked" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalAddUser = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { UserService } from '../../services'
import { Avatar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { maska } from 'maska'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  directives: {
    maska,
  },
  setup() {
    const modalAddUser = ref(false)

    const formAddUser = reactive({
      userName: '',
      document: '',
      blocked: false,
    })
    const rules = {
      userName: { required },
      document: { required },
    }

    const v$ = useVuelidate(rules, formAddUser)

    return {
      Avatar,
      modalAddUser,
      formAddUser,
      v$,
    }
  },
  methods: {
    onSubmit() {
      this.v$.$validate()
      console.log(this.formAddUser.userName)

      if (!this.v$.$error) {
        alert('Form successfully submitted.')
      } else {
        alert('Form failed validation')
      }

      return true

      UserService.saveUser({
        userName: this.formAddUser.userName,
        document: this.formAddUser.document.replace(/\D/gu, ''),
        blocked: this.formAddUser.blocked,
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: `${this.formAddUser.userName} adicionado com sucesso!`,
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

<style>
@import './style.scss';
</style>

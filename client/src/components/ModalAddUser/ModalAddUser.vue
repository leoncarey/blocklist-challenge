<template>
  <el-button :icon="Avatar" @click="modalAddUser = true">Adicionar Novo</el-button>

  <el-dialog v-model="modalAddUser" title="Adicionar novo usuário">
    <el-form
      ref="formRef"
      :rules="rules"
      :formSize="formSize"
      :model="formAddUser"
      label-width="200px"
      label-position="top"
      status-icon
    >
      <el-form-item label="Nome do usuário" prop="userName">
        <el-input v-model="formAddUser.userName" />
      </el-form-item>

      <el-form-item label="Documento do usuário" prop="document">
        <el-input
          v-model="formAddUser.document"
          masked="true"
          v-maska="{ mask: ['###.###.###-##', '##.###.###/####-##'] }"
          clearable
        />
      </el-form-item>

      <el-form-item label="Usuário bloqueado?" prop="blocked">
        <el-switch v-model="formAddUser.blocked" />
      </el-form-item>

      <div class="error-list-wrapper" v-if="errorServerListMessage.length !== 0">
        <span class="error-list-header">Erros que devem ser corrigidos:</span>

        <div class="error-list" v-for="errorType in errorServerListMessage">
          <span class="error-field">- {{ errorType }}</span>
        </div>
      </div>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal(formRef)">Cancel</el-button>
        <el-button type="primary" @click="onSubmit(formRef)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { UserService } from '../../services'
import { Avatar } from '@element-plus/icons-vue'
import { ElMessage, FormRules, FormInstance } from 'element-plus'
import { ValidationErrors } from '../../constants'
import { maska } from 'maska'

export default {
  emits: ['update:loader'],
  props: {
    loader: {
      type: Boolean,
    },
    reloadTable: {
      type: Function,
    },
  },
  data() {
    return {
      errorServerListMessage: [],
    }
  },
  directives: {
    maska,
  },
  setup() {
    const modalAddUser = ref(false)
    const formRef = ref<FormInstance>()
    const formSize = ref('default')

    // Form config validation client side
    const formAddUser = reactive({
      userName: '',
      document: '',
      blocked: false,
    })
    const rules = reactive<FormRules>({
      userName: [{ required: true, message: ValidationErrors.USER_NAME_IS_REQUIRED, trigger: 'blur' }],
      document: [{ required: true, message: ValidationErrors.DOCUMENT_IS_REQUIRED, trigger: 'blur' }],
      blocked: [],
    })

    return {
      Avatar,
      modalAddUser,
      formAddUser,
      rules,
      formRef,
      formSize,
    }
  },
  methods: {
    async onSubmit(formEl: FormInstance | undefined) {
      if (!formEl) return

      // If valid...
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          this.$emit('update:loader', true)

          try {
            this.errorServerListMessage = []
            await this.saveUser()
            this.closeModal(formEl)
            this.emitSuccessMessage()
            this.reloadTable()
          } catch (error: any) {
            this.prepareErrorMessagesFromServer(error.response.data)
            this.emitErrorMessage()
          }
        } else {
          this.emitErrorMessage()
        }
      })
    },
    async saveUser() {
      await UserService.saveUser({
        userName: this.formAddUser.userName,
        document: this.formAddUser.document.replace(/\D/gu, ''),
        blocked: this.formAddUser.blocked,
      })
    },
    prepareErrorMessagesFromServer(errorResponse: any) {
      if (errorResponse.errorCode && errorResponse.errorCode === 'VALIDATION_ERROR') {
        this.errorServerListMessage = errorResponse.errorDetail.map(
          (errorType: string) => ValidationErrors[errorType as keyof typeof ValidationErrors]
        )
      }
    },
    emitSuccessMessage() {
      ElMessage({
        type: 'success',
        message: `${this.formAddUser.userName} adicionado com sucesso!`,
      })
    },
    emitErrorMessage() {
      ElMessage({
        type: 'error',
        message: `Houve um problema ao tentar excluir o usuário`,
        duration: 5000,
      })
    },
    closeModal(formEl: FormInstance | undefined) {
      this.resetForm(formEl)
      this.modalAddUser = false
    },
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return
      formEl.resetFields()
    },
  },
}
</script>

<style scoped>
@import './style.scss';
</style>

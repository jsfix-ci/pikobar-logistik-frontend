<template>
  <div class="change-password">
    <v-row>
      <v-col auto>
        <v-card
          class="mx-auto"
          max-width="600"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-form
                id="change-password-form"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="changePasswordForm.password_old"
                  :rules="passwordOldRules"
                  :append-icon="typePassword ? 'visibility' : 'visibility_off'"
                  :type="typePassword ? 'password' : 'text'"
                  label="Password lama"
                  name="password"
                  @click:append="() => (typePassword = !typePassword)"
                />
                <v-text-field
                  v-model="changePasswordForm.password"
                  :rules="passwordRules"
                  :append-icon="typePassword ? 'visibility' : 'visibility_off'"
                  :type="typePassword ? 'password' : 'text'"
                  label="Password baru"
                  name="password"
                  @click:append="() => (typePassword = !typePassword)"
                />
                <v-text-field
                  v-model="changePasswordForm.repeat_password"
                  :rules="repeatPasswordRules"
                  :append-icon="typeRepeatPassword ? 'visibility' : 'visibility_off'"
                  :type="typeRepeatPassword ? 'password' : 'text'"
                  label="Konfirmasi password baru"
                  name="repeat_password"
                  @click:append="() => (typeRepeatPassword = !typeRepeatPassword)"
                  @keyup.enter.native="handleChangePassword"
                />
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              @click="handleChangePassword"
            >
              Ganti Password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  components: { },
  data() {
    return {
      valid: true,
      typePassword: String,
      typeRepeatPassword: String,
      loading: false,
      changePasswordForm: {
        password_old: '',
        password: '',
        repeat_password: ''
      },
      passwordOldRules: [
        v => !!v || 'Password lama harus diisi',
        v => (v && v.length >= 5) || 'Password lama harus lebih dari 5 karakter'
      ],
      passwordRules: [
        v => !!v || 'Password baru harus diisi',
        v => (v && v.length >= 5) || 'Password baru harus lebih dari 5 karakter'
      ],
      repeatPasswordRules: [
        v => !!v || 'Konfirmasi password baru harus diisi',
        v => (v && v.length >= 5) || 'Konfirmasi password baru harus lebih dari 5 karakter',
        v => (v && v === this.changePasswordForm.password) || 'Konfirmasi password tidak sama'
      ]
    }
  },
  methods: {
    async handleChangePassword() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const query = {
          password: this.changePasswordForm.password_old,
          password_new: this.changePasswordForm.password
        }
        const response = await this.$store.dispatch('user/changePasswordUser', query)
        console.log('response: ', response)
        console.log('status: ', response.status)
        if (response.status === 200) {
          this.$store.dispatch('toast/successToast', 'Password berhasil dirubah')
          this.$store.dispatch('user/resetToken')
          this.$router.push({ path: '/login' })
          this.loading = false
        } else {
          this.loading = false
        }
      }
    }
  }
}
</script>

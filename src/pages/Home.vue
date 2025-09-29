<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useField, useForm } from 'vee-validate'
import { useDisplay } from 'vuetify'
import MainLayout from '@/layouts/main.vue'

const { mdAndUp } = useDisplay()

const showSnackbar = ref(false)
const snackbarMsg = ref('')

// Schema validasi
const schema = z.object({
  username: z
    .string({ required_error: 'Username wajib diisi' })
    .min(3, 'Username minimal 3 karakter'),
  password: z
    .string({ required_error: 'Password wajib diisi' })
    .min(6, 'Password minimal 6 karakter'),
})

const formSchema = toTypedSchema(schema)
export type FormValues = z.infer<typeof schema>

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})
const { value: username, errorMessage: usernameError } = useField<string>('username')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const onSubmit = handleSubmit((values: FormValues) => {
  snackbarMsg.value = `Username: ${values.username}, Password: ${values.password}`
  showSnackbar.value = true
  handleReset()
})
</script>

<template>
  <MainLayout>
    <v-container height="100%">
      <v-row justify="center" align-content="center" style="height: 100%">
        <v-col cols="12" sm="8" md="6">
          <form @submit.prevent="onSubmit">
            <v-card>
              <v-card-title class="mb-4"> Form Validation With VeeValidate + Zod </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="username"
                      variant="outlined"
                      label="Username"
                      color="primary"
                      clearable
                      :error-messages="usernameError"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      variant="outlined"
                      label="Password"
                      type="password"
                      color="primary"
                      clearable
                      :error-messages="passwordError"
                    />
                  </v-col>
                </v-row>

                <v-row dense class="mt-4" :class="{ 'flex-column': !mdAndUp }">
                  <v-col cols="12" md="6">
                    <v-btn block color="primary" type="submit" prepend-icon="mdi-send">
                      Submit
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      block
                      color="error"
                      @click="handleReset"
                      append-icon="mdi-delete-outline"
                    >
                      Reset
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar v-model="showSnackbar" multi-line color="primary">
      Form submitted!
      <div>{{ snackbarMsg }}</div>
      <template #actions>
        <v-btn text @click="showSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </MainLayout>
</template>

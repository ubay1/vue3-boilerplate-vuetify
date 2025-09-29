<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useField, useForm } from 'vee-validate'
import { useDisplay } from 'vuetify'
import MainLayout from '@/layouts/main.vue'

const { mdAndUp } = useDisplay()

interface Todo {
  id: number
  text: string
  completed: boolean
}
const props = defineProps<{
  initialTodos?: Todo[]
}>()

const showSnackbar = ref(false)
const snackbarMsg = ref('')
const todos = ref<Todo[]>(props.initialTodos ?? [])

watch(
  () => props.initialTodos,
  (newVal) => {
    if (newVal) todos.value = [...newVal]
  },
  { immediate: true }, // langsung jalan pertama kali
)

// Schema validasi
const schema = z.object({
  todo: z.string({ required_error: 'Todo wajib diisi' }).min(3, 'Todo minimal 3 karakter'),
})

const formSchema = toTypedSchema(schema)
export type FormValues = z.infer<typeof schema>

const { handleSubmit, handleReset } = useForm({
  validationSchema: formSchema,
})
const { value: todo, errorMessage: todoError } = useField<string>('todo')

const addTodo = (input: string) => {
  if (input !== '') {
    todos.value.push({
      id: todos.value.length + 1,
      text: input,
      completed: false,
    })
  }
}
function toggleTodo(id: number, value: boolean) {
  todos.value = todos.value.map((todo) => (todo.id === id ? { ...todo, completed: value } : todo))
}

const onSubmit = handleSubmit((values: FormValues) => {
  snackbarMsg.value = `Todo: ${values.todo}`
  showSnackbar.value = true
  handleReset()
  addTodo(values.todo)
})
</script>

<template>
  <MainLayout>
    <v-container height="100%">
      <v-row justify="center" align-content="center" class="my-2" style="height: 100%">
        <v-col cols="12" sm="8" md="6">
          <form @submit.prevent="onSubmit">
            <v-card>
              <v-card-title data-test="title"> Unit Test </v-card-title>
              <v-card-subtitle class="mb-2" data-test="subtitle">
                With Vitest + Vue Test Utils
              </v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      data-test="input-todo"
                      v-model="todo"
                      variant="outlined"
                      label="Masukkan Todo"
                      color="primary"
                      clearable
                      :error-messages="todoError"
                    />
                  </v-col>
                </v-row>

                <v-row dense class="mt-6" :class="{ 'flex-column': !mdAndUp }">
                  <v-col cols="12" md="6">
                    <v-btn
                      data-test="add-todo"
                      block
                      color="primary"
                      type="submit"
                      prepend-icon="mdi-plus"
                    >
                      Add
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
          <v-card class="mt-4">
            <v-list select-strategy="leaf">
              <v-list-subheader>Todos</v-list-subheader>
              <template v-if="todos.length === 0">
                <v-row data-test="todo-list" justify="center" align-content="center" class="my-4">
                  No todos yet
                </v-row>
              </template>
              <template v-else>
                <v-list-item
                  data-test="todo-list"
                  v-for="(todo, index) in todos"
                  :key="index"
                  density="comfortable"
                >
                  <v-checkbox-btn
                    data-test="todo-checkbox"
                    color="primary"
                    :model-value="todo.completed"
                    @update:model-value="(val) => toggleTodo(todo.id, val)"
                  >
                    <template v-slot:label>
                      <div
                        data-test="text-todo"
                        :class="{
                          'text-decoration-line-through': todo.completed,
                        }"
                      >
                        {{ todo.text }}
                      </div>
                    </template>
                  </v-checkbox-btn>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar -->
    <v-snackbar v-model="showSnackbar" multi-line color="primary" location="bottom right">
      Form submitted!
      <div>{{ snackbarMsg }}</div>
      <template #actions>
        <v-btn text @click="showSnackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </MainLayout>
</template>

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import resizeObserverPolyfill from "resize-observer-polyfill";
import { createRouter, createWebHistory } from 'vue-router'
import UnitTestPage from '../../../pages/UnitTest.vue'

global.ResizeObserver = resizeObserverPolyfill

const vuetify = createVuetify({
  components,
  directives,
})

const routes = [
  { path: '/', component: UnitTestPage },
  { path: '/unit-test', component: UnitTestPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
/**
 * Vue Test Utils First
   1. Use mount() to render a component.
   2. Use get() and findAll() to query the DOM.
   3. trigger() and setValue() are helpers to simulate user input.
   4. Updating the DOM is an async operation, so make sure to use async and await.
   5. Testing usually consists of 3 phases; arrange, act and assert.
 */
describe('Unit Test Page', () => {
  beforeEach(async () => {
    router.push('/unit-test')
    await router.isReady()
  })
  const wrapper = mount(UnitTestPage, {
    global: {
      plugins: [vuetify, router],
    },
  })

  const wrapperWithProps = mount(UnitTestPage, {
    global: {
      plugins: [vuetify, router],
    },
    props: {
      initialTodos: [
        { id: 1, text: 'Belajar Vitest', completed: false },
        { id: 2, text: 'Belajar Vuetify', completed: false }
      ],
    },
  })


  it('mounts render & get title', () => {
    const getText = wrapper.get('[data-test="title"]')
    expect(getText.text()).toBe('Unit Test')
  })
  it('mounts render & get subtitle', () => {
    const getText = wrapper.get('[data-test="subtitle"]')
    expect(getText.text()).toBe('With Vitest + Vue Test Utils')
  })

  it('mount render todo', () => {
    const getAllTodo = wrapper.get('[data-test="todo-list"]')
    expect(getAllTodo.text()).toBe('No todos yet')
  })

  it('create todo', async () => {
    const findAllTodo = wrapper.findAll('[data-test="todo-list"]')
    await wrapper.get('[data-test="input-todo"] input').setValue('New todo')
    await wrapper.get('[data-test="add-todo"]').trigger('submit')
    expect(findAllTodo).toHaveLength(1)
  })

  it('complete todo', async () => {
    // for input checkbox
    await wrapperWithProps.get('[data-test="todo-checkbox"] input').setValue(true)

    // component checkbox using div not input checkbox
    // await wrapperWithProps.get('[data-test="todo-checkbox"] input').trigger('click')
    // console.log(wrapper.html())

    expect(wrapperWithProps.get('[data-test="text-todo"]').classes()).toContain('text-decoration-line-through')
  })
})

/**
 * For more advanced testing scenarios, refer to the official documentation:
 * - Vue Test Utils: https://test-utils.vuejs.org/
 * - Vitest: https://vitest.dev/
 */

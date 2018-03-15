import { mount } from 'vue-test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  
  it('check if error message is not showing on init state', () => {
    const wrapper = mount(Login)
    expect(wrapper.vm.error).toEqual('')
  })

  it('check if it validates wrong emails typed -- check via data state', () => {
    const wrapper = mount(Login)
    wrapper.setData({ email: 'eduardo' })
    expect(wrapper.vm.error).toEqual('Email inválido.')
  })

  it('check if it hides message for valid emails', () => {
    const wrapper = mount(Login)
    wrapper.setData({ email: 'eduardo' })
    wrapper.setData({ email: 'eduardo.ckf@gmail.com' })
    expect(wrapper.vm.error).toEqual('')
  })

})
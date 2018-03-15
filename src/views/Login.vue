<template>
  <div class="Signin">
    <div class="Signin__wrapper">
      <Logo />
      <form id="signin" v-on:submit.prevent="handleSubmit()">
        <input type="text" id="email" autocomplete="off" placeholder="Your e-mail" v-model="email" /> 
        <p v-if="error != ''">{{ error }}</p>
        {{validateEmail}}
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo.vue'

export default {
  name: 'Login',
  components: { Logo },
  data: function() {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    handleSubmit: function(event) {

      this.$store.dispatch('handleLogin', this.email).then((response) => {
        response ? 
          this.$router.push({path: '/feed'})
        : this.error = 'Ops, houve um erro na autenticação. Verifique seu e-mail.'
        
      }).catch((err) => {
        this.error = true
        return false
      })
    }
  },
  computed: {
    validateEmail: function() {
      const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = valid.test(this.email)
      this.error = isValid || this.email.length < 4 ? '' : 'Email inválido.'
    }
  }
}
</script>

<style scoped lang="scss">
.Signin__wrapper {
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  form#signin {

      margin-top: 12.5%;

      input[type=text] {
          border: none;
          border-bottom: 1px solid #999;
          text-align: center;
          width: 400px;
          text-transform: lowercase;
          padding: 6px;
          font-size: 16px;
          color: #666;
      }
  }
}
</style>


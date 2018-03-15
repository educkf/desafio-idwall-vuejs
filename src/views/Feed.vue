<template>
  <div class="Feed">
    <div class="Feed__wrapper">
      <Logo />

      <nav class="Feed__menu">
        <router-link :to="{ path: '/feed', query: { category: 'husky' }}" :class="isActive('husky')">Husky</router-link>
        <router-link :to="{ path: '/feed', query: { category: 'labrador' }}" :class="isActive('labrador')">Labrador</router-link>
        <router-link :to="{ path: '/feed', query: { category: 'hound' }}" :class="isActive('hound')">Hound</router-link>
        <router-link :to="{ path: '/feed', query: { category: 'pug' }}" :class="isActive('pug')">Pug</router-link>
      </nav>

      <div class="Feed__results">

        <div class="Feed__result" v-for="(dog, index) in dogs" :key="index">
          <router-link :to="{ path: '/feed', query: query(index) }" :class="shouldEnlarge(index)">
            <img  v-lazy="dog" alt="" />
          </router-link>
        </div> 

      </div>

    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'Feed',
  components: { Logo },
  data: function() {
    return {}
  },
  computed: {
    dogs: function() {
      return this.$store.state.dogs[ this.category() ]
    }
  }, 
  methods: {
    category: function() {
      return this.$route.query.category ? this.$route.query.category : 'husky'
    },
    isActive: function(category) {
      return this.category() === category ? 'active-category' : null
    },
    shouldEnlarge: function(dogIndex) {
      return this.$route.query.id == dogIndex ? 'enlarge' : null
    },
    query: function(dogIndex) {
      return this.$route.query.id == dogIndex ? { category: this.category() } : { category: this.category(), id: dogIndex }
    }
  },

  created() {
    this.$store.dispatch( 'getData', this.category() )
  },

  watch: {
    '$route.query.category'() {
      this.$store.dispatch( 'getData', this.category() )
    }
  }

}
</script>

<style scoped lang="scss">
.Feed__wrapper {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .Feed__menu {
    margin: 80px auto;

    a {
      color: #000;
      text-decoration: none;
      text-transform: uppercase;
      margin: 0 0 0 16px;
      padding: 2px 14px 2px 0; 
      border-right: 1px solid #ccc;

      &:last-child {
        border: none;
      }

      &.active-category {
        font-weight: bold;
      }
    }
  }

  .Feed__results {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 80px;

    .Feed__result {
      width: calc(33.333333% - 30px);
      height: 350px;
      margin: 15px;
      background: #ddd;

      a {
        width: 100%;
        height: 350px;
        overflow: hidden;
        position: relative;
        display: block;

        &.enlarge {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 2;
          background: rgba(0,0,0,0.7);

          img {
            max-width: 70%;
            max-height: 70%;
            min-width: initial;
            min-height: initial;
          }

        }
      }

      img {
        min-width: 100%;
        min-height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }       
    }
  }
}
</style>


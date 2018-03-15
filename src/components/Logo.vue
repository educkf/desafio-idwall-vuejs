<template>
  <div class="logo">
    <h1>The <span>IDDOG</span></h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
.logo h1 {
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 15px;
    margin: 80px 0 0 0;

    span {
        font-weight: bold;
    }
}
</style>

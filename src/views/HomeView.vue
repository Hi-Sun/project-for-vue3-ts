<template>
  <div class="home">
    <h1>Welcome to Yaling`s Vue3.js App</h1>
    <p>This project is for me to record my own learning vue3 process and commonly used pages</p>
    <h3>Login Page</h3>
    <ul>
      <router-link to="/simple-login">Simple Login</router-link>
    </ul>
    <h3>My Accounts</h3>
    <ul>
      <li><a href="https://github.com/Hi-Sun/" target="_blank" rel="noopener">github</a></li>
      <li><a href="https://blog.csdn.net/Helloyaling?spm=1010.2135.3001.5343" target="_blank" rel="noopener">csdn</a></li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

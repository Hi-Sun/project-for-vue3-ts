<template>
  <div class="home">
    <h1>Welcome to Yaling`s Vue3.js App</h1>
    <p>Best Wishes to You</p>
    <h3>My Accounts</h3>
    <div class="wrap">
      <div class="rectangle1">
        <a href="https://github.com/Hi-Sun/" target="_blank" rel="noopener">github</a>
      </div>
      <div class="rectangle2">
        <a href="https://blog.csdn.net/Helloyaling?spm=1010.2135.3001.5343" target="_blank" rel="noopener">csdn</a>
      </div>
    </div>
    <h3>Login Page</h3>
    <ul>
      <router-link to="/login/simple">Simple Login</router-link>
    </ul>
    <h3>Web Game</h3>
    <ul>
      <router-link to="/game/catchball">接球小游戏</router-link>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
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

.home,
.rectangle1,
.rectangle2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wrap {
  margin-top: 30px;
  display: flex;
}

.rectangle1 {
  width: 200px;
  height: 60px;
  background: linear-gradient(225deg, transparent 43px, #4facfe 43px, #00f2fe 100%);
  border-radius: 30px 0 0 30px;

  a {
    color: #f5576c;
    font-size: 20px;
  }
}

.rectangle2 {
  width: 200px;
  height: 60px;
  background: linear-gradient(45deg, transparent 43px, #f5576c 43px, #f093fb 100%);
  border-radius: 0 30px 30px 0;
  /* 和蓝色保持距离 */
  margin-left: -50px;

  a {
    color: #4facfe;
    font-size: 20px;
  }
}
</style>

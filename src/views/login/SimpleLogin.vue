<template>
  <div class="login">
    <div class="container">
      <div class="content">
        <h4>{{ title }}登录</h4>
        <div class="qr-code-area" v-if="loginType === 'qrcode'">
          <img src="@/assets/myblog.png" alt="myblog-qrcode" />
        </div>
        <div v-else class="account-area">
          <el-form ref="formRef" :rules="loginRules" :model="loginForm" label-width="auto"
            :hide-required-asterisk="true">
            <el-form-item label="手机号" prop="account">
              <el-input v-model="loginForm.account" placeholder="请输入手机号码">
                <template #prepend>+86</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="loginType === 'password'" prop="password" label="密码">
              <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item v-if="loginType === 'vetifycode'" prop="vetifycode" label="验证码">
              <el-input v-model="loginForm.verifyCode" placeholder="请输入六位验证码" maxlength="6">
                <template #append>
                  <el-button type="primary" @click="handleSendVerifyCode">获取验证码</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <router-link class="forget-area" v-if="loginType === 'password'" to="">忘记密码</router-link>
          <div class="operation-area">
            <el-button class="submit-btn" type="primary" @click="handleLogin">登录</el-button>
          </div>
        </div>
        <div class="change-login-type">
          <div :class="['login-type', loginType === 'vetifycode' && 'active']" @click="loginType = 'vetifycode'">手机号
          </div>
          <div :class="['login-type', loginType === 'password' && 'active']" @click="loginType = 'password'">账号密码</div>
          <div :class="['login-type', loginType === 'qrcode' && 'active']" @click="loginType = 'qrcode'">二维码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';

const loginRules = {
  account: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: "请输入正确的手机号码", trigger: "blur" }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const formRef = ref<HTMLFormElement>(null);
const loginForm = reactive({
  account: '',
  password: '',
  verifyCode: ''
});
const loginType = ref<'password' | 'vetifycode' | 'qrcode'>('vetifycode');

const title = computed(() => {
  switch (loginType.value) {
    case 'password':
      return '账号密码'
    case 'vetifycode':
      return '短信验证码'
    case 'qrcode':
      return '扫码'
    default:
      return ''
  }
})

watch(loginType, () => {
  formRef?.value?.resetFields();
})

const handleSendVerifyCode = () => {
  formRef.value.validateField('account', (valid: boolean) => {
    if (valid) {
      ElMessage.info('您的验证码为：005114')
    }
  })
}

const handleLogin = () => {
  formRef.value.validate((vaild: boolean) => {
    if (vaild) {
      console.log('表单验证通过，提交接口验证信息')
      if (loginType.value === 'vetifycode' && loginForm.verifyCode !== '005114') {
        return ElMessage.error('验证码错误')
      }
      let message = '登录成功'
      if (loginForm.account) {
        message += ',登录的账号为' + loginForm.account;
      }
      if (loginForm.password) {
        message += ',登录的密码为' + loginForm.password;
      }
      if (loginForm.verifyCode) {
        message += ',登录的验证码为' + loginForm.verifyCode;
      }
      ElMessage.success(message)
    } else {
      console.log('验证失败');
    }
  })
}

</script>

<style lang="scss" scoped>
%bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.login {
  min-height: 675px;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(@/assets/bg.jpg);
  @extend %bg;
}

.container {
  width: 350px;
}

.content {
  color: #fff;
  width: 300px;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  background: linear-gradient(230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%);
}

.account-area {
  margin-top: 50px;
}

:deep(.el-form-item__label) {
  color: #fff;
}

.qr-code-area {
  width: 200px;
  height: 200px;
  margin: 40px auto 20px auto;

  img {
    width: 100%;
    height: 100%;
  }
}

.forget-area {
  float: right;
  font-size: 13px;
  line-height: 16px;
  color: #267EF0;
}

.submit-btn {
  margin: 50px 0 30px 0;
  width: 100%;
}

.change-login-type {
  display: flex;
  border-top: 1px solid #eee;
  justify-content: space-between;
  padding-top: 10px;

  .login-type {
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #fff;
    width: 25%;
    position: relative;

    &:hover {
      cursor: pointer;
      color: #267EF0;
    }
  }

  .active {
    color: #267EF0;
  }

}
</style>
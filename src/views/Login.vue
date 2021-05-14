<template>
  <div class="login_background">
    <el-container class="login">
      <el-header height="100px" class="login_header">
        <router-link :to="{name: 'Blogs'}">
          <img src="../assets/logo-dog.png"
               style="top: 10px; margin-top: 10px; height: 80%"
               alt="MyBlog"/>
        </router-link>
      </el-header>
      <el-main>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                 class="input-box">
          <el-form-item label="用户名" prop="username" label-width="30%" class="item">
            <el-input type="text" maxlength="12"
                      v-model="ruleForm.username"
                      clearable/>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="30%" class="item">
            <el-input type="password" v-model="ruleForm.password"
                      autocomplete="off"
                      clearable/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')"
                       style="margin-right: 150px; font-size: 18px;">登录
            </el-button>
            <el-button @click="resetForm('ruleForm')"
                       style="font-size: 18px">重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    submitForm (formName: string) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交逻辑
          this.$axios.post('http://localhost:8081/login', this.ruleForm).then((res) => {
            const token = res.headers.authorization
            this.$store.commit('SET_TOKEN', token)
            this.$store.commit('SET_USERINFO', res.data.data)
            this.$router.push('/blogs')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    resetForm (formName: string) {
      this.$refs[formName].resetFields()
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    // this.$notify({
    //   title: '看这里：',
    //   message: '关注公众号：MarkerHub，回复【vueblog】，领取项目资料与源码',
    //   duration: 1500
    // })
  }
}
</script>

<style lang="less">
@login_width: 25%;
@login_left: (100% - @login_width) / 2;

.login {
  text-align: center;
  position: relative;
  top: 250px;
  background-color: #8BC6EC;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  opacity: 0.2;
  width: @login_width;
  left: @login_left;
  border-radius: 25px;
}

.login:hover {
  opacity: 1;
}

.input-box {
  margin: 20px auto;
  right: 40px;
  position: relative;
}

.login_background {
  background-color: bisque;
  background-size: cover;
  background-image: url("../assets/login_background_1.jpg");
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.item .el-form-item__label {
  font-size: 20px;
}

.login_header {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}
</style>

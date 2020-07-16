
<template>
    <div>
        <div  class="background">
            <img :src="imgSrc" width="100%" height="100%" alt="" />
        </div>

        <div class="front">
 <el-card class="box-card">
             <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
                <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    placeholder="请选择用户名"
                    prefix-icon="el-icon-s-custom"
                ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    placeholder="请选择密码"
                    prefix-icon="el-icon-unlock"
                    type="password"
                ></el-input>
                </el-form-item>
                <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetField">重置</el-button>
                </el-form-item>
            </el-form>



           




<!--                 
            <div slot="header" class="clearfix" >
                <span>登录</span>
                <el-button style="float: right; padding: 3px 0" type="text">忘记密码？</el-button>
            </div>
            
            <div >
                <el-input v-model="login.username" placeholder="用户名"></el-input>
                <el-input v-model="login.password" placeholder="密码" style="margin-top:5px"></el-input>
            
                <div style="margin-top:5px;text-align:left;"> <el-checkbox label="记住账号"></el-checkbox>
                </div>
                <div style="margin-top:5px"> 
                    <el-button  type="primary" size=medium @click="goHome">登　录</el-button>
                    <el-button>注　册</el-button>
                </div>
                
               
            </div> -->
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
              imgSrc:require('../assets/bgimg.jpg'),
             
              loginForm: {
                    username: "admin",
                    password: "123",
                    remeberMe:true 
                },
                //表单验证规则
            loginFormRules: {
                username: [
                { required: true, message: "请输入用户名", trigger: "blur" },
                { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
                ],
                password: [
                { required: true, message: "请输入密码", trigger: "change" },
                { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
                ]
            }
             
        }
       
    },
    methods:{
        //重置表单
        resetField() {
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                const res = await this.$http.post(
                    "/login",
                  this.$qs.stringify(this.loginForm)
                );


               // console.log(res.data.data.token);

                if (res.data.code !== 0) return this.$message.error("登录失败");
                this.$message.success("登录成功");
                //1.将登录成功后的token保存到客户端的sessionStorage中
                window.sessionStorage.setItem("Authentication", "Bearer" + res.data.data);
                //2跳转到后台主页。
                this.$router.push("/home");
            });
        }
    }
}
</script>
<style  >
 .background{
    top: 0;
    left: 0;
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
 
.front{
    width: 20%;
    padding-left: 40%;
    padding-top: 15%;
    z-index:1;
    position: absolute;
}


.clearfix{
    margin-left: -200px;
}



</style>
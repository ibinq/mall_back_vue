<template>
    <div class="background" style="height:100%">
         
         <el-row :gutter="20" >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >基本信息</el-breadcrumb-item>
                <el-breadcrumb-item > 账号管理 </el-breadcrumb-item>
              <el-breadcrumb-item > {{content}} </el-breadcrumb-item>
            </el-breadcrumb>
            
            </el-card>
  
            <el-card class="box-card" style="margin-top:15px;"  >
                <div>
                <el-tooltip class="item" effect="dark" content="返回" placement="top" >
                    <img :src="goBack" style="width:30px;float:left;cursor:pointer;"    @click="goAdminList" />
                </el-tooltip>
                </div>
                  <el-divider style="margin-top:40px;"></el-divider>
                <div style="margin-top:30px;">
                    <el-row :gutter="20" >
        <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="10">
             <el-form :model="admin" :rules="rules" ref="admin" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="admin.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="admin.password"></el-input>
                </el-form-item>
                <!-- <el-form-item label="确认密码" prop="password2">
                  <el-input v-model="admin.password2"></el-input>
                </el-form-item> -->
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="admin.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="admin.email"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-switch v-model="admin.status" @click="changeStatus()"></el-switch>
                </el-form-item>
                <el-form-item label="头像" prop="username">
                  <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:8088/upload/image"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="admin.avatar" :src="admin.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">保存</el-button>
                  <el-button @click="resetForm('admin')">重置</el-button>
                </el-form-item>
              </el-form>
                
                 
              
                 </el-col>
                 <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                </div>
            </el-card>
         
        </el-col>
        <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      
    </div>
</template>

<script>

export default {
  
    data() {
      return {
           goBack:require('../../assets/goback.png'),
           
           admin:{
               id:"",
               username:"",
               password:"",
              //  password2:"",
               phone:"",
               email:"",
               status:true,
               avatar:""
           },
           content:"",

           
          
        rules: {
          // username: [
          //   { required: true, message: '请输入用户名', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
        }
      }
    },
    created(){
     
    },
    mounted: function () {
      const id = this.$route.query.id;
      if(id != null && id != ""){
          this.getAdminInfo(id)
      }
      
      this.content = this.$route.query.content;
    },
    methods:{
      async getAdminInfo(id){
          const res = await this.$http.get("admins/"+id); 
          this.admin = res.data.data;
      },
      changeStatus(){
        this.admin.status = !this.admin.status;
      },
      async submitForm() {
        if(this.admin.id == null || this.admin.id == ""){
            const res = await this.$http.post("admins",this.$qs.stringify(this.admin)); 
        }else{
            const res = await this.$http.put("admins",this.$qs.stringify(this.admin)); 
        }
       
      },
      resetForm(admin) {
        this.$refs[admin].resetFields();
      },
      goAdminList(){
            this.$router.push("/account");
      },
        handleAvatarSuccess(res, file) {
         this.admin.avatar = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
    }
}
</script>
<style  >
el-col span{
font-size:20px;display:block;text-align: right;
} 
.el-breadcrumb__inner {
    color: #fff !important;
    font-size:18px;
}
.el-divider--horizontal{
    margin-top: 45px;
}
.el-row {
    margin-bottom: 8px;
    
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #fff;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #fff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #fff;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
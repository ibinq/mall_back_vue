<template>
    <div class="background" style="height:100%">
         
         <el-row :gutter="20" >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >商品管理</el-breadcrumb-item>
                <el-breadcrumb-item > 分类管理 </el-breadcrumb-item>
              <el-breadcrumb-item > {{content}} </el-breadcrumb-item>
            </el-breadcrumb>
            
            </el-card>
  
            <el-card class="box-card" style="margin-top:15px;"  >
                <div>
                <el-tooltip class="item" effect="dark" content="返回" placement="top" >
                    <img :src="goBack" style="width:30px;float:left;cursor:pointer;"    @click="goCategoryList" />
                </el-tooltip>
                </div>
                  <el-divider style="margin-top:40px;"></el-divider>
                <div style="margin-top:30px;">
                    <el-row :gutter="20" >
        <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="10">
             <el-form :model="category" :rules="rules" ref="category" label-width="100px" class="demo-ruleForm">
                <el-form-item label="分类名称" prop="name">
                  <el-input v-model="category.name"></el-input>
                </el-form-item>
                 <el-form-item label="父类名称" prop="parentId">
                    <el-cascader
                     v-model="category.parentId"
                    ref="cascader"
                    :options="options"
                    :props="defaultProps"
                    clearable
                    @change="change()"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="路径" prop="path">
                  <el-input v-model="category.path"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                  <el-input v-model="category.sort"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-switch v-model="category.status" @click="changeStatus()"></el-switch>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                  <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:8088/upload/image"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="category.icon" :src="category.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">保存</el-button>
                  <el-button @click="resetForm('category')">重置</el-button>
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
           category:{
               id:"",
               parentId:"",
               name:"",
               path:"",
               sort:"",
               status:true,
               icon:""
           },
           content:"",
           options:[],
            defaultProps: {
              value :"id",
              children: 'children',
              label: 'name',
              checkStrictly:true,
              emitPath:false
          },
        rules: {
          // username: [
          //   { required: true, message: '请输入用户名', trigger: 'blur' },
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // ],
        }
      }
    },
    created(){
      this.getCategoryTree();
    },
    mounted: function () {
      this.content = this.$route.query.content;
      this.category.parentId = this.$route.query.pid;
      this.category.id = this.$route.query.id;
      const id =  this.category.id;
      if(id != null && id != ""){
          this.getCategoryInfo(id)
      }
    },
    methods:{
      //获取tree组件的选中子节点
      // change: function () {
      //  let nodesObj = this.$refs['cascader'].getCheckedNodes()
      //  this.category.parentId=nodesObj.data.id
      //  console.log(nodesObj)
      // },
        async getCategoryTree(){
          const r = await this.$http.get("categories/tree");
          // console.log(r.data.data);
          this.options = r.data.data;
      },
      async getCategoryInfo(id){
          const res = await this.$http.get("categories/"+id); 
          this.category = res.data.data;
          // console.log(this.category )
      },
      changeStatus(){
        this.category.status = !this.category.status;
      },
      async submitForm() {
         if(this.category.id == null || this.category.id == ""){
            const res = await this.$http.post("categories",this.$qs.stringify(this.category)); 
        }else{
            const res = await this.$http.put("categories",this.$qs.stringify(this.category)); 
        }
       
      },
      resetForm(admin) {
        this.$refs[admin].resetFields();
      },
      goCategoryList(){
            this.$router.push("/category");
      },
        handleAvatarSuccess(res, file) {
         this.category.icon = res;
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
.el-cascader{
  width: 250px;
}
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
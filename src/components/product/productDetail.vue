<template>
    <div class="background" style="height:100%">
         
         <el-row :gutter="20" >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >商品管理</el-breadcrumb-item>
                <el-breadcrumb-item > 商品管理 </el-breadcrumb-item>
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
                      <el-form :model="product" :rules="rules" ref="product" label-width="100px" class="demo-ruleForm">
    <el-row :gutter="20" >
       
        <el-col :span="12">
             <el-form-item label="商品名称" prop="title">
                  <el-input v-model="product.name"></el-input>
                </el-form-item>
                 <el-form-item label="商品子名称" prop="title">
                  <el-input v-model="product.subTitle"></el-input>
                </el-form-item>
                 <el-form-item label="父类名称" prop="categoryId" >
                     <el-cascader
                     v-model="product.parentId"
                    ref="cascader"
                    :options="options"
                   :props="defaultProps"
                    clearable
                    
                    :show-all-levels="false"
                    ></el-cascader> 
                     
                </el-form-item>
        </el-col>
        <el-col :span="12">
            
               



                <el-form-item label="价格" prop="price">
                  <el-input v-model="product.price"></el-input>
                </el-form-item> 
                <el-form-item label="库存" prop="stock">
                  <el-input v-model="product.stock"></el-input>
                </el-form-item> 
                <el-form-item label="排序" prop="sort">
                  <el-input v-model="product.sort"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-switch v-model="product.status" @click="changeStatus()"></el-switch>
                </el-form-item>
               
            
            
                
                 
              
                 </el-col>
                 <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                  
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            
                 <el-form-item label="主图" prop="mainImage">
                    <el-upload
                    action="http://127.0.0.1:8088/upload/image"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :limit="5">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                 <el-form-item label="副图" prop="icon">
                      <el-upload
                    action="http://127.0.0.1:8088/upload/image"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview1"
                    :on-remove="handleRemove1"
                    :on-success="handleAvatarSuccess1"
                    :limit="5">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible1">
                    <img width="100%" :src="dialogImageUrl1" alt="">
                    </el-dialog>
                </el-form-item>

                        </el-col>

                    </el-row>
                        <el-form-item>
                  <el-button type="primary" @click="submitForm()">保存</el-button>
                  <el-button @click="resetForm('category')">重置</el-button>
                </el-form-item>
                     </el-form>
                </div>
            </el-card>
         
        </el-col>
        
        </el-row>
      
    </div>
</template>

<script>

export default {
  
    data() {
      return {
           goBack:require('../../assets/goback.png'),
           product:{
               id:"",
               categoryId:"",
               mainImage:[],
               subImage:[],
               title:"",
               subTitle:"",
               sort:"",
               status:true,
               stock:"",
               price:""
           },
           content:"",
           options:[],
            defaultProps: {
              value :"id",
              children: 'children',
              label: 'name',
            //   checkStrictly:true,
              emitPath:false
          },
        dialogImageUrl: '',
         dialogImageUrl1: '',
        dialogVisible: false,
         dialogVisible1: false,
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
    //   this.category.parentId = this.$route.query.pid;
      this.product.categoryId = this.$route.query.categoryId;
    //   const id =  this.category.id;
    //   if(id != null && id != ""){
    //       this.getCategoryInfo(id)
    //   }
    },
    methods:{
 
   handleAvatarSuccess(res, file) {
       if(this.product.mainImage==""){
            this.product.mainImage =  res;
       }else{
            this.product.mainImage =  this.product.mainImage+","+res;
       }
      },
        handleAvatarSuccess1(res, file) {
       if(this.product.subImage==""){
            this.product.subImage =  res;
       }else{
            this.product.subImage =  this.product.subImage+","+res;
       }
      },
        async getCategoryTree(){
          const r = await this.$http.get("categories/tree");
          this.options = r.data.data;
      },
      async getCategoryInfo(id){
          const res = await this.$http.get("categories/"+id); 
          this.category = res.data.data;
      },
      changeStatus(){
        // this.category.status = !this.category.status;
      },
      async submitForm() {
        //  if(this.category.id == null || this.category.id == ""){
        //     const res = await this.$http.post("categories",this.$qs.stringify(this.category)); 
        // }else{
        //     const res = await this.$http.put("categories",this.$qs.stringify(this.category)); 
        // }
       
      },
      resetForm(admin) {
        this.$refs[admin].resetFields();
      },
      goCategoryList(){
            this.$router.push("/category");
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        handleRemove1(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview1(file) {
        this.dialogImageUrl1 = file.url;
        this.dialogVisible1 = true;
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
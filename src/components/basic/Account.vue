<template>
    <div class="background" style="height:100%">
         
         <el-row :gutter="20" >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >基本信息</el-breadcrumb-item>
                <el-breadcrumb-item > 账号管理 </el-breadcrumb-item>
              
            </el-breadcrumb>
            
            </el-card>
            <el-card class="box-card" style="margin-top:15px;"  >
                 <el-input placeholder="请输入内容" v-model="searchAdmin.key" class="input-with-select" style="width:35%;float:left" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchAdminKey"></el-button>
            </el-input>
             <el-tooltip class="item" effect="dark" content="添加用户" placement="top" >
               <img :src="add" style="width:30px;float:right;cursor:pointer"  alt="添加用户" @click="addAdmin" />
            </el-tooltip>
           
               <el-table
                :data="tableData"
                stripe
                 :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                style="width: 100%; margin-top: 20px;">
                   <el-table-column
                type="index"
                width="50">
              </el-table-column>
                <el-table-column
                prop="username"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="avatar"
                label="头像">
                <template slot-scope="scope">
            　　　　<img :src="scope.row.avatar" width="35" height="35" class="head_pic"/>
            　　</template>
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="电话">
                </el-table-column>
                 <el-table-column
                prop="email"
                label="邮箱">
                </el-table-column>
                 <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.status" @change="changStatus(scope.row)"></el-switch>
                </template>
                </el-table-column>

                 <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                      <img :src="delete1" style="width:30px;cursor:pointer;"  @click="deleteAdmin(scope.row.id)" />
                    </el-tooltip>
                    
                    <el-tooltip class="item" effect="dark" content="授权" placement="top" :enterable="false">
                      <img :src="authorize" style="width:30px;cursor:pointer"   />
                    </el-tooltip>
                 
                    <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
                      <img :src="update" style="width:30px;cursor:pointer"   @click="updateAdmin(scope.row.id)" />
                    </el-tooltip>
                    
                  </template>
                </el-table-column>
            </el-table>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5,8, 15, 20, 50]"
                :page-size="8"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total style="margin-top: 10px;">
                </el-pagination>
               </el-card>
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      
    </div>
</template>

<script>

export default {
  
    data() {
      return {
          add:require('../../assets/add.png'),
          delete1:require('../../assets/delete1.png'),
          update:require('../../assets/update.png'),
          authorize:require('../../assets/authorize.png'),
          currentPage4:0,
          tableData: [],
          searchAdmin:{
            key:"",
            pageSize:8,
            pageNum:1
          },
          total:0
      }
    },
    created(){
      this.getAdminList();
    },
    methods:{
          addAdmin(){
             this.$router.push({  
              path: '/addAdmin',   
              query: {   
                 // 'id': id,   
                  'content':"添加用户"
              }  
            })  
            //this.$router.push("/addAdmin");
          },
          async updateAdmin(id){
            console.log(id)
            this.$router.push({  
              path: '/addAdmin',   
              query: {   
                  'id': id,   
                  'content':"编辑用户"
              }  
            })  
          },
          async deleteAdmin(id){
            const r = await this.$http.delete("admins/"+id);
            console.log(r);
            if(r.data.code == 0){
               this.getAdminList();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          },
          async changStatus(res){
             const r = await this.$http.get("admins/"+res.id+"/"+res.status);
             if(r.data.code == 0){
               
              this.$message({
                type: "success",
                message: "更新成功!"
              });
            }
          },
         async getAdminList() {
            const res = await this.$http.get("admins", {
              params: this.searchAdmin
            });
             console.log(res);
            // if (res.data.code !== 0) {
            //   return this.$message.error("获取用户数据失败！");
            // }
           
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          },
        searchAdminKey(){
          this.getAdminList();
        },
        handleSizeChange(newPageSize) {
          this.searchAdmin.pageSize = newPageSize;
          this.getAdminList();
        },
        handleCurrentChange(newPageNum) {
          this.searchAdmin.pageNum = newPageNum;
          this.getAdminList();
        },
        
    }
}
</script>
<style  >

.el-breadcrumb__inner {
    color: #fff !important;
    font-size:18px;
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

</style>
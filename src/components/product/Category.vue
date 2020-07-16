<template>
    <div class="background" style="height:100%">
         
         <el-row :gutter="20" >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >商品管理</el-breadcrumb-item>
                <el-breadcrumb-item > 分类管理 </el-breadcrumb-item>
            </el-breadcrumb>
            </el-card>
            <el-row :gutter="20" >
            <el-col :span="6">  
              <el-card class="box-card" style="margin-top:15px;"  >
                <el-tree 
                  :data="tree" 
                  :props="defaultProps" 
                  @node-click="handleNodeClick"
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  ></el-tree>
              </el-card></el-col>
            <el-col :span="18">
                <el-card class="box-card" style="margin-top:15px;"  >
                 <el-input placeholder="请输入内容" v-model="searchCategory.key" class="input-with-select" style="width:35%;float:left">
                <el-button slot="append" icon="el-icon-search" @click="getTableListByKey"></el-button>
                
            </el-input>
             <el-tooltip class="item" effect="dark" content="添加分类" placement="top" >
               <img :src="add" style="width:30px;float:right;cursor:pointer"  @click="addCategory" />
            </el-tooltip>
               <el-table
                :data="tableData"
                stripe
                style="width: 100%; margin-top: 20px;">
               <el-table-column
                type="index"
                width="50">
              </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="icon"
                label="图标">
                 <template slot-scope="scope">
            　　　　<img :src="scope.row.icon" width="35" height="35" class="head_pic"/>
            　　</template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                 <template slot-scope="scope">
                  <el-switch v-model="scope.row.status" @change="changStatus(scope.row)"></el-switch>
                </template>
                </el-table-column>
                 <el-table-column
                 
                label="操作">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                      <img :src="delete1" style="width:30px;cursor:pointer;"  @click="deleteCategory(scope.row.id)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
                      <img :src="update" style="width:30px;cursor:pointer"   @click="updateCategory(scope.row.id)" />
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
            
            </el-row>


            
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      
    </div>
</template>

<script>

export default {
  
    data() {
      return {
          tree: [],
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          searchCategory:{
            key:"",
            id:null,
            pageSize:8,
            pageNum:1
          },
          total:0,
          add:require('../../assets/add.png'),
          delete1:require('../../assets/delete1.png'),
          update:require('../../assets/update.png'),
          currentPage4:0,
          tableData: [],
      }
    },
    created(){
      this.getCategoryTree();
      this.getTableList();
    },
    methods:{
       
      addCategory(){
         this.$router.push({  
              path: '/categoryDetail',   
              query: {   
                  'pid':this.searchCategory.id,
                  'content':"添加分类"
              }  
            })  
      },
        
      async deleteCategory(id){
        const r = await this.$http.delete("categories/"+id);
      },
      async updateCategory(id){
         console.log(id)
            this.$router.push({  
              path: '/categoryDetail',   
              query: {   
                  'id': id, 
                  'content':"编辑分类"
              }  
            })  
      },
      async changStatus(res){
             const r = await this.$http.get("categories/"+res.id+"/"+res.status);
             if(r.data.code == 0){
              this.$message({
                type: "success",
                message: "更新成功!"
              });
            }
          },
      async getTableListByKey(){
        this.searchCategory.id = null;
        const r = await this.$http.get("categories",
                        {params:
                            this.searchCategory
                        });
        this.tableData = r.data.data.list;
        this.total = r.data.data.total;
      },
      async getTableList(){
        this.searchCategory.id = 0;
          const r = await this.$http.get("categories",
                        {params:
                            this.searchCategory
                        });
          this.tableData = r.data.data.list;
          this.total = r.data.data.total;
      },
      async getCategoryTree(){
          const r = await this.$http.get("categories/tree");
          console.log(r.data.data);
          this.tree = r.data.data;
          this.tableData = r.data.data.children;
      },
      async handleNodeClick(data) {
         this.searchCategory.id=data.id
           const r = await this.$http.get("categories",
                        {params:
                            this.searchCategory
                        });
          this.tableData = r.data.data.list;
          this.total = r.data.data.total;
      },
      handleSizeChange(newPageSize) {
        this.searchCategory.pageSize = newPageSize
         this.getTableList();
      },

      handleCurrentChange(newPageNum) {
        this.searchCategory.pageNum=newPageNum
         this.getTableList();
      }
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
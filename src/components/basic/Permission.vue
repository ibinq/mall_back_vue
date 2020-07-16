<template>
    <div class="background" style="height:100%">
         
         <el-row :gutter="20"  >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >基本信息</el-breadcrumb-item>
                <el-breadcrumb-item > 权限管理 </el-breadcrumb-item>
              
            </el-breadcrumb>
            
            </el-card>
            <el-card class="box-card" style="margin-top:15px;"  >
                 <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width:35%;float:left">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
               <el-table
                :data="tableData"
                stripe
                style="width: 100%; margin-top: 20px;">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400" style="margin-top: 10px;">
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
          input3:"",
          currentPage4:0,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods:{
        handleSizeChange(newPageSize) {
        },
        handleCurrentChange(newPageNum) {
        }
    }
}
</script>
<style  >

.el-breadcrumb__inner {
    color: #fff;
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
<template>
    <div class="background" style="height:100%">
      
         <el-row :gutter="20" >
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
            <el-card class="box-card" style=" background-color: rgb(12,175,248); ">
                <el-breadcrumb separator="/">
                <el-breadcrumb-item >订单管理</el-breadcrumb-item>
            </el-breadcrumb>
            </el-card>
            <el-tabs type="border-card" style="margin-top:15px;">
              <el-tab-pane label="全部" :value="value">
                <OrderCategoryList  :orders='all_order' />
              </el-tab-pane>
              <el-tab-pane label="待付款"> <OrderCategoryList  :orders='to_pay' /></el-tab-pane>
              <el-tab-pane label="待收货"> <OrderCategoryList  :orders='to_receive' /></el-tab-pane>
              <el-tab-pane label="已完成"> <OrderCategoryList  :orders='completed' /></el-tab-pane>
              <el-tab-pane label="售后"> <OrderCategoryList  :orders='sale_after' /></el-tab-pane>
            </el-tabs>
            
        </el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      
    </div>
</template>

<script>
import OrderCategoryList from './OrderList.vue';
export default {
    components: {
        'OrderCategoryList': OrderCategoryList ,
    },
    data() {
      return {
        value:"",
        all_order: [],
        to_pay:[],
        to_receive:[],
        completed:[],
        sale_after:[],
      }
    },
    async created(){
      const r = await this.$http.get("orders");
      console.log(r)
      this.all_order = r.data.data.all_order
      this.to_pay = r.data.data.to_pay
      this.to_receive = r.data.data.to_receive
      this.completed = r.data.data.completed
      this.sale_after = r.data.data.sale_after
    },
    methods:{
       
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
<template>
<div>
     <el-card class="box-card" style="margin-top:15px;"  >
                 <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width:35%;float:left">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
               <el-table
                :data="orders"
                stripe
                style="width: 100%; margin-top: 20px;">
                <el-table-column
                prop="orderNo"
                label="订单号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="username"
                label="收货人"
                width="180">
                </el-table-column>
                <el-table-column
                prop="paymentTime"
                label="下单时间">
                </el-table-column>
                 <el-table-column
                prop="payment"
                label="总金额">
                </el-table-column>
                 <el-table-column
                prop="statusStr"
                label="订单状态">
                </el-table-column>
                 <el-table-column
                label="操作">
                </el-table-column>
            </el-table>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total" style="margin-top: 10px;">
                </el-pagination>
               </el-card>
</div>
</template>
<script>
export default {
    data(){
        return{
            input3:"",
            currentPage4:0,
            total:0,
        }
    },
    name:'OrderCategoryList',
    props: {
      orders: Array,
    },
    mounted(){
        this.total = this.orders.length
    },
    methods:{
         handleSizeChange(newPageSize) {
        },
        handleCurrentChange(newPageNum) {
        }
    }
  
}
</script>
<style scoped>
 
</style>
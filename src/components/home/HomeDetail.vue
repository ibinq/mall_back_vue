<template>
  <div>
        <el-row :gutter="20" class="row1">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="16"> 
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card class="box-card" style=" background-color: rgb(12,175,248);">
                            <img  :src="xiaoliang" style="width:50px;height:50px;">
                         <countCard title="今日销售" :number="12312" :image="rmb"
                           />
                            
                        </el-card>
                    </el-col>
                    <el-col :span="6"><el-card class="box-card" style=" background-color: rgb(126,196,35);">
                        <img  :src="xiaoliang" style="width:50px;height:50px;">
                            <countCard title="今日销售" :number="12312" :image="rmb"
                           /></el-card></el-col>
                    <el-col :span="6"><el-card class="box-card" style=" background-color: rgb(255,160,96);">
                        <img  :src="xiaoliang" style="width:50px;height:50px;">
                            <countCard title="今日销售" :number="12312" :image="rmb"
                           /></el-card></el-col>
                    <el-col :span="6"><el-card class="box-card" style=" background-color: rgb(255,195,0);">
                        <img  :src="xiaoliang" style="width:50px;height:50px;">
                         <countCard title="今日销售" :number="12312" :image="rmb"
                           /></el-card></el-col>
                </el-row>
            </el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
         <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="16"> 
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-card class="box-card" style=" background-color: rgb(72,209,228);"><img  :src="xiaoliang" style="width:50px;height:50px;">
                            <countCard title="今日销售" :number="12312" :image="rmb"
                           />
                        </el-card></el-col>
                    <el-col :span="6">
                        <el-card class="box-card" style=" background-color: rgb(100,208,248);"><img  :src="xiaoliang" style="width:50px;height:50px;">
                           <countCard title="今日销售" :number="12312" :image="rmb"
                           />
                        </el-card>
                    </el-col>
                    <el-col :span="6"></el-col>
                    <el-col :span="6"></el-col>
                </el-row>
            </el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="12"> 
                <div id="myChart" ref="chart" style="width: 100%;height:400px;"></div>
            </el-col>
            <el-col :span="4">
                  <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="销量排行榜"
                        width="180">
                    </el-table-column>
                   
                   
                    </el-table>
            </el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
   </div>
</template>
<script>
import countCard from './countCard'

  export default { 
    components:{
      countCard
    },
    data() {
        return {
            xiaoliang:require('../../assets/home/xiaoliang1.png'),
            rmb:require('../../assets/home/rmb.png'),
            tableData: [{
                date: '2016-05-02',
            }, {
                date: '2016-05-04',
              
            }, {
                date: '2016-05-01',
            
            }, {
                date: '2016-05-03',
             
            }]
        };
    },
    created(){
    },
    mounted() {
        this.drawLine();
    },
    methods:{
 
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            console.log(this.$refs['chart'],111)
            // return
           let myChart = this.$echarts.init(this.$refs['chart'])
            // 指定图表的配置项和数据
            let option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }]
            };

            
            myChart.setOption(option);
        }
    }
}
</script>
<style  >

.row1{
    margin-top: 50px;
}
.box-card{
      width: 100%;
      /* height: 100px; */
     
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
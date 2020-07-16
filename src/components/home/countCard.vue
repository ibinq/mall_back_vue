<template>
     <div style="display: inline-block;margin-left:30px;">
        <span style="margin-top:10px;color:#fff;font-size:18px;">{{title}}</span>
        <div>
        <img  :src="image" style="width:20px;height:20px;" /><span style="margin-top:10px;color:#fff;font-size:18px;">{{number}}</span>
        </div>
    </div>
</template>

<script>

 export default{
     name:'countCard',
     props:{
         title:{
             type:String,
             require: true
         },
          image:{
             type:String,
             require: true
         },
         number:{
             type:Number,
             required: true
         }
         
     }
 }
 
 
</script>
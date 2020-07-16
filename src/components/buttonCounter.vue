
<template>
    <button v-on:click="count++">{{content}}You clicked me   times.</button>
</template>
<script>

 export default{
     name:'buttoncount',
     props:{
         content:{
             type:String,
             require: true
         }
         
     }
 }
 
 
</script>
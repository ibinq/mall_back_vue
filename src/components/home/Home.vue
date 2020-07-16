<template>
<el-container class="menu_container">
  <el-header class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
      <el-menu-item index="1" style="   margin-left: 20%;" @click="go('/homeDetail')" >首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title"  >基础信息</template>
        <el-menu-item index="2-1" @click="go('/account')">账号管理</el-menu-item>
        <el-menu-item index="2-2" @click="go('/permission')">权限管理</el-menu-item>
        <el-menu-item index="2-3" @click="go('/menu')">菜单管理</el-menu-item>
      </el-submenu>
       <el-submenu index="7">
        <template slot="title"  >商品管理</template>
        <el-menu-item index="7-1" @click="go('/category')">分类管理</el-menu-item>
        <el-menu-item index="7-2" @click="go('/product')">商品管理</el-menu-item>
        <el-menu-item index="7-3" @click="go('/stock')">库存管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" @click="go('/order')">订单管理</el-menu-item>
      <el-menu-item index="4" @click="go('/service')">售后管理</el-menu-item>
      <el-menu-item index="5" @click="go('/activity')">活动管理</el-menu-item>
      <el-menu-item index="6">其他</el-menu-item>
      <el-dropdown>
      <span class="el-dropdown-link">
         <el-avatar :size="40" :src="circleUrl" style=" margin-top: 10px;"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      
    </el-menu>
  </el-header>
  <el-main class="main"> <router-view></router-view></el-main>
</el-container>
</template>
<script>
 

  export default { 
   
    data() {
      return {
         activeIndex: '1',
        activeIndex2: '1',
        circleUrl:require('../../assets/header.jpg')
      };
    },
    methods: {
      async logout(){
        console.log(1);
        await this.$http.get("/logout");
        this.$router.push("/login");
      },
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
        go(page){
          console.log(page)
             this.$router.push(page);
        }
    }
  }
</script>
<style  >
 *{
   margin: 0;
   padding: 0;
 }
 .main{
    overflow: auto;
    height: 100%;
 }
 .header{
   padding: 0;   
   
 }
 .el-menu-demo{

   text-align: center;
 }

 
</style>
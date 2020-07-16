import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import HomeDetail from '@/components/home/HomeDetail'
import Account from '@/components/basic/Account'
import Permission from '@/components/basic/Permission'
import Menu from '@/components/basic/Menu'
import Category from '@/components/product/Category'
import Product from '@/components/product/Product'
import Stock from '@/components/product/Stock'
import Order from '@/components/order/Order'
import Service from '@/components/service/Service'
import Activity from '@/components/Activity/Activity'
import AddAdmin from '@/components/basic/AddAdmin'
import CategoryDetail from '@/components/product/CategoryDetail'
import ProductDetail from '@/components/product/ProductDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/home',
      component: Home,
      redirect:'/homeDetail',
      children:
      [
          { path: '/homeDetail', component: HomeDetail },
          { path: '/account', component: Account },
          { path: '/addAdmin', component: AddAdmin },
          { path: '/permission', component: Permission },
          { path: '/menu', component: Menu },
          { path: '/category', component: Category },
          { path: '/product', component: Product },
          { path: '/stock', component: Stock },
          { path: '/order', component: Order },
          { path: '/service', component: Service },
          { path: '/activity', component: Activity },
          { path: '/categoryDetail', component: CategoryDetail },
          { path: '/productDetail', component: ProductDetail }
           
      ]
    }
  ]
})

<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened='true'
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.id+''" v-for="item in menusList" :key='item.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item :index="'/home/'+subitem.path" v-for="subitem in item.children" :key='subitem.id'><i class="el-icon-menu"></i>{{subitem.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class="myicon myicon-menu toggle-btn"></i>
          <p style="font-size :28px;color:white">电商后台管理系统</p>
          <a href="javascript" style="color:orange;text-decoration: underline">退出</a>
        </el-header>
        <el-main>
          <!-- 添加路由展示区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLeftMenus } from '@/api/rights.js'
export default {
  data () {
    return {
      menusList: []
    }
  },
  mounted () {
    getLeftMenus()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.menusList = res.data.data
        }
      })
  }
}
</script>
<style lang="less" scoped>
  .home {
  height: 100%;
  background-color: #e7eef3;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: white;
  }
}
</style>

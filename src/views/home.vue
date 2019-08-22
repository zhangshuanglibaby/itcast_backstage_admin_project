<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>导航应用</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="2-1"> <i class="el-icon-menu"></i>导航应用</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="3-1"><i class="el-icon-menu"></i>选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="4-1"><i class="el-icon-menu"></i>选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
              <el-menu-item index="5-1"><i class="el-icon-menu"></i>选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>头部</el-header>
        <el-main>主题</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
</style>

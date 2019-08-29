<template>
  <div class="rightsList">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" style="line-height:40px;background:#d0dce6">
      <el-breadcrumb-item :to="{ name: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'rightsList'}">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="rightsList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="70"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span>{{scope.row.level|levelFormat}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 -->
  </div>
</template>
<script>
import { getAllRights } from '@/api/rights.js'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  // 创建一个过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  async mounted () {
    // 加载所有权限列表数据
    let res = await getAllRights('list')
    // console.log(res)
    this.rightsList = res.data.data
  }
}
</script>
<style lang="less" scoped>
</style>

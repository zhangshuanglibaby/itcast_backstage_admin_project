<template>
  <div class="rolesList">
    <!-- 面包屑 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="line-height:40px;background:#d0dce6"
    >
      <el-breadcrumb-item :to="{ name: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'rightsList'}">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'rolesList'}">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="success" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
        </el-form>
      </template>
    </el-table-column>
      <el-table-column type="index" label='序号' width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="描述" width="500"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="warning"
            plain
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-check"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRoles } from '@/api/roles.js'
export default {
  data () {
    return {
      rolesList: []
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  mounted () {
    getAllRoles()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rolesList = res.data.data
        }
      })
      .catch(err => {
        this.$message.error('服务器异常')
      })
  }
}
</script>
<style lang="less" scoped>
</style>

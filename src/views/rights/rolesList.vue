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
            <el-row v-for="first in props.row.children" :key="first.id" style="margin-bottom:8px;border-bottom:1px solid #eee">
              <el-col :span="4">
                <el-tag closable @close='delRights(props.row,first.id),cnt=0'>{{first.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:5px">
                  <el-col :span="4">
                    <el-tag closable type="sucess" @close='delRights(props.row,second.id),cnt=0'>{{second.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag closable type="warning" @close='delRights(props.row,third.id),cnt=0' v-for="third in second.children" :key='third.id' style="margin-right:5px">{{third.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-show="props.row.children.length === 0">还没有设置权限,请去角色授权设置</el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
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
            @click="grantRoleRigths(scope.row)"
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
import { getAllRoles, delRights } from '@/api/roles.js'
import { getAllRights } from '@/api/rights.js'
export default {
  data () {
    return {
      rolesList: [],
      grantRoleRightdialogFormVisible: false,
      rightsList: [],
      checkedArr: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      cnt: 0
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    async delRights (row, rightId) {
      // console.log(row, rightId)
      let res = await delRights(row.id, rightId)
      // console.log(res)
      // 刷新---不能直接刷新getAllRoles,会导致展开航闭合,只需要重新赋值给
      row.children = res.data.data
      if (this.cnt === 0) {
        this.$message.success(res.data.meta.msg)
        this.cnt++
      }

      row.children.forEach(v1 => {
        if (v1.children.length === 0) {
          // 说明1级权限没有下级了,此时应该把1级权限也删除
          this.delRights(row, v1.id)
        } else {
          // 否则继续遍历2级权限
          v1.children.forEach(v2 => {
            if (v2.children.length === 0) {
              // 说明2级没有下级了,此时需要把2级删除
              this.delRights(row, v2.id)
            }
          })
        }
      })
    }
  },
  mounted () {
    getAllRoles()
      .then(res => {
        // console.log(res);
        if (res.data.meta.status === 200) {
          this.rolesList = res.data.data
        }
      })
      .catch(() => {
        this.$message.error('服务器异常')
      })
    getAllRights('tree').then(res => {
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsList = res.data.data
      }
    })
  }
}
</script>
<style lang="less" scoped>
</style>

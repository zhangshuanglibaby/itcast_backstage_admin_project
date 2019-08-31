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
    <el-button type="success" plain @click="addRoledialogFormVisible=true">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="rolesList" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row
              v-for="first in props.row.children"
              :key="first.id"
              style="margin-bottom:8px;border-bottom:1px solid #eee"
            >
              <el-col :span="4">
                <el-tag closable @close="delRights(props.row,first.id),cnt=0">{{first.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:5px">
                  <el-col :span="4">
                    <el-tag
                      closable
                      type="sucess"
                      @close="delRights(props.row,second.id),cnt=0"
                    >{{second.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      closable
                      type="warning"
                      @close="delRights(props.row,third.id),cnt=0"
                      v-for="third in second.children"
                      :key="third.id"
                      style="margin-right:5px"
                    >{{third.authName}}</el-tag>
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
            @click="showGrantDialog(scope.row)"
            icon="el-icon-check"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="delRole(scope.row)"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 授权角色的对话框 -->
    <el-dialog title="授权角色" :visible.sync="grantRightdialogFormVisible">
      <el-tree
        :data="rightsList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantRightdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleRights(roleId)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色的对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRoledialogFormVisible">
      <el-form :model="addRoleform" :label-width="'80px'" :rules="rules" ref="addRoleform">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllRoles,
  delRights,
  editRoleRights,
  addRole,
  delRole
} from '@/api/roles.js'
import { getAllRights } from '@/api/rights.js'
export default {
  data () {
    return {
      rolesList: [],
      cnt: 0,
      grantRightdialogFormVisible: false,
      rightsList: [],
      checkedArr: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      roleId: '',
      addRoleform: {
        roleName: '',
        roleDesc: ''
      },
      addRoledialogFormVisible: false,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    // 获取所有角色列表数据
    init () {
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
    },
    // 删除用户指定的权限
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
    },
    // 授权角色的数据默认展示
    showGrantDialog (row) {
      this.grantRightdialogFormVisible = true
      // console.log(row)
      this.roleId = row.id
      // 树形控件具有缓存功能,每次点击需要重新加载数据---利用深拷贝
      this.rightsList = [...this.rightsList]
      // 让默认选中的checkedArr清空
      this.checkedArr.length = 0
      for (let e1 of row.children) {
        if (e1.children.length > 0) {
          for (let e2 of e1.children) {
            if (e2.children.length > 0) {
              for (let e3 of e2.children) {
                this.checkedArr.push(e3.id)
              }
            }
          }
        }
      }
    },
    // 编辑提交角色
    async editRoleRights (roleId) {
      // console.log(this.$refs.tree.getCheckedNodes())
      // let temp = this.$refs.tree.getCheckedNodes()
      // let rids = []
      // temp.forEach(e => {
      //   rids.push(e.id + ',' + e.pid)
      // })
      // rids = rids.join(',').split(',')
      // // 去重
      // rids = [...new Set(rids)].join(',')
      // let res = await editRoleRights(roleId, rids)
      // // console.log(roleId)
      // // console.log(rids)
      // // console.log(res)
      // if (res.data.meta.status === 200) {
      //   this.grantRightdialogFormVisible = false
      //   this.$message.success(res.data.meta.msg)
      //   // 刷新
      //   this.init()
      // }
      /** -----------------------第二种方法---------------------------------- */
      // console.log(this.$refs.tree.getHalfCheckedKeys())
      // console.log(this.$refs.tree.getCheckedKeys())
      let arr = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ]
      let res = await editRoleRights(roleId, arr.join(','))
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.grantRightdialogFormVisible = false
        this.init()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    // 添加角色
    addRole () {
      // 要进行表单的二次验证
      this.$refs.addRoleform.validate(async valid => {
        if (valid) {
          let res = await addRole(this.addRoleform)
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            this.addRoledialogFormVisible = false
            // 刷新
            this.init()
            // 清空表单
            this.$refs.addRoleform.resetFields()
          }
        } else {
          this.$message.error('请将必填的信息完善')
        }
      })
    },
    // 删除角色
    delRole (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await delRole(row.id)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success('删除成功!')
          // 刷新
          this.init()
        }
      }).catch(() => {
        this.$message.into('已取消删除')
      })
    }
  },
  mounted () {
    // 获取所有角色的数据
    this.init()
    // 获取所有权限的数据
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

<template>
  <div class="users">
    <!-- 面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索输入+ 添加按钮 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="userObj.query"
        class="input-with-select"
        style="width:300px;margin-right:20px"
        @input.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain @click="addRoleDialogFormVisible=true">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="usersList" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <!-- 添加用户状态 -->
      <template>
        <el-table-column prop="mg_state" label="用户状态">
          <el-switch v-model="status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-table-column>
      </template>
      <!-- 添加自定义列模板操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="showEditRoleDialog(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button
            size="mini"
            type="warning"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          >
            <i class="el-icon-check"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userObj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addRoleDialogFormVisible">
      <el-form :model="addRoleForm" :label-width="'80px'" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addRoleForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addRoleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addRoleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addRoleForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="EditRoleDialogFormVisible">
      <el-form :model="editRoleForm" :label-width="'80px'" :rules="rules">
        <el-form-item label="用户名" >
          <el-input v-model="editRoleForm.username" auto-complete="off" style="width:80px" disabled=""></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email" >
          <el-input v-model="editRoleForm.email" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="手机" prop="mobile">
          <el-input v-model="editRoleForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllUsers, addRole, editRole } from '@/api/users.js'
export default {
  data () {
    return {
      total: 0,
      status: true,
      usersList: [],
      userObj: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      addRoleDialogFormVisible: false,
      addRoleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '长度不能小于5个字符', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: '请正确输入邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: '请正确输入手机号',
            trigger: 'blur'
          }
        ]
      },
      EditRoleDialogFormVisible: false,
      editRoleForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.userObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.userObj.pagenum = val
      this.init()
    },
    // 获取所有用户的数据
    init () {
      getAllUsers(this.userObj)
        .then(res => {
          // console.log(res)
          this.usersList = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加用户
    async addRole () {
      this.addRoleDialogFormVisible = false
      let res = await addRole(this.addRoleForm)
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg)
        // 刷新
        this.init()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    // 编辑用户数据的默认展示
    showEditRoleDialog (row) {
      this.EditRoleDialogFormVisible = true
      // console.log(row)
      this.editRoleForm.id = row.id
      this.editRoleForm.username = row.username
      this.editRoleForm.email = row.email
      this.editRoleForm.mobile = row.mobile
    },
    // 编辑用户提交
    async editRole () {
      this.EditRoleDialogFormVisible = false
      let res = await editRole(this.editRoleForm)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        // 刷新
        this.init()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    }
  },
  // 组件一加载就要获取数据使用钩子函数
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  line-height: 45px;
}
</style>

<template>
  <div class="goods">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:40px">
      <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path : 'goods'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 + 添加按钮 -->
    <el-input
      placeholder="请输入搜索内容"
      v-model="goodsObj.query"
      class="input-with-select"
      style="width:300px;margin-right :5px"
      @keydown.native.enter="init"
    >
      <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
    </el-input>
    <el-button type="success" plain>添加商品</el-button>
    <!-- 表格 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="warning"
            plain
            icon="el-icon-check"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="delGood(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsObj.pagenum"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="goodsObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllGoods, delGood } from '@/api/goods.js'
import { async } from 'q'
export default {
  data () {
    return {
      goodsObj: {
        query: '',
        pagenum: 1,
        pagesize: 50
      },
      goodsList: [],
      total: 0
    }
  },
  methods: {
    // 获取商品列表数据
    init () {
      getAllGoods(this.goodsObj)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.goodsList = res.data.data.goods
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(() => {
          this.$message.error('服务器异常')
        })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.goodsObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.goodsObj.pagenum = val
      this.init()
    },
    // 删除商品
    delGood (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await delGood(row.goods_id)
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('删除成功!')
            this.init()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  mounted () {
    // 获取商品列表数据
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>

<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:40px">
      <el-breadcrumb-item :to="{ path: 'welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path : 'goods'}">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'add'}">商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="activeName-0" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 卡片 -->
    <el-form>
      <el-card class="box-card">
        <el-tabs
          v-model="activeName"
          tabPosition="left"
          :before-leave="beforeLeave"
          @tab-click="handleClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" label-width="80px">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" label-width="80px">
              <el-input v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" label-width="80px">
              <el-input v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" label-width="80px">
              <el-input v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" label-width="80px">
              <el-cascader
                :options="cateList"
                :props="cascaderProps"
                clearable
                v-model="addForm.goods_cat"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-checkbox-group
              v-model="item.attr_vals"
              v-for="item in attrList"
              :key="item.attr_id"
            >
              <el-form-item :label="item.attr_name">
                <el-checkbox
                  :label="subitem"
                  border
                  v-for="(subitem,index) in item.attr_vals"
                  :key="index"
                  style="margin-right:0px"
                ></el-checkbox>
              </el-form-item>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in attrList" :key='item.attr_id' label-width="80px">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
        <div class="btn" style="margin-top:20px">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import { getAllCateList } from '@/api/cate.js'
import { getAllParams } from '@/api/params.js'
export default {
  data () {
    return {
      active: 1,
      addForm: {
        goods_name: '', // 商品名称
        goods_cat: '', // 商品分类的id,
        goods_price: '', // 价格
        goods_number: '', // 数量
        goods_weight: '', // 重量
        goods_introduce: '', // 介绍
        pic: [], // 上传图片的临时路径
        attrrs: [] // 商品的参数
      },
      activeName: '0',
      cateList: [],
      cascaderProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      attrList: []
    }
  },
  methods: {
    beforeLeave (activeName) {
      if (activeName === '1' || activeName === '2') {
        // 要检测是否有在基本信息那选择了商品分类
        if (this.addForm.goods_cat.length !== 3) {
          this.$message.warning('请先选择商品分类')
          this.activeName = '0'
          // 阻止切换
          return false
        }
      }
    },
    async handleClick () {
      if (this.activeName === '1') {
        // 只需获取分类的最后一级id即可获取全部分类参数
        let res = await getAllParams(this.addForm.goods_cat[2], 'many')
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.attrList = res.data.data
          // 需要把attrList里面的一个值转成数组
          for (var i of this.attrList) {
            i.attr_vals = i.attr_vals.split(',')
          }
        } else {
          this.$message.error(res.data.meta.msg)
        }
      } else if (this.activeName === '2') {
        let res = await getAllParams(this.addForm.goods_cat[2], 'only')
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.attrList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      }
    }
  },
  mounted () {
    getAllCateList(3)
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.cateList = res.data.data
        }
      })
      .catch(() => {
        this.$message.error('服务器异常')
      })
  }
}
</script>
<style lang="less" scoped>
</style>

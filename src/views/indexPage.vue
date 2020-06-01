<template>
  <div class="content">
    <div class="conPd">
      <div class="conSearch">
        <el-input v-model="search" size="small" placeholder="请输入内容" />
        <el-button type="primary" size="small">搜索</el-button>
      </div>
      <div class="conAdd">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">添加新的api</el-button>
      </div>
      <div class="conTab">
        <el-table :data="tableData" fit highlight-current-row border style="width: 100%">
          <el-table-column label="api名称" prop="name"  />
          <el-table-column label="服务编码" prop="code"  />
          <el-table-column label="是否启用" >
            <template slot-scope="scope">
              <el-switch class="switch" v-model="scope.row.status" active-color="#409EFF" inactive-color="#F56C6C" active-value="0" inactive-value="1" active-text="启用" inactive-text="停止" @change="apiStatus(scope.row)">
              </el-switch>
            </template>
            <!-- <template slot-scope="scope">
              <el-button size="mini" class="Booleans" @click="handleEdit(scope.$index, scope.row)">启动</el-button>
              <span class="bt2">/</span>
              <el-button size="mini" class="Booleans" @click="handleDelete(scope.$index, scope.row)">暂停</el-button>
            </template> -->
          </el-table-column>
          <el-table-column label="创建时间" prop="date" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" class="action" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <span class="btl">|</span>
              <el-button size="mini" class="action" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增sapi" :visible.sync="dialogFormVisible" width="1000px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="名称：" prop="name" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="服务编码：" prop="code" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="dec" :label-width="formLabelWidth">
              <el-input v-model="form.dec" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <div v-for="(item,index) in form.domains" :key='index'>
              <el-form-item label="代理地址：" :rules="{ required: true, message: '请输入代理地址', trigger: 'blur' }" :label-width="formLabelWidth" class="bl">
                <el-input v-model="item.addr" :rules="{ required: true, message: '请输入服务路径', trigger: 'blur' }" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item label="服务路径：" :label-width="formLabelWidth" class="bl">
                <el-input v-model="item.path" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <svg-icon icon-class="add" @click="AddPath" />
              <svg-icon icon-class="delete" @click.prevent="removeDomain(item)" />
              <!-- <el-button type="primary" size="small" @click="AddPath" class="bl" icon="el-icon-plus"></el-button>
              <el-button type="primary" size="small" @click.prevent="removeDomain(item)" class="bl" icon="el-icon-minus"></el-button> -->
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="saveNew('form')" size="small">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑sapi" :visible.sync="dialogFormVisible1" width="1000px">
          <el-form :model="form1" :rules="rules" ref="form1">
            <el-form-item label="名称：" prop="name" :label-width="formLabelWidth">
              <el-input v-model="form1.name" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="服务编码：" prop="code" :label-width="formLabelWidth">
              <el-input v-model="form1.code" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="dec" :label-width="formLabelWidth">
              <el-input v-model="form1.dec" autocomplete="off" size="small"></el-input>
            </el-form-item>
            <div v-for="(item,index) in form1.domains" :key='index'>
              <el-form-item label="代理地址：" :rules="{ required: true, message: '请输入代理地址', trigger: 'blur' }" :label-width="formLabelWidth" class="bl">
                <el-input v-model="item.addr" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item label="服务路径：" :rules="{ required: true, message: '请输入服务路径', trigger: 'blur' }" :label-width="formLabelWidth" class="bl">
                <el-input v-model="item.path" autocomplete="off" size="small"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false" size="small">取 消</el-button>
            <el-button type="primary" @click="saveChange('form1')" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexPage',
  data () {
    return {
      search: '',
      currentPage: 1, // 默认第几页
      pageSize: 20, // 条数
      pageIndex: 1, // 页码
      totalCount: 100,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        code: 1,
        domains: [{
          addr: '1',
          path: '2'
        },
        {
          addr: '3',
          path: '4'
        }]
      }, {
        date: '2016-05-04',
        name: '王小虎',
        code: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        code: 3
      }, {
        date: '2016-05-03',
        name: '王小虎',
        code: 4
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        code: 5
      }, {
        date: '2016-05-03',
        name: '王小虎',
        code: 6
      }, {
        date: '2016-05-03',
        name: '王小虎',
        code: 7
      }, {
        date: '2016-05-03',
        name: '王小虎',
        code: 8
      }, {
        date: '2016-05-03',
        name: '王小虎',
        code: 9
      }, {
        date: '2016-05-03',
        name: '王小虎',
        code: 5
      }],
      dialogFormVisible: false, // 新增
      dialogFormVisible1: false, // 编辑
      formLabelWidth: '100px',
      form: {
        name: '',
        code: '',
        dec: '',
        domains: [{
          addr: '',
          path: ''
        }]

      },
      form1: {
        name: '',
        code: '',
        dec: '',
        domains: [{
          addr: '',
          path: ''
        }]
      },
      rules: {
        name: [
          { required: true, message: '请输入api姓名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入服务编码', trigger: 'blur' }
        ],
        dec: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 编辑
    handleEdit (index, row) {
      this.dialogFormVisible1 = true
      this.form1 = row
    },
    // 删除
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        // this.$http({
        //   url: this.$http.adornUrl(`/levPerson/updateStatus/${id}`),
        //   method: 'post',
        // }).then(res => {
        //   if (!res.data.code) {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!'
        //     });
        //     this.getData();
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取数据
    getData () {
      this.$http({
        url: this.$http.adornUrl('/project/list'),
        method: 'post'
        // data: this.$http.adornData(this.search1)
      }).then(res => {
        console.log(res)
        this.$message.error(res.data.msg)
        // this.tableData = res.data.page.list
        // this.pageSize = res.data.page.pageSize
        // this.totalCount = res.data.page.totalCount
        // this.currentPage = res.data.page.currPage
        // this.search1 = { brand_right: 0 }
      })
    },
    handleSizeChange (val) {
      // this.search1.pageSize = val;
      // console.log(`每页 ${val} 条`);
      // this.getData();
    },
    handleCurrentChange (val) {
      // this.search1.pageIndex = val;
      // console.log(`当前页: ${val}`);
      // this.getData();
    },
    // 新增保存按钮
    saveNew (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          //   this.form2.zoneCd = this.userInfo.username
          //   this.$http({
          //     url: this.$http.adornUrl('/levPerson/save'),
          //     method: 'post',
          //     data: this.$http.adornData(this.form2)
          //   }).then(res => {
          //     // console.log(res)
          //     if (!res.data.code) {
          //       this.$message({
          //         message: '新增成功',
          //         type: 'success'
          //       });
          //       this.dialogTableVisible2 = false
          //       this.form2 = JSON.parse(JSON.stringify(this.form))
          //       this.getData();
          //     } else {
          //       this.$message({
          //         message: '新增失败',
          //         type: 'error'
          //       });
          //     }
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑保存按钮
    saveChange (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form1)
          this.dialogFormVisible1 = false
          //   this.form2.zoneCd = this.userInfo.username
          //   this.$http({
          //     url: this.$http.adornUrl('/levPerson/save'),
          //     method: 'post',
          //     data: this.$http.adornData(this.form2)
          //   }).then(res => {
          //     // console.log(res)
          //     if (!res.data.code) {
          //       this.$message({
          //         message: '新增成功',
          //         type: 'success'
          //       });
          //       this.dialogTableVisible2 = false
          //       this.form2 = JSON.parse(JSON.stringify(this.form))
          //       this.getData();
          //     } else {
          //       this.$message({
          //         message: '新增失败',
          //         type: 'error'
          //       });
          //     }
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 启停
    apiStatus (index, row) {
      console.log(index, row)
    },
    // 添加代理、服务
    AddPath () {
      this.form.domains.push({
        addr: '',
        path: ''
      })
    },
    // 删除代理、服务
    removeDomain (item) {
      if (this.form.domains.length > 1) {
        var index = this.form.domains.indexOf(item)
        if (index !== -1) {
          this.form.domains.splice(index, 1)
        }
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
.conAdd {
  padding-top: 24px;
}
.conTab {
  padding-top: 24px;
  .action,
  .Booleans {
    border: 0;
    margin: 0;
    padding: 0;
    color: #477de9;
    font-size: 14px;
  }
  .Booleans,
  .bt2 {
    color: #364860;
  }
  .btl,
  .bt2 {
    margin: 0 8px;
    color: #477de9;
  }
  .bl {
    display: inline-block;
  }
  .svg-icon{
    font-size: 16px;
    padding-right: 10px;
    cursor: pointer;
  }
}
</style>

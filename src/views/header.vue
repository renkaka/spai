<template>
  <div id="header">
    <el-col :gutter="20">
      <el-col :span="4">
        <div class="nobg">
          <!-- <img src="../assets/image/logo.svg" class="navLogo" /> -->
          <span>SAPI发布中心</span>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple" style="height:50px;"></div>
      </el-col>
      <el-col :span="4">
        <div class="userInfo">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
              <img src="../assets/image/photo.png" class="user-avatar">
              <span>admin</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-col>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    logout () {
      this.$confirm('是否确定退出登录?', '退出提醒', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style  lang="scss" scoped>
#header {
  height: 50px;
  line-height: 50px;
  min-width: 1480px;
  color: #fff;
  background: rgba(31, 46, 77, 1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  .nobg {
    font-size: 22px;
    cursor: pointer;
    margin-left: 24px;
    .navLogo {
      margin: -5px 10px 0 0;
      vertical-align: middle;
    }
  }
  .userInfo {
    text-align: right;
    margin-right: 24px;
    cursor: pointer;
    span {
      color: #fff;
    }
    .user-avatar {
      vertical-align: middle;
      margin: 0 8px;
    }
  }
}
.el-dropdown-menu {
  width: 150px;
  padding: 1px 0;
  text-align: center;
}
</style>

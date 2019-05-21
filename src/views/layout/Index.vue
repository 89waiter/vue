<template>
    <div>
        <div class="sidebar-container">
            <el-scrollbar style="height:100%">
            <el-menu class="el-menu-vertical"
                :default-active="$route.path"
                background-color="#6959CD"
                text-color="white"
                active-text-color="#21baa9" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
            </el-menu>
            </el-scrollbar>
        </div>
        <div class="head-content">
            <p>用户 {{username}} <span @click="logout">退出</span></p>
        </div>
        <div class="tags-content">
            <tags></tags>
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
  import routers from '../../router'
  import SidebarItem from './SidebarItem.vue'
  import Tags from './Tags.vue'
  export default {
    data() {
      return {
        isCollapse: false,
        permission_routers: [],
        username: ''
      }
    },
    mounted: function() {
        this.username = localStorage.getItem('username')
        // console.log(this.$store.state.permission.routers)
        this.permission_routers = this.$store.state.permission.routers
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      logout() {
        var _this = this;
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$fetch('/logout/index').then(response => {
                console.log(response)
                if(response.code == 0) {
                    localStorage.removeItem('username')
                    _this.$router.push('/login')
                }
            }).catch(err => {
                console.log(err)
            })
        }).catch(() => {
        });
      }
    },
    components: { SidebarItem, Tags }
  }
</script>
<style>

</style>

<style>
/* 左侧 导航条 */
.sidebar-container {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #6959CD;
    overflow: hidden;
}
.sidebar-container .el-menu-item{
    background: #7171c6 !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-scrollbar__wrap {   /* 修改横向滚动条 但是select下拉会出现问题 解决方法 padding-bottom: 17px */
  overflow-x: hidden;
  padding-bottom: 17px;
}
i.fa{
    margin-right: 16px;
}
.el-menu-item i {
    color: #fff
}
.el-submenu__title i {
    color: #fff
}
/* 头部内容 */
.head-content {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    margin-left: 200px;
    padding: 0 20px;
    text-align: right;
}
.tags-content {
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    margin-left: 200px;
    padding: 0 20px;
}
/* 主体内容 */
.main-content {
    margin-left: 200px;
    padding: 20px;
}
</style>


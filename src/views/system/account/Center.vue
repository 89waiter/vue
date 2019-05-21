<template>
    <div>
        <div class="box clearfix">
            <label for="" class="fl">用户名</label>
            <div class="item">
                <el-input v-model="username" disabled placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="box clearfix">
            <label for="" class="fl">密码</label>
            <div class="item">
                <el-input v-model="password" maxlength="8" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div>
            <el-button type="primary" size="small" @click="change">修改</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    mounted() {
        this.username = localStorage.getItem('username')
    },
    methods: {
        change: function() {
            var _this = this
            var obj = {
                password : this.password
            }
            this.$postForm('/user/updatePwd',obj).then(res => {
                if(res.code == 0) {
                    _this.$alert('更新成功', '提示', {
                    confirmButtonText: '确定'
                    });
                }else{
                    _this.$alert('更新失败', '提示', {
                    confirmButtonText: '确定'
                    });
                }
            }).catch(err => {
                console.log(err)
            }) 
        }
    }
}
</script>
<style scoped>
.clearfix::after{
    display: block;
    content:'';
    clear: both;
}
.box {
    width: 260px;
    padding-bottom: 15px;
}
.fl{
    display: block;
    width: 60px;
    height: 40px;
    line-height: 40px;
    float: left;
}
.item{
    width: 180px;
    float: left;
}
</style>


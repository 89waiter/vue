<template>
    <div class="wrap">
        <div class="login-form">
            <div class="login-form-item">
                <el-input v-model="userName" placeholder="请输入用户名"></el-input>
            </div>
            <div class="login-form-item">
                <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            </div>
            <div class="login-form-item">
                <el-button type="primary" style="width:100%;" @click="login" :loading="loading">登 陆</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userName: '',
                password: '',
                loading: false
            }
        },
        mounted: function(){

        },
        methods: {
            login: function() {
                var _this = this
                var obj = {
                    username: this.userName,
                    password: this.password
                }
                _this.loading = true
                this.$postForm('/login/index',obj).then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        localStorage.setItem('username',res.data.username)
                        _this.loading = false
                        _this.$router.push('/')
                    }else {
                        _this.loading = false
                        _this.$alert(res.message, '提示', {
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

.wrap{
    width: 330px;
    padding-top:444px;
    margin: 0 auto; 
}
.login-form-item {
    margin-top: 15px;
}
.btn {
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
}
</style>

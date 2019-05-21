<template>
    <div>
        <div class="box">
            <div class="btnbox" v-if="!imgUrl">
                +
            </div>
            <div class="btnbox" v-else>
                <img :src="imgUrl" alt="" srcset="">
            </div>
            <input type="file" @change="handleFileChange" ref="headfile" class="headfile" name="">
        </div>
        <el-button type="primary" size="small" @click="upload">上传头像</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgUrl: ''
        }
    },
    mounted() {
        var _this = this
        this.$fetch('user/getUser').then(res => {
            if(res.code == 0) {
                _this.imgUrl = res.data.headimg;
            }else{
                _this.imgUrl = ''
            }
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        handleFileChange: function(e) {
            var dom = this.$refs.headfile.files[0]
            console.log(dom)
            if(!dom){
                return false;
            }
            var size = Math.floor(dom.size / 1024);
            if (size > 10240) {
                // 这里可以加个文件大小控制
                this.$alert('请选择小于10M图片', '提示', {
                confirmButtonText: '确定'
                });
                return false
            }
            var _this = this;
            var params = new FormData();
            params.append('file', dom);
            this.$postImg('/upload/image',params).then(res => {
                if(res.code == 0) {
                    _this.imgUrl = res.data;
                }else{
                    _this.imgUrl = ''
                }
            }).catch(err => {
                console.log(err)
            })
        },
        upload() {
            var _this = this
            var obj = {
                imgUrl : this.imgUrl
            }
            this.$postForm('/user/update',obj).then(res => {
                if(res.code == 0) {
                    _this.$alert('添加成功', '提示', {
                    confirmButtonText: '确定'
                    });
                }else{
                    _this.$alert('添加失败', '提示', {
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
.box{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 140px;
    height: 140px;
    line-height: 140px;
    margin-bottom: 20px;
}
.btnbox{
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
.btnbox img{
    width: 140px;
    height: 140px;
}
.headfile{
    position: absolute;
    z-index: 11;
    left: 0;
    top: 0;
    display: block;
    width: 140px;
    height: 140px;
    opacity: 0;
    cursor: pointer;
}
</style>


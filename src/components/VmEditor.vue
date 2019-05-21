<template>
    <div class="wrap">
        <div class="vm-editor">
            <div class="wm-editor-menu">
                <div class="vm-editor-button">
                    <span class="button">
                        <img src="../assets/images/img_icon.png" @click="change" alt="" srcset="">
                    </span>
                    <div class="vm-editor-dropdown" v-show="showInput">
                        <div class="add-img">  
                            Add Image
                            <input type="file" accept="image/gif, image/jpeg, image/png" ref="file" @change="handleFileChange">
                        </div>
                    </div>
                </div>
            </div>
            <div class="vm-editor-content" contenteditable="true" v-html="html" @input="onDivInput($event)" @focus="lock=true" @blur="lock=false"></div>
        </div>
    </div>
    
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            html: this.data,
            lock: false,
            showInput: false
        }
    },
    watch: {
        'data'() {
            if (!this.lock) {
                this.html = this.data;
            }
        }
    },
    mounted() {
        
    },
    methods: {
        onDivInput: function(e) {
            // this.html = e.target.innerHTML;
            this.$emit('upload', e.target.innerHTML)
        },
        handleFileChange: function(e) {
            this.showInput = false
            var dom = this.$refs.file.files[0]
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
                    document.execCommand('insertImage', false, res.data)
                }else{
                    
                }
            }).catch(err => {
                console.log(err)
            })
        },
        change: function() {
            this.showInput = !this.showInput
        }
    }
}
</script>

<style scoped>
.wrap .vm-editor{
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eeeff1;
    min-width: 100px;
    width: 95%;
    overflow: hidden;
}
.wrap .vm-editor-content{
    outline: 0;
    height: calc(100% - 40px);
    height: 160px;
    text-align: left;
    padding: 15px;
    font-size: 16px;
    overflow-y: scroll;
}
.wrap .wm-editor-menu{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 15px;
    background-color: #fafbfc;
    border-bottom: 1px solid #eeeff1;
    position: relative;
}
.wrap .vm-editor-button{
    position: relative;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    padding: 0;
}
.vm-editor-button:first-child{
    margin-left:0
}
.wrap .vm-editor-button span.button:hover{
    background-color:#eee
}
.wrap .button{
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrap .button img{
    width: 16px;
    height: 16px;
}
.wrap .vm-editor-dropdown{
    position: absolute;
    background: #fff;
    left: 0;
    top: 25px;
    border-radius: 4px;
    border: 1px solid #eeeff1;
    box-shadow: 0 0 4px rgba(0,0,0,.05);
}
.wrap .add-img{
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    position: relative;
    cursor: pointer;
}
.wrap .add-img input{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 4px;  
    height: 4px;  
    background-color: #F5F5F5;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    border-radius: 3px;  
    background-color: #FFF;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 3px;  
    background-color: #eeeff1;  
} 
</style>


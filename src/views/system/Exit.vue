<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        var _this = this;
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$fetch('/user/logout').then(response => {
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
}
</script>

<template>
    <div>
        dashboard
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'aa',
            }
        },
        mounted: function() {
            console.log(localStorage.getItem('username'))
            // this.$fetch('/api/article').then(response => {
            //     console.log(response)
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    }
</script>

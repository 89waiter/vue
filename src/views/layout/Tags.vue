<template>
    <div>
        <router-link
            v-for="(item,index) in visitedViews"
            v-bind:key="index"
            :class="isActive(item)?'active':''"
            :to="{path:item.path}"
            class="tags-view-item">
            {{item.title}}
            <span class="el-icon-close" @click.prevent.stop="closeTag(item)" />
        </router-link>
    </div>
</template>

<style scoped>
.tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
}
.active {
    background-color: #42b983 !important;
    border-color: #42b983;
    color: #fff;
}
.el-icon-close{
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 50%;
    text-align: center;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transform-origin: 100% 50%;
}
.el-icon-close::before{
    transform: scale(.6);
    display: inline-block;
    
}
.el-icon-close:hover{
    background-color: #b4bccc;
    color: #fff;
}
</style>

<script>
    export default {
        data() {
            return {
                visitedViews: this.$store.state.tags.visitedViews
            }
        },
        watch: {
            $route: function() {
                // console.log(this.visitedViews)
                this.addViewTags()
            }
        },
        mounted: function() {
            this.addViewTags()
        },
        methods: {
            addViewTags() {
                // console.log(this.$route)
                if(this.$route) {
                    this.$store.dispatch('addView', this.$route)
                }
                return false
            },
            closeTag(view) {
                this.$store.dispatch('delView', view).then(() => {
                    if (this.isActive(view)) {
                        const latestView = this.visitedViews.slice(-1)[0]
                        console.log(this.visitedViews,latestView)
                        if (latestView) {
                            this.$router.push(latestView)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
            },
            isActive(route) {
                return route.path === this.$route.path
            }
            // const { name } = this.$route
            // if (name) {
            //     this.$store.dispatch('addView', this.$route)
            // }
            // return false
            // }
        }
    }
</script>

<template>
    <div>
        <div v-if="!item.hidden" class="menu-wrapper">
            <!-- <router-link v-if="item.children[0].path === 'dashboard'" :to="resolvePath(item.children[0].path)">
                <el-menu-item :index="item.path">
                    <i class="fa fa-home"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </router-link> -->
            <!--一般用不到-->
            <router-link v-if="!item.children" :to="item.path">     
                <el-menu-item :index="resolvePath(item.path)">
                    <i class="fa fa-home"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-else :index="resolvePath(item.path)">
                <template slot="title">
                <i :class="item.meta.icon" v-if="item.meta && item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
                </template>

                <template v-for="child in item.children">
                    <sidebar-item :item="child" v-if="child.children&&child.children.length>0" v-bind:key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
                    <router-link :to="resolvePath(child.path)" :key="resolvePath(child.path)" v-else>
                        <el-menu-item :index="resolvePath(child.path)">{{child.meta.title}}</el-menu-item>
                    </router-link>
                </template>
                
            </el-submenu>
        </div>
    </div>
</template>

<script>
    import path from 'path'
    export default {
        name: 'SidebarItem',
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        methods: {
            resolvePath(paths) {
                return path.resolve(this.basePath, paths)
            }
        }
    }
</script>

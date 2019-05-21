<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="分类">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="110">
            <template slot-scope="scope">
                <el-button @click="del(scope.row)" type="text" size="middle">删除分类内容</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getCate()
    },
    methods: {
        indexMethod(index) {
            return index + 1;
        },
        getCate: function() {
            this.$fetch('/cate/index',{}).then(response => {
                console.log(response)
                this.tableData = response.data
            }).catch(err => {
                console.log(err)
            })
        },
        del: function(val) {
            var _this = this
            this.$confirm('确认要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var param = {cateid: val.id}
                _this.$fetch('/cate/delcate',param).then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        setTimeout(function() {
                            _this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.getCate()
                            }
                            });
                        },500)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(() => {
            });
        }
    }
}
</script>

<template>
    <div>
        <div class="pb10">
            <el-button type="primary" @click="add" size="mini">添加</el-button>
            <el-select v-model="searchVal" size="mini" @change="selectByCate" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="title"
                label="标题"
                width="180">
                </el-table-column>
                <el-table-column
                label="分类"
                width="180">
                <template slot-scope="scope">
                    <span>{{ filterCate(scope.row.cate_id) }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="图片"
                width="180">
                <template slot-scope="scope">
                    <div class="thumb_img">
                        <img :src="scope.row.img_url" alt="" srcset="">
                    </div>
                    <!-- <span>{{ filterCate(scope.row.img_url) }} img:src </span> -->
                </template>
                </el-table-column>
                <el-table-column
                prop="updated_at"
                label="更新时间">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="110">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="middle">编辑</el-button>
                    <el-button @click="del(scope.row)" type="text" size="middle">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </template>
        <div class="pageBtm">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="count">
            </el-pagination>
        </div>
        <!-- 编辑弹出 -->
        <el-dialog
        title="提示"
        :visible.sync="editDialog"
        width="50%"
        :before-close="editClose">
        <div class="alert-content">
            <p>
                <el-input type="text" v-model="editData.title" style="width:50%"></el-input>
            </p>
            <div class="box">
                <div class="btnbox" v-if="!editImgUrl">
                    +
                </div>
                <div class="btnbox" v-else>
                    <img :src="editImgUrl" alt="" srcset="">
                </div>
                <input type="file" @change="handleFileChangeEdit" ref="editheadfile" class="headfile" name="">
            </div>
            <p>
                <el-select v-model="selectVal" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </p>
            <div>
                <VmEditor @upload="editHtml" :data="editData.content"></VmEditor>
            </div>
            <!-- <p>
                <el-input type="textarea" v-model="editData.content" style="width:95%;"></el-input>
            </p> -->
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialog = false">取 消</el-button>
            <el-button type="primary" @click="editAct()">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 添加弹出 -->
        <el-dialog
        title="提示"
        :visible.sync="addDialog"
        width="50%"
        :before-close="addClose">
        <div class="alert-content">
            <p>
                <el-input type="text" v-model="addData.title" style="width:50%"></el-input>
            </p>
            <div class="box">
                <div class="btnbox" v-if="!addImgUrl">
                    +
                </div>
                <div class="btnbox" v-else>
                    <img :src="addImgUrl" alt="" srcset="">
                </div>
                <input type="file" @change="handleFileChange" ref="headfile" class="headfile" name="">
            </div>
            <p>
                <el-select v-model="selectVal" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </p>
            <div>
                <VmEditor @upload="addHtml" :data="addData.content"></VmEditor>
            </div>
            <!-- <p>
                <el-input type="textarea" v-model="addData.content" style="width:95%;"></el-input>
            </p> -->
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="addAct()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import VmEditor from '../../components/VmEditor.vue'
    import utils from '../../utils/utils'
    export default {
        data() {
            return {
                tableData: [],
                editDialog: false,
                addDialog: false,
                editData: {},
                addData: {
                    title: '',
                    content: '',
                    img_url: '',
                    cate_id: '',
                    created_at: ''
                },
                defaultAddData: {},
                page: 1,
                pageSize: 10,
                count: 0,
                options: [],
                selectVal: '0',
                searchVal: '0',
                addImgUrl: '',
                editImgUrl: ''
            }
        },
        created:function() {
            this.defaultAddData = JSON.parse(JSON.stringify(this.addData))  //参考https://www.cnblogs.com/mamaguai/p/8143391.html
        },
        components: {
            VmEditor
        },
        mounted: function() {
            this.getList()
            this.getCate()
        },
        methods: {
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.page = val
                this.getList()
            },
            selectByCate(val) {
                this.page = 1
                this.pageSize = 10
                this.searchVal = val
                this.getList()
            },
            getCate: function() {
                this.$fetch('/cate/index',{}).then(response => {
                    console.log(response)
                    this.options = response.data
                }).catch(err => {
                    console.log(err)
                })
            },
            filterCate: function(val) {
                for(var i in this.options) {
                    if(i == val) {
                        return this.options[i].name
                    }
                }
            },
            getList: function() {
                var param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    cateId: this.searchVal
                }
                this.$fetch('/article/index',param).then(response => {
                    console.log(response)
                    this.tableData = response.data
                    this.count = response.total
                }).catch(err => {
                    console.log(err)
                })
            },
            del: function(data) {
                console.log(data.id)
                var _this = this
                this.$confirm('确认要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var param = {id: data.id}
                    _this.$fetch('/article/del',param).then(res => {
                        console.log(res)
                        if(res.code == 0) {
                            setTimeout(function() {
                                _this.$alert(res.message, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.getList()
                                }
                                });
                            },500)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(() => {
                });
            },
            edit: function(data) {
                this.editDialog = true
                this.editData = data
                this.selectVal = data.cate_id   //步骤1。每次编辑赋值selectVal 为 cate_id
                this.editImgUrl = data.img_url
                console.log(data)
            },
            editClose(done) {
                done()
            },
            editAct: function() {
                var _this = this
                this.editData.cate_id = this.selectVal  //步骤2。发送请求时候cate_id赋值为选中的selectVal
                this.editData.img_url = this.editImgUrl
                this.editData.updated_at = utils.getCurrentTime(new Date())
                var obj = this.editData
                console.log(obj)
                this.$postForm('/article/edit',obj).then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        _this.editDialog = false
                        setTimeout(function() {
                            _this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.getList()
                            }
                            });
                        },500)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            add: function() {
                this.addDialog = true
                this.addData = JSON.parse(JSON.stringify(this.defaultAddData))  //参考https://www.cnblogs.com/mamaguai/p/8143391.html
                this.selectVal = '0'
                this.addImgUrl = ''
            },
            addClose(done) {
                done()
            },
            addAct: function() {
                var _this = this
                this.addData.img_url = this.addImgUrl
                this.addData.cate_id = this.selectVal
                this.addData.created_at = utils.getCurrentTime(new Date())
                var obj = this.addData
                this.$postForm('/article/add',obj).then(res => {
                    console.log(res)
                    if(res.code == 0) {
                        _this.addDialog = false
                        setTimeout(function() {
                            _this.$alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.getList()
                            }
                            });
                        },500)                       
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
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
                        _this.addImgUrl = res.data;
                    }else{
                        _this.addImgUrl = ''
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            handleFileChangeEdit: function(e) {
                var dom = this.$refs.editheadfile.files[0]
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
                        _this.editImgUrl = res.data;
                    }else{
                        _this.editImgUrl = ''
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            editHtml: function(data) {
                console.log(data,123)
                this.editData.content = data
            },
            addHtml: function(data) {
                console.log(data,123)
                this.addData.content = data
            }
        }
    }
</script>
<style scoped>
.alert-content p{
    padding-bottom: 20px;
}
.pb10 {
    padding-bottom: 10px;
}
.pageBtm {
    padding-top: 20px;
}

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
.thumb_img img{
    width: 60px;
    height: 60px;
}
</style>

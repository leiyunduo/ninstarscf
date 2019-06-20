 <template>
  <div class="message c_message">
    <!-- <appNav :father='{selIndex: -1}' type='1'></appNav> -->
    <div class="info_detail">
      <div class="form">
        <p class="c_form_title">我的消息</p>
        <div class="seletor">
          <!-- <select @change="changeType($event)">
            <option v-for="(type, index) in messageTypeList" :key="index" :value="index">{{ type }}</option>
          </select> -->
        </div>
        <div class="form_info">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column prop="type" label="分类" align="left" width="180"></el-table-column>
            <el-table-column prop="title" label="标题" align="left"></el-table-column>
            <el-table-column prop="post_time" label="时间" align="left"></el-table-column>
            <el-table-column prop="sender" label="发件人" align="left" width="180"></el-table-column>
            <el-table-column prop="read" label="状态" align="left" width="100">
               <template slot-scope="scope">
                <span :class="[scope.row.read === '已读' ? '' : 'c_blod']">
                  {{scope.row.read}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="left" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleView(scope.$index, scope.row)">
                  查看
                </el-button>
                <!-- <el-button
                  type="text"
                  size="small"
                  @click="handleDelete(scope.$index, scope.row)">
                  移除
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div v-if="tableData.length === 0" style="line-height: 70px;color: #999">暂无站内信</div>
          <el-pagination
              class="c_page"
              v-if="pagination.total > 10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagination.pageSize"
              :current-page="pagination.currentPage"
              layout="total, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
        </div>
      </div>
      <el-dialog
        title="确认删除"
        :visible.sync="dialogVisible" top='30vh'
        width="30%">
        <span>确认删除当前消息么？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="warning " @click="sureCancal">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import AppNav from '@/components/financing/financingManege'
import { mapState } from 'vuex' 
export default {
  name: 'messageList',
  // components: {
  //   AppNav
  // },
  data () {
    return {
      typeSel: 0,
      uid: '',
      messageTypeList: ['全部', '通知', '审核', '商友'],
      messageList: [],
      dialogVisible: false,
      tableData: [],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  computed: {
    ...mapState({
      msgCount: status => status.homePage.msgCount
    })
  },
  methods: {
    getData: function (per, current) {
      let perPage
      let currentPage
      per ? perPage = per : perPage = 10
      current ? currentPage = current : currentPage = 1
      var url = '/api/home_page/site_message/?&page=' + currentPage + '&page_size=' + perPage
      var that = this
      this.$ajax.get(url).then(res => {
        if (res.status === 200) {
          var tableArr = []
          if (res.data.results.length !== 0) {
            res.data.results.map((item, index) => {
              tableArr.push({
                id: item.id,
                type: Number(item.type) === 1 ? '系统通知' : '',
                title: item.title,
                post_time: that.formatTime(item.post_time),
                sender: item.sender,
                read: item.read === true ? '已读' : '未读'
              })
            })
            that.tableData = tableArr
          }
          that.pagination.total = res.data.count
        }
      })
    },
    formatTime: function (timeStamp) {
      var date = new Date(timeStamp)
      var Y = date.getFullYear()
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + '年' + M + '月' + D + '日 ' + h + ':' + m + ':' + s
    },
    handleView: function (index, row) {
      if (row.read === '未读') {
        this.$emit('message')
        let msgCount = this.msgCount
        this.$store.commit('homePage/setMsgCount', --msgCount)
      }
      this.$router.push({path: '/message_app/detail', query: {id: row.id}})
    },
    // 删除
    handleDelete: function (index, row) {
      this.delIndex = index
      this.dialogVisible = true
    },
    // 切换消息类型
    changeType: function ($event) {
      if ($event.target.value) {
        this.typeSel = Number($event.target.value)
      } else {
        this.typeSel = Number($event.target.value) - 1
      }
    },
    sureCancal: function () {
      this.dialogVisible = false
    },
    handleSizeChange: function (val) {
      this.pagination.pageSize = val
      this.getData(val, this.pagination.currentPage)
    },
    handleCurrentChange: function (val) {
      this.pagination.currentPage = val
      this.getData(this.pagination.pageSize, val)
    }
  },
  mounted () {
    this.getData()
    // var that = this
    // this.$ajax.get('/api/get_message/?token=' + this.$token()).then(res => {
    //   // console.log(res)
    //   if (res.status === 200) {
    //     var tableArr = []
    //     res.data.data.map((item, index) => {
    //       tableArr.push({
    //         id: item.id,
    //         type: Number(item.type) === 1 ? '系统通知' : '',
    //         title: item.title,
    //         post_time: that.formatTime(item.post_time),
    //         sender: item.sender,
    //         read: item.read
    //       })
    //     })
    //     that.tableData = tableArr
    //     that.pagination.total = res.data.total
    //     // console.log(res.data.total)
    //   }
    // })
  }
}
</script>

<style scoped lang="less">
.c_message {
  display: flex;
  min-height: 100%;
  //padding-top: 70px;
  .c_slide_container:hover+.info_detail{
    width: calc(100% - 220px);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -moz-transition: all .4s;
  }
  .info_detail{
    width: 100%;
    padding: 50px;
    background: #f5f7f8;
    .form{
      height: 100%;
      box-shadow: 0px 0px 5px #ccc;
      padding: 30px;
      background: #fff;
      font-size: 14px;
      .c_blod{
        font-weight: bold;
      }
      .c_page{
        margin: 20px;
        text-align: right;
      }
      .c_form_title{
        color: #333;
        border-left: 4px solid #eb6100;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .form_title{
        height: 50px;
        padding: 10px 0;
        font-size: 16px;
        div{
          height: 30px;
          line-height: 30px;
          border-left: 2px solid #f4ac45;
          span {
            margin-left: 20px;
          }
        }
      }
      .seletor {
        height: 40px;
        line-height: 20px;
        // padding: 0 20px;
        text-align: right;
        select {
          width: 130px;
          padding: 0 5px;
          height: 30px;
        }
      }
      .form_info {
        width: 100%;
        text-align: center;
        .messageTitle {
          color: #343536;
          div:last-child {
            span.editTitle {
              color: #343536;
              cursor: auto;
            }
          }
        }
        .messageTitle, .messageItem {
          display: flex;
          height: 55px;
          border-bottom: 1px dashed #bfbfbf;
          div:first-child{
            width: 200px;
            text-align: center;
            line-height: 55px;
          }
          div:nth-child(2) {
            width: 500px;
            text-align: center;
            line-height: 55px;
            span {
              display: block;
              padding: 0 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          div:nth-child(3),div:last-child {
            width: 250px;
            line-height: 55px;
            text-align: center;
          }
          div:last-child {
            color: #ff0100;
            span {
              cursor: pointer;
            }
          }
        }
        .messageItem:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
<style>
  .form_info table thead th{
    background: #e6e9ea;
  }
  .form_info .el-button--text{
    color: #eb6100;
    background: transparent;
    border: none;
  }
  .form_info .el-button--text:hover{
    background: transparent;
  }
  .c_message .el-table__empty-block {
    display: none;
  }
</style>

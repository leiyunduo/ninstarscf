<!--聊天主页-->
<template>
  <div class="chat-interface">
    <!-- 发送图片 -->
    <div class="imgTAN" v-show="imageShow">
      <div class="modal fade" id="upload_pic_low_ie_dialog" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="imageClose" data-dismiss="modal" aria-hidden="true">×
              </button>
              <h4 class="modal-title" id="upload_pic_low_ie_dialog_label">
                发送图片
              </h4>
            </div>
            <div class="modal-body">
              <form name="myform" id="updli_form" enctype="multipart/form-data" class="form-horizontal" role="form" onkeydown="if(event.keyCode==13)return false;">
                <div class="form-group">
                  <label for="File" class="control-label">选择</label>
                  <div class="col-sm-10">
                    <input type="file" name="imgFile" id="updli_file" @change="updlImage($event)" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="File" class="control-label">预览</label>
                  <div class="col-sm-10">
                    <img :src="imgList" alt="" id="previewPicDiv">
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal" @click="imageClose">
              关闭
              </button>
              <button type="button" class="btn btn-primary" @click="uploadPicLow">
              发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 发送文件 -->
    <div class="imgTAN" v-show="fileShow">
      <div class="modal fade" id="upload_file_low_ie_dialog" tabindex="-1" role="dialog" aria-labelledby="upload_file_low_ie_dialog_label" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="fileClose">×
              </button>
              <h4 class="modal-title" id="upload_file_low_ie_dialog_label">
                发送文件
              </h4>
            </div>
            <div class="modal-body">
              <form id="updli_file_form" enctype="multipart/form-data" class="form-horizontal" role="form" onkeydown="if(event.keyCode==13)return false;">
                <div class="form-group">
                    <label for="File" class="col-sm-2 control-label">选择</label>
                    <div class="col-sm-10">
                      <input type="file" id="upload_low_ie_file" @change="fileUpda($event)" />
                    </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" @click="fileClose">
                  关闭
                </button>
                <button type="button" class="btn btn-primary" @click="updateFile">
                  发送
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天按钮 -->
    <div class="chat-btn" v-show="chatButton">
      <div class="chat_list" v-show="letterChat" @click="showChatClick"><img src="../../../static/img/im.png" alt="">私信聊天</div>
      <button :class="{activeBtn: activeBtnShow}" :disabled='disableds' @click="showChatInterface($event)"><img src="../../../static/img/im1.png" alt=""></button>
      <div id="badgeDivShow"><span></span></div>
    </div>
    <!-- 聊天界面层 -->
    <div class="chat-model" id="webim_demo" v-show="showChat">
      <div class="friends-list">
        <div class="left_friend">
          <div class="top_img">
            <img src="../../../static/img/im/im7.png" alt="" @click="getRecen">
          </div>
          <div class="bottom_img">
            <img src="../../../static/img/im/im5.png" alt="" @click="selectMenuList">
          </div>
        </div>
        <div class="right_friend">
          <div class="search-linkman">
            <img src="../../../static/img/im/im8.png" alt="">
            <!-- <input type="text" placeholder="搜索联系人" @input="selectFriendList"> -->
            <input type="text" placeholder="搜索联系人" v-model="input" ref="search" @input="selectFriendList">
          </div>
          <!-- 搜索我的好友显示 -->
          <div class="my_friends_list_box" v-if="selectQuery">
            <ul>
              <li v-for="(item, index) in selectQueryList" :key="index" @click="selectFriendsChat($event, index, item)" :id="'sessDiv_' + item.Info_Account">
                <img v-if="item.SnsProfileItem" :src="$root_url() + item.SnsProfileItem[1].Value" alt="">
                <span v-if="item.SnsProfileItem">
                  {{item.SnsProfileItem[0].Value}}
                </span>
              </li>
            </ul>
          </div>
          <!-- 搜索最近联系人显示 -->
          <ul class="friends-list-con sesslist collapseRecentSession sessinfo-sel" v-if="selectQueryFriend">
            <li v-for="(item, index) in dataQueryFriend" :key="index" :id="'sessDiv_' + item.SessionId" @click="dataQueryChat(index, item)">
              <img :src="item.SessionImage" alt="">
              <span class="account">{{ item.SessionNick }}</span>
              <div class="badge" :id="'badgeDiv_' + item.SessionId"><span></span></div>
            </li>
          </ul>
          <div class="my_friends_list_box" id="select_show" v-if="myFriendsListShow">
            <ul>
              <li v-for="(item, index) in listTable" :key="index" @click="selectFriendsChat($event, index, item)" :id="'sessDiv_' + item.Info_Account">
                <img v-if="item.SnsProfileItem" :src="$root_url() + item.SnsProfileItem[1].Value" alt="">
                <span v-if="item.SnsProfileItem">
                  {{item.SnsProfileItem[0].Value}}
                </span>
              </li>
            </ul>
          </div>
          <!-- 最近联系人 -->
          <ul class="friends-list-con sesslist collapseRecentSession sessinfo-sel" v-if="myFriends" id="select_show">
            <li v-for="(item, index) in data" :key="index" :id="'sessDiv_' + item.SessionId" :class="{'active':selectFriendShow === index}" @click="selectFriendChat(index, item)">
              <img :src="item.SessionImage" alt="">
              <span class="account">{{ item.SessionNick }}</span>
              <div class="badge" :id="'badgeDiv_' + item.SessionId"><span></span></div>
              <!-- <div id="badgeDiv_" class="badge"></div> -->
              <!-- <a class="msg-tips" @click="deleteSess(index, item)">删除会话</a> -->
            </li>
          </ul>
        </div>
      </div>
      <!-- 聊天界面 -->
      <div class="chat-part">
        <div class="chat-part-title">
          <div><img :src="latelyImg" alt="" v-if="latelyImg"><span>{{ lately }}</span></div>
          <div class="close" @click="close"><i class="el-icon-close"></i></div>
        </div>
        <div v-show="chatPage">
          <!-- 聊天记录 -->
          <div class="msgflow" v-show="chatList" @scroll="getPrePageC2CHistoryMsgs($event)"></div>
          <div class="editbar">
            <!-- <a class="chat02_title_btn ctb03" title="选择图片" href="#" @click="sessImage"></a> -->
            <img src="../../../static/img/im/im6.png" title="选择图片" alt="" @click="sessImage">
            <img src="../../../static/img/im/im2.png" title="选择文件" alt="" @click="sessFile">
            <!-- <a class="chat02_title_btn ctb05" title="选择文件" href="#" @click="sessFile"></a> -->
            <!-- <i class="el-icon-search" title="查看聊天记录" @click="selectChat"></i> -->
          </div>
          <div class="editbar-box">
            <textarea class="msgedit" v-model="sendMsgs" id="send_msg_text" @keyup.enter="onTextareaKeyDowns($event)" cols="63" rows="4"></textarea>
            <button class="editbar_button" @click="sendMsgNews">发送</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看图片 -->
    <div class="modal fade select_pic" id="click_pic_dialog" tabindex="-1" role="dialog" aria-labelledby="click_pic_dialog_label" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              <i class="el-icon-close"></i>
            </button>
            <h4 class="modal-title" id="click_pic_dialog_label">
              查看图片
            </h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <div class="col-sm-12">
                  <div id="bigPicDiv"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              关闭
            </button>
          </div>
        </div>
          <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- 聊天记录 -->
    <!-- <div class="chat_record" v-show="chatRecord">
      <div class="top">
        <h3>{{ lately }}</h3>
        <i class="el-icon-close" @click="closeRecord"></i>
      </div>
      <div class="msgflow"></div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'im_index',
  props: ['prentMsg', 'friendId', 'friendName', 'unreadNum'],
  data () {
    return {
      // 聊天按钮
      letterChat: false,
      // 显示聊天界面
      chatButton: true,
      // 聊天界面
      chatPage: false,
      msgFlowlist: [],
      chatList: true,
      // 0: 隐藏
      showChat: false,
      disableds: false,
      activeBtnShow: false,
      showMyFriend: 0,
      // column1
      menuListShow: 0,
      // 最近联系人
      myFriends: false,
      menuList: [{ name: '通讯录', icon: './static/img/file.png' }],
      // column2
      selectFriendShow: '',
      friendsList: [],
      msgFriendsList: [],
      msgTipsShow: 0,
      // column3
      myFriendsListShow: false,
      selectFriendsShow: 0,
      myFriendsList: [],
      sendMsgs: '',
      listTable: [],
      // 最近联系人
      sessListIn: [],
      // 设置会话类型
      sessType: '',
      // 最近联系人id
      sessionId: '',
      // 未读信息
      syncMsgsList: '',
      sess: '',
      // 图片
      imageShow: false,
      imgList: '',
      // 判断是否为图片类型
      imageStyle: '',
      // 文件
      fileShow: false,
      fileList: '',
      // 选择某个好友聊天
      msgLists: '',
      lately: '',
      latelyImg: '',
      nameList: '',
      groupList: '',
      data: [],
      // 好友头像
      sessionImage: '',
      // 好友ID
      friendIds: '',
      friendNames: '',
      // 聊天记录
      chatRecord: false,
      indexs: '',
      childMessage: '',
      // 好友ID
      latelyId: '',
      nameStyle: '我的好友',
      // 搜素
      input: '',
      // 我的好友
      selectQueryList: [],
      selectQuery: false,
      // 最近联系人
      dataQueryFriend: [],
      selectQueryFriend: false
    }
  },
  computed: {
　　pokerHistory () {
      return {
        a1: this.prentMsg,
        a2: this.friendId,
        a3: this.friendName,
        a4: this.unreadNum
      }
　　},
  },
  watch: {
    pokerHistory (value) {
      var that = this
      // // console.log(value.a4)
      if (value.a4 === undefined) {
        $('#badgeDivShow').css({
          'display' : 'none'
        })
      } else if (value.a4 === '') {
        $('#badgeDivShow').css({
          'display' : 'none'
        })
      } else if (value.a4 >= 100) {
        $('#badgeDivShow').css({
          'display' : 'block'
        })
        $('#badgeDivShow').html('99+')
      } else {
        $('#badgeDivShow').css({
          'display' : 'block'
        })
        $('#badgeDivShow').html(value.a4)
      }
      if (value.a1 === 1) {
        that.selectMenuList()
        // 聊天按钮隐藏
        that.chatButton = true
        // 显示聊天界面
        that.showChat = true
        // 我的好友
        that.myFriendsListShow = false
        // 显示最近联系人
        that.myFriends = true
        that.selectFriendShow = ''
        // 聊天记录
        that.chatList = true
        var sessList = document.getElementsByClassName("msgflow")[0]
        sessList.innerHTML = ""
        // 聊天界面
        that.chatPage = true
        that.sessionId = value.a2
        that.lately = value.a3
        // 获取消息内容
        var msgtosend = that.sendMsgs
        var msgLen = webim.Tool.getStrBytes(msgtosend)
        var tmgmsgtosend = webim.Tool.getCookie('tmpmsg_' + that.friendId)
        if (tmgmsgtosend) {
          $('#send_msg_text').val(tmgmsgtosend)
        } else {
          $('#send_msg_text').val()
        }
        that.sessType= webim.SESSION_TYPE.C2C // 设置会话类型
        var senderId =''
        var senderNick = ''
        var sessionNick = that.friendId
        var sessionImage = ''
        var tempSess = '' // 临时会话变量
        var firstSessType = that.sessType // 保存第一个会话类型
        var firstSessId = that.friendId // 保存第一个会话id
        var UnreadMsgCount = ''
        var MsgSeq = ''
        var MsgRandom = ''
        var MsgGroupReadedSeq = ''
        var MsgShow = ''
        var MsgTimeStamp = ''
        recentSessMap[that.sessType+'_'+that.friendId]={
          SessionType: that.sessType,// 会话类型
          SessionId: that.friendId,// 会话对象id，好友id或者群id
          SessionNick: sessionNick,// 会话昵称，好友昵称或群名称
          SessionImage:sessionImage,// 会话头像，好友头像或者群头像
          C2cAccount:senderId,// 发送者id，群聊时，才有用
          C2cNick:senderNick,// 发送者昵称，群聊时，才有用
          UnreadMsgCount: UnreadMsgCount,// 未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
          MsgSeq: MsgSeq,// 消息seq
          MsgRandom: MsgRandom,// 消息随机数
          MsgTimeStamp:webim.Tool.formatTimeStamp(MsgTimeStamp),// 消息时间戳
          MsgGroupReadedSeq: MsgGroupReadedSeq || 0,
          MsgShow: MsgShow// 消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
        }
        tempSess = recentSessMap[firstSessType+'_'+firstSessId]// 选中第一个会话
        selType = tempSess.SessionType// 初始化当前聊天类型
        bindScrollHistoryEvent.reset()
      }
    }
  },
  mounted () {
    var that = this
    that.msgFriendsList = that.friendsList
    loginInfo.identifier = localStorage.identifier
    loginInfo.userSig = localStorage.userSig
    if (loginInfo.identifier === '') {
      that.disableds = true
      that.activeBtnShow = true
    } else {
      that.disableds = false
      that.activeBtnShow = false
    }
    webim.login(loginInfo, listeners, options, function (resp) {
      loginInfo.identifierNick = resp.identifierNick
      loginInfo.image = resp.headurl
      that.selectMenuList()
    })
  },
  updated () {
    var that = this
    //消息已读通知
    var sessMap = webim.MsgStore.sessMap()
    if (sessMap) {
      // // console.log(sessMap)
      var sum = 0
      for (let i in sessMap) {
        if (sessMap[i]._impl.unread !== 0) {
          if (i === sessMap[i]._impl.skey) {
            that.friendIds = sessMap[i]._impl.id
            $('#badgeDiv_' + that.friendIds).css({
              'display' : 'block'
            })
            if (sessMap[i]._impl.unread >= 100) {
              $('#badgeDiv_' + that.friendIds).html('99+')
            } else {
              $('#badgeDiv_' + that.friendIds).html(sessMap[i]._impl.unread)
            }
          }
          var num = sum += sessMap[i]._impl.unread
          if (num >= 100) {
            $('#badgeDivShow').css({
              'display' : 'block'
            })
            $('#badgeDivShow').html('99+')
          } else {
            $('#badgeDivShow').css({
              'display' : 'block'
            })
            $('#badgeDivShow').html(num)
          }
        }
      }
    }
  },
  methods: {
    // 搜索联系人
    selectFriendList () {
      var that = this
      that.query = that.$refs.search.value.trim()
      var newItem = []
      var newItemFriend = []
      if (that.myFriendsListShow === true) {
        that.listTable.map(item => {
          if (item.SnsProfileItem[0].Value.search(that.input) !== -1) {
            newItem.push(item)
          }
        })
        that.selectQuery = true
        that.selectQueryFriend = false
        that.selectQueryList = newItem
        document.getElementById('select_show').style.display = 'none'
        return newItem
      } else if (that.myFriends === true) {
        that.data.map(item => {
          if (item.SessionNick.search(that.input) !== -1) {
            newItemFriend.push(item)
          }
        })
        that.selectQuery = false
        that.selectQueryFriend = true
        that.dataQueryFriend = newItemFriend
        document.getElementById('select_show').style.display = 'none'
        return newItemFriend
      }
    },
    letterShow () {
      var that = this
      that.letterChat = true
    },
    fileUpda ($event) {
      var that = this
      that.fileList = $event.target.files[0]
    },
    // 发送文件
    updateFile () {
      var that = this
      var businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG
      var file = that.fileList
      // 封装上传文件请求
      var opt = {
        'file': file, // 文件对象
        'To_Account': that.sessionId, // 接收者
        'businessType': businessType, // 业务类型
        'fileType': webim.UPLOAD_RES_TYPE.FILE// 表示上传文件
      }
      webim.uploadFile(opt, function (resp) {
        // 发送文件
        sendFile(resp, file.name)
        that.fileShow = false
      })
    },
    // 发送文件
    sessFile () {
      var that = this
      that.fileShow = true
    },
    // 查看聊天记录
    selectChat () {
      var that = this
      that.chatRecord = true
      var tempInfo = getPrePageC2CHistroyMsgInfoMap[selToID] // 获取下一次拉取的c2c消息时间和消息Key
      var lastMsgTime // 最近的消息时间
      var msgKey
      if (tempInfo) {
        lastMsgTime = tempInfo.LastMsgTime
        msgKey = tempInfo.MsgKey
      }
      var options = {
        'Peer_Account': selToID, // 好友帐号
        'MaxCnt': reqMsgCount, // 拉取消息条数
        'LastMsgTime': lastMsgTime, // 最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
      }
      // 取更多的消息记录接口
      webim.getC2CHistoryMsgs(options, function(resp) {
        var complete = resp.Complete // 是否还有历史消息。1没有。0有
        if (resp.MsgList.length === 0) {
          that.$message.error('没有更多消息了')
          return
        }
        // 保留服务器返回的最新消息和key
        getPrePageC2CHistroyMsgInfoMap[selToID] = {
          'LastMsgTime': resp.LastMsgTime,
          'MsgKey': resp.MsgKey
        }
        getHistoryMsgCallback(resp.MsgList, true)
      })
    },
    // 关闭聊天记录
    closeRecord () {
      var that = this
      that.chatRecord = false
    },
    // 上传图片
    uploadPicLow () {
      var that = this
      var businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG
      // 封装上传图片请求
      var opt = {
        'formId': 'updli_form', // 上传图片表单id
        'fileId': 'updli_file', // file控件id
        'To_Account': that.sessionId, // 接收者
        'businessType': businessType// 图片的使用业务类型
      }
      webim.submitUploadFileForm(opt, function (resp) {
        //发送图片
        sendPic(resp)
        that.imageShow = false
      })
    },
    // 发送图片
    sessImage () {
      var that = this
      that.imageShow = true
      var reader = new FileReader()
      that.imgList = ''
    },
    // 预览图片
    updlImage ($event) {
      var that = this
      that.imageStyle = $event.target.files[0].name.split('.')[1]
      var picExts = 'jpg|jpeg|png|bmp|gif|webp'
      var photoExt = that.imageStyle
      var pos = picExts.indexOf(photoExt)
      if (pos < 0) {
        that.$message.error('您选中的文件不是图片，请重新选择')
      }
      if ($event.target.files[0]) {
        that.imgList = $event.target.files[0]
        var fr = new FileReader()
        fr.onloadend = function (e) {
          that.imgList = e.target.result
        }
        fr.readAsDataURL($event.target.files[0])
      }
    },
    // 关闭
    imageClose () {
      var that = this
      that.imageShow = false
    },
    fileClose () {
      var that = this
      that.fileShow = false
    },
    // 最近联系人
    getRecen () {
      var that = this
      that.myFriends = true
      that.myFriendsListShow = false
      that.selectQuery = false
      that.selectQueryFriend = false
      that.selectQueryList = []
      document.getElementById('select_show').style.display = 'block'
      that.input = ''
      that.selectFriendShow = ''
      var options = {
        Count: reqRecentSessCount, // 最近的会话数
        From_Account: loginInfo.identifier
      }
      that.data = []
      that.nameStyle = '最近联系人'
      webim.getRecentContactList(options, function (resp) {
        // // console.log(resp)
        if (resp.SessionItem !== '') {
          that.sessListIn = resp.SessionItem.map(item => item)
        }
        that.sess = resp.SessionItem.map(item => item.To_Account)
        for (var i in resp.SessionItem) {
          var item = resp.SessionItem[i]
          var sessType = webim.SESSION_TYPE.C2C // 设置会话类型
          var sessionId = item.To_Account
          var key = sessType+"_"+sessionId
          var c2cInfo = infoMap[key]
          var sessionNick = c2cInfo.name
          that.sessionImage = c2cInfo.image
          that.data.push({
            SessionType: sessType,// 会话类型
            SessionId: webim.Tool.formatText2Html(sessionId),// 会话id
            SessionNick: webim.Tool.formatText2Html(sessionNick),// 会话昵称
            SessionImage: that.sessionImage,// 会话头像，好友头像或者群头像
            UnreadMsgCount: item.UnreadMsgCount,// 未读消息数
            MsgSeq: item.MsgSeq,//消息seq
            MsgRandom: item.MsgRandom,//消息随机数
            MsgTimeStamp: webim.Tool.formatTimeStamp(item.MsgTimeStamp),//消息时间戳
            MsgShow: item.MsgShow//消息内容
          })
        }
        webim.syncMsgs(function (resp) {
          that.syncMsgsList = resp.map(item => item.fromAccount)
          if (that.syncMsgsList.length > 0) {
            var aList = that.sess.filter(item => {
              return that.syncMsgsList.includes(item)
            })
          }
        })
      })
    },
    // 选择某个好友聊天
    selectFriendChat (index, item) {
      var that = this
      that.myFriends = true
      that.selectQuery = false
      that.selectQueryList = []
      that.selectQueryFriend = false
      that.input = ''
      var sessList = document.getElementsByClassName("msgflow")[0]
      sessList.innerHTML = ""
      document.getElementById('select_show').style.display = 'block'
      // 聊天界面
      that.chatPage = true
      that.myFriendsListShow = false
      that.selectFriendShow = index
      that.sessionId = item.SessionId
      that.lately = item.SessionNick
      that.latelyImg = item.SessionImage
      // 获取消息内容
      var msgtosend = that.sendMsgs
      var msgLen = webim.Tool.getStrBytes(msgtosend)
      var tmgmsgtosend = webim.Tool.getCookie('tmpmsg_' + that.sessionId)
      if (tmgmsgtosend) {
        $('#send_msg_text').val(tmgmsgtosend)
      } else {
        $('#send_msg_text').val()
      }
      that.sessType= webim.SESSION_TYPE.C2C // 设置会话类型
      var senderId =''
      var senderNick = ''
      var sessionNick = that.sessionId
      if (item.SessionImage === 'http://120.77.172.48:8000/') {
        var sessionImage = 'http://120.77.172.48:8000/static/img/u504.png'
      } else {
        var sessionImage = ''
      }
      var tempSess = '' // 临时会话变量
      var firstSessType = that.sessType // 保存第一个会话类型
      var firstSessId = that.sessionId // 保存第一个会话id
      recentSessMap[that.sessType+'_'+that.sessionId]={
        SessionType: that.sessType,// 会话类型
        SessionId: that.sessionId,// 会话对象id，好友id或者群id
        SessionNick: sessionNick,// 会话昵称，好友昵称或群名称
        SessionImage:sessionImage,// 会话头像，好友头像或者群头像
        C2cAccount:senderId,// 发送者id，群聊时，才有用
        C2cNick:senderNick,// 发送者昵称，群聊时，才有用
        UnreadMsgCount: item.UnreadMsgCount,// 未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
        MsgSeq: item.MsgSeq,// 消息seq
        MsgRandom: item.MsgRandom,// 消息随机数
        MsgTimeStamp:webim.Tool.formatTimeStamp(item.MsgTimeStamp),// 消息时间戳
        MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
        MsgShow: item.MsgShow// 消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
      }
      tempSess = recentSessMap[firstSessType+'_'+firstSessId];// 选中第一个会话
      selType = tempSess.SessionType;// 初始化当前聊天类型
      selToID = tempSess.SessionId;// 初始化当前聊天对象id
      bindScrollHistoryEvent.reset()
      var lastMsgTime = 0 // 第一次拉取好友历史消息时，必须传0
      var msgKey = ''
      var options = {
        'Peer_Account': selToID, // 好友帐号
        'MaxCnt': reqMsgCount, // 拉取消息条数
        'LastMsgTime': lastMsgTime, // 最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
      }
      webim.getC2CHistoryMsgs(options, function (resp) {
        var complete = resp.Complete // 是否还有历史消息可以拉取，1-表示没有，0-表示有
        if (resp.MsgList.length == 0) {
          webim.Log.warn('没有历史消息了:data=' + JSON.stringify(options))
          return
        }
        getPrePageC2CHistroyMsgInfoMap[selToID] = {// 保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          'LastMsgTime': resp.LastMsgTime,
          'MsgKey': resp.MsgKey
        }
        that.msgLists = resp.MsgList
        getHistoryMsgCallback(that.msgLists)
        // 绑定滚动操作
        bindScrollHistoryEvent.init()
      })
      var selSess = webim.MsgStore.sessByTypeId(selType, selToID) //初始化当前会话对象
      // 当前消息已读状态
      webim.setAutoRead(selSess, true, false)
      $('#badgeDiv_' + item.SessionId).css({
        'display' : 'none'
      })
    },
    dataQueryChat (index, item) {
      var that = this
      that.myFriends = true
      that.selectQuery = false
      that.selectQueryList = []
      that.selectQueryFriend = false
      that.selectFriendShow = ''
      that.input = ''
      var sessList = document.getElementsByClassName("msgflow")[0]
      sessList.innerHTML = ""
      document.getElementById('select_show').style.display = 'block'
      // 聊天界面
      that.chatPage = true
      that.myFriendsListShow = false
      that.sessionId = item.SessionId
      that.lately = item.SessionNick
      that.latelyImg = item.SessionImage
      // 获取消息内容
      var msgtosend = that.sendMsgs
      var msgLen = webim.Tool.getStrBytes(msgtosend)
      var tmgmsgtosend = webim.Tool.getCookie('tmpmsg_' + that.sessionId)
      if (tmgmsgtosend) {
        $('#send_msg_text').val(tmgmsgtosend)
      } else {
        $('#send_msg_text').val()
      }
      that.sessType= webim.SESSION_TYPE.C2C // 设置会话类型
      var senderId =''
      var senderNick = ''
      var sessionNick = that.sessionId
      if (item.SessionImage === 'http://120.77.172.48:8000/') {
        var sessionImage = 'http://120.77.172.48:8000/static/img/u504.png'
      } else {
        var sessionImage = ''
      }
      var tempSess = '' // 临时会话变量
      var firstSessType = that.sessType // 保存第一个会话类型
      var firstSessId = that.sessionId // 保存第一个会话id
      recentSessMap[that.sessType+'_'+that.sessionId]={
        SessionType: that.sessType,// 会话类型
        SessionId: that.sessionId,// 会话对象id，好友id或者群id
        SessionNick: sessionNick,// 会话昵称，好友昵称或群名称
        SessionImage:sessionImage,// 会话头像，好友头像或者群头像
        C2cAccount:senderId,// 发送者id，群聊时，才有用
        C2cNick:senderNick,// 发送者昵称，群聊时，才有用
        UnreadMsgCount: item.UnreadMsgCount,// 未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
        MsgSeq: item.MsgSeq,// 消息seq
        MsgRandom: item.MsgRandom,// 消息随机数
        MsgTimeStamp:webim.Tool.formatTimeStamp(item.MsgTimeStamp),// 消息时间戳
        MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
        MsgShow: item.MsgShow// 消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
      }
      tempSess = recentSessMap[firstSessType+'_'+firstSessId];// 选中第一个会话
      selType = tempSess.SessionType;// 初始化当前聊天类型
      selToID = tempSess.SessionId;// 初始化当前聊天对象id
      bindScrollHistoryEvent.reset()
      var lastMsgTime = 0 // 第一次拉取好友历史消息时，必须传0
      var msgKey = ''
      var options = {
        'Peer_Account': selToID, // 好友帐号
        'MaxCnt': reqMsgCount, // 拉取消息条数
        'LastMsgTime': lastMsgTime, // 最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
      }
      webim.getC2CHistoryMsgs(options, function (resp) {
        var complete = resp.Complete // 是否还有历史消息可以拉取，1-表示没有，0-表示有
        if (resp.MsgList.length == 0) {
          webim.Log.warn('没有历史消息了:data=' + JSON.stringify(options))
          return
        }
        getPrePageC2CHistroyMsgInfoMap[selToID] = {// 保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          'LastMsgTime': resp.LastMsgTime,
          'MsgKey': resp.MsgKey
        }
        that.msgLists = resp.MsgList
        getHistoryMsgCallback(that.msgLists)
        // 绑定滚动操作
        bindScrollHistoryEvent.init()
      })
      var selSess = webim.MsgStore.sessByTypeId(selType, selToID) //初始化当前会话对象
      // 当前消息已读状态
      webim.setAutoRead(selSess, true, false)
      $('#badgeDiv_' + item.SessionId).css({
        'display' : 'none'
      })
    },
    // 删除好友会话
    deleteSess (index, item) {
      var that = this
      var type = webim.SESSION_TYPE.C2C
      var sessId = item.SessionId
      var lastMsgTime = 0 //第一次拉取好友历史消息时，必须传0
      var msgKey = ''
      var data = {
        'To_Account': sessId,
        'chatType': type
      }
      webim.deleteChat(
        data,
        function (resp) {
          $('#sessDiv_' + sessId).remove()
        }
      )
    },
    independentModeLogin () {
      independentModeLogin ()
    },
    // 聊天
    showChatInterface () {
      var that = this
      that.letterChat = !that.letterChat
      webim.login(loginInfo, listeners, options, function (resp) {
        loginInfo.identifierNick = resp.identifierNick
        loginInfo.image = resp.headurl
        that.selectMenuList()
      })
    },
    showChatClick () {
      var that = this
      // 聊天按钮隐藏
      that.chatButton = true
      // 显示聊天界面
      that.showChat = true
      webim.login(loginInfo, listeners, options, function (resp) {
        loginInfo.identifierNick = resp.identifierNick
        loginInfo.image = resp.headurl
        that.selectMenuList()
      })
    },
    close () {
      var that = this
      that.showChat = false
      that.chatButton = true
      that.letterChat = false
      that.childMessage = 0
      $('#badgeDivShow').css({
        'display' : 'none'
      })
      $('#badgeDivShow').html()
      that.$emit('listerChildIm', that.childMessage)
    },
    // 通讯录 我的好友显示
    selectMenuList ($event, index) {
      var that = this
      that.myFriends = false
      that.selectQuery = false
      that.selectQueryList = []
      that.selectQueryFriend = false
      that.input = ''
      that.nameStyle = '我的好友'
      var tag_list = [
        'Tag_Profile_IM_Image'
      ]
      var options = {
        'To_Account': [loginInfo.identifier],
        'TagList': tag_list
      }
      webim.getProfilePortrait(options, function (resp) {
        // // console.log(resp)
        for (var i in resp.UserProfileItem) {
          var image = ''
          for (var j in resp.UserProfileItem[i].ProfileItem) {
            switch (resp.UserProfileItem[i].ProfileItem[j].Tag) {
              case 'Tag_Profile_IM_Image':
                image = resp.UserProfileItem[i].ProfileItem[j].Value
                break
            }
          }
          loginInfo.headurl = that.$root_url() + image
          // $('.imgList').attr('src', that.$root_url() + image)
        }
      })
      var options = {
        From_Account: loginInfo.identifier,
        TimeStamp: 0,
        StartIndex: 0,
        GetCount: totalCount,
        LastStandardSequence: 0,
        TagList: ['Tag_Profile_IM_Nick', 'Tag_Profile_IM_Image'],
      }
      webim.getAllFriend(options, function (res) {
        if (res.InfoItem) {
          var friend_image = ''
          var n = res.InfoItem
          if (!n || 0 == n.length) return void (e && e())
          for (var o = n.length, i = 0; i < o; i++) {
            var a = n[i],
              r = a.Info_Account,
              l = (friend_image = "")
            for (var c in a.SnsProfileItem)
              switch (a.SnsProfileItem[c].Tag) {
                case "Tag_Profile_IM_Nick":
                  l = a.SnsProfileItem[c].Value
                  break
                case "Tag_Profile_IM_Image":
                  friend_image = a.SnsProfileItem[c].Value
              }
            var d = webim.SESSION_TYPE.C2C + "_" + r
            infoMap[d] = { name: l, image: that.$root_url() + friend_image }
          }
          that.listTable = res.InfoItem.filter(item => item.Info_Account)
        }
      })
      if (that.listTable.length !== 0) {
        that.myFriendsListShow = true
      }
    },
    // 通讯录,我的好友,选择好友
    selectFriendsChat ($event, index, item) {
      var that = this
      that.chatPage = true
      that.selectQuery = false
      that.selectQueryFriend = false
      that.selectQueryList = []
      that.input = ''
      var sessList = document.getElementsByClassName("msgflow")[0]
      sessList.innerHTML = ""
      this.myFriendsListShow = false
      that.myFriends = true
      that.getRecen()
      that.nameStyle = '最近联系人'
      that.sessionId = item.Info_Account
      that.selectFriendShow = item
      that.lately = item.SnsProfileItem[0].Value
      that.latelyImg = that.$root_url() + item.SnsProfileItem[1].Value
      var msgtosend = that.sendMsgs
      var msgLen = webim.Tool.getStrBytes(msgtosend)
      var tmgmsgtosend = webim.Tool.getCookie('tmpmsg_' + that.sessionId)
      if (tmgmsgtosend) {
        $('#send_msg_text').val(tmgmsgtosend)
      } else {
        $('#send_msg_text').val()
      }
      that.sessType= webim.SESSION_TYPE.C2C // 设置会话类型
      var senderId =''
      var senderNick = ''
      var sessionNick = that.lately
      var sessionImage = that.sessionImage
      var tempSess = '' // 临时会话变量
      var firstSessType = that.sessType // 保存第一个会话类型
      var firstSessId = that.sessionId // 保存第一个会话id
      recentSessMap[that.sessType+'_'+that.sessionId]={
        SessionType: that.sessType,// 会话类型
        SessionId: that.sessionId,// 会话对象id，好友id或者群id
        SessionNick: sessionNick,// 会话昵称，好友昵称或群名称
        SessionImage: that.sessionImage,// 会话头像，好友头像或者群头像
        C2cAccount: senderId,// 发送者id，群聊时，才有用
        C2cNick: senderNick,// 发送者昵称，群聊时，才有用
        UnreadMsgCount: that.sessListIn.UnreadMsgCount,// 未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
        MsgSeq:that.sessListIn.MsgSeq,// 消息seq
        MsgRandom: that.sessListIn.MsgRandom,// 消息随机数
        MsgTimeStamp:webim.Tool.formatTimeStamp(that.sessListIn.MsgTimeStamp),// 消息时间戳
        MsgGroupReadedSeq: that.sessListIn.MsgGroupReadedSeq || 0,
        MsgShow: that.sessListIn.MsgShow// 消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
      }
      tempSess = recentSessMap[firstSessType+'_'+firstSessId];// 选中第一个会话
      selType = tempSess.SessionType;// 初始化当前聊天类型
      selToID = tempSess.SessionId;// 初始化当前聊天对象id
      bindScrollHistoryEvent.reset()
      var lastMsgTime = 0 // 第一次拉取好友历史消息时，必须传0
      var msgKey = ''
      var options = {
        'Peer_Account': selToID, // 好友帐号
        'MaxCnt': reqMsgCount, // 拉取消息条数
        'LastMsgTime': lastMsgTime, // 最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
      }
      webim.getC2CHistoryMsgs(options, function (resp) {
        var complete = resp.Complete;// 是否还有历史消息可以拉取，1-表示没有，0-表示有
        if (resp.MsgList.length == 0) {
          webim.Log.warn('没有历史消息了:data=' + JSON.stringify(options))
          return
        }
        getPrePageC2CHistroyMsgInfoMap[selToID] = {// 保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          'LastMsgTime': resp.LastMsgTime,
          'MsgKey': resp.MsgKey
        };
        that.msgLists = resp.MsgList
        getHistoryMsgCallback(that.msgLists)
        that.myFriendsListShow = false
        // 绑定滚动操作
        bindScrollHistoryEvent.init()
      })
      var selSess = webim.MsgStore.sessByTypeId(selType, selToID) //初始化当前会话对象
      // 当前消息已读状态
      webim.setAutoRead(selSess, true, false)
    },
    closeMyFriends () {
      var that = this
      that.myFriendsListShow = false
    },
    getFormatCode (strValue) {
      return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ')
    },
    // 发送
    sendMsgNews () {
      var that = this
      // 获取消息内容
      var msgContent = document.getElementsByClassName("msgedit")[0].value
      var msgLen = webim.Tool.getStrBytes(msgContent)
      msgContent = msgContent.replace(/\n/g,'')
      if (msgContent.trim() === '') {
        that.$message.error('发送的消息不能为空!')
        $("#send_msg_text").val('')
        return
      } else {
        that.sessType= webim.SESSION_TYPE.C2C //设置会话类型
        var senderId =''
        var senderNick = that.lately
        var sessionNick = that.lately
        // var sessionImage = that.sessionImage
        if (that.sessionImage === '') {
          // 会话头像，私聊时为好友头像
          var sessionImage = that.sessionImage
        }else{
          // 会话头像，如果为空，默认将其设置demo自带的头像
          var sessionImage = friendHeadUrl
        }
        var tempSess = '' //临时会话变量
        var firstSessType = that.sessType //保存第一个会话类型
        var firstSessId = that.sessionId //保存第一个会话id
        recentSessMap[that.sessType+'_'+that.sessionId]={
          SessionType: that.sessType,//会话类型
          SessionId: that.sessionId,//会话对象id，好友id或者群id
          SessionNick: senderNick,//会话昵称，好友昵称或群名称
          SessionImage: sessionImage,//会话头像，好友头像或者群头像
          C2cAccount: senderId,//发送者id，群聊时，才有用
          // C2cNick: senderNick,//发送者昵称，群聊时，才有用
          UnreadMsgCount: that.sessListIn.UnreadMsgCount,//未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
          MsgSeq: that.sessListIn.MsgSeq,//消息seq
          MsgRandom: that.sessListIn.MsgRandom,//消息随机数
          MsgTimeStamp: webim.Tool.formatTimeStamp(that.sessListIn.MsgTimeStamp),//消息时间戳
          MsgGroupReadedSeq: that.sessListIn.MsgGroupReadedSeq || 0,
          MsgShow: that.sessListIn.MsgShow//消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
        }
        //清空聊天界面
        that.msgFlowlist = ''
        tempSess = recentSessMap[firstSessType+'_'+firstSessId];//选中第一个会话
        selType = tempSess.SessionType;//初始化当前聊天类型
        selToID = tempSess.SessionId;//初始化当前聊天对象id
        selSess = webim.MsgStore.sessByTypeId(selType, selToID);//初始化当前会话对象
        setSelSessStyleOn(selToID);//设置当前聊天对象选中样式
        webim.syncMsgs(initUnreadMsgCount);//初始化最近会话的消息未读数
        if (!selSess) {
          var selSess = new webim.Session(
            selType,
            selToID,
            tempSess.SessionNick,
            friendHeadUrl,
            Math.round(new Date().getTime() / 1000),
          )
        }
        var isSend = true //是否为自己发送
        var seq = -1 //消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296) //消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000) //消息时间戳
        var subType //消息子类型
        if (selType == webim.SESSION_TYPE.C2C) {
          subType = webim.C2C_MSG_SUB_TYPE.COMMON
        } else {
          subType = webim.GROUP_MSG_SUB_TYPE.COMMON
        }
        loginInfo.identifier = localStorage.identifier
        loginInfo.userSig = localStorage.userSig
        // loginInfo.identifierNick = that.lately
        var msg = new webim.Msg(
          selSess,
          isSend,
          seq,
          random,
          msgTime,
          loginInfo.identifier,
          subType,
          loginInfo.identifierNick
        )
        if (isSend === true) {
          $(".onemsg").addClass(".activeList")
        }
        msg.PushInfo = {
          'PushFlag': 0,
          'Desc': '测试离线推送内容', //离线推送内容
          'Ext': '测试离线推送透传内容', //离线推送透传内容
          'AndroidInfo': {
              'Sound': 'android.mp3' //离线推送声音文件路径。
          },
          'ApnsInfo': {
              'Sound': 'apns.mp3', //离线推送声音文件路径。
              'BadgeMode': 1
          }
        }
        var msgContent = that.sendMsgs
        var msgLen = webim.Tool.getStrBytes(msgContent)
        //发消息处理
        handleMsgSend(msgContent)
        msg.PushInfoBoolean = true //是否开启离线推送push同步
        that.sendMsgs = ''
        webim.sendMsg(msg)
      }
    },
    // 回车发送消息
    onTextareaKeyDowns (e) {
      var that = this
      if (!(/(^\s*)|(\s*$)/g.test(that.sendMsgs))) {
        that.$message.error('发送内容不能为空')
      } else {
        that.sendMsgNews()
        // that.getRecen()
      }
    },
    // 获取更多的消息记录
    getPrePageC2CHistoryMsgs ($event) {
      if ($event.target.scrollTop === 0) {
        var that = this
        var tempInfo = getPrePageC2CHistroyMsgInfoMap[selToID] // 获取下一次拉取的c2c消息时间和消息Key
        var lastMsgTime // 最近的消息时间
        var msgKey
        if (tempInfo) {
          lastMsgTime = tempInfo.LastMsgTime
          msgKey = tempInfo.MsgKey
        } else {
          return
        }
        var options = {
          'Peer_Account': selToID, // 好友帐号
          'MaxCnt': reqMsgCount, // 拉取消息条数
          'LastMsgTime': lastMsgTime, // 最近的消息时间，即从这个时间点向前拉取历史消息
          'MsgKey': msgKey
        }
        // 取更多的消息记录接口
        webim.getC2CHistoryMsgs(options, function(resp) {
          var complete = resp.Complete // 是否还有历史消息。1没有。0有
          if (resp.MsgList.length === 0) {
            return
          }
          // 保留服务器返回的最新消息和key
          getPrePageC2CHistroyMsgInfoMap[selToID] = {
            'LastMsgTime': resp.LastMsgTime,
            'MsgKey': resp.MsgKey
          }
          getHistoryMsgCallback(resp.MsgList, true)
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.chat-interface {
  .accordion-heading {
    border-bottom: 0;
    background-color: #34353a;
    border-bottom: 1px solid #545559;
    color: #fff;
    .accordion-toggle {
      display: block;
      padding: 8px 15px;
      font-size: medium;
    }
    .collapse {
      display: block;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
    a:hover, a:focus {
      color: #cdd0d3;
    }
  }
  // 最近联系人
  .sesslist {
    height: 100%;
    background: #fff;
    overflow-y: auto;
    .sessinfo {
      clear: both;
      height: 50px;
      display: none;
      border-width: 0px 0px 1px 0px;
      border-color: #d5d6d7;
      border-style: solid;
    }
    li {
      height: 64px;
      font-size:14px;
      padding-top: 5px;
      color:#333333;
      clear: both;
      position: relative;
      .face {
        float: left;
        width: 40px;
        height: 40px;
        margin: 5px 15px 5px 10px;
      }
      display: flex;
      flex-direction: row;
      img {
        width: 44px;
        height: 44px;
        margin: 5px 15px 5px 10px;
        border-radius: 50%;
      }
      span {
        display: inline-block;
        width: 160px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor:pointer;
        padding-top: 15px;
        font-size: 14px;
      }
      .msg-tips {
        position: absolute;
        color: #eb6100;
        font-size: 12px;
        cursor:pointer;
        bottom: 5px;
        right: 10px;
        display: none;
      }
      .badge {
        display: none;
        float: right;
        margin: 18px 0 0 0;
        width: 32px;
        height: 20px;
        background: #f00000;
        color: white;
        text-align: center;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        span {
          position: relative;
          top: 1px;
          font-size: 10px;
        }
      }
    }
    li.active {
      font-size: 14px;
      color:#333333;
      background:#ebedf0;
      border-right: 5px solid #eb6100;
    }
    li:hover {
      font-size: 14px;
      color:#333333;
      background:#ebedf0;
    }
  }
  .sesslist::-webkit-scrollbar {
    width: 0;
  }
  // 登录
  .im-login {
    width: auto;
    height: 40px;
    line-height: 40px;
    background-color: #f4ac45;
    color: #ffffff;
    display: inline-block;
    position: fixed;
    right: 295px;
    bottom: 100px;
    border-radius: 6px;
    padding: 0px 20px;
    cursor: pointer;
  }
  // 聊天按钮
  .chat-btn {
    width: auto;
    height: 50px;
    // background-color: #fff;
    color: #ffffff;
    display: inline-block;
    position: fixed;
    right: 20px;
    bottom: 0;
    border-radius: 5px;
    z-index: 888;
    display: flex;
    flex-direction: row;
    // border: 1px solid #eb6100;
    .chat_list {
      width: 200px;
      background: #fff;
      color: #eb6100;
      padding-top: 15px;
      padding-left: 20px;
      cursor: pointer;
      img {
        padding-right: 10px;
      }
    }
    button {
      width: 50px;
      height: 48px;
      border: none;
      outline: none;
      color: #fff;
      background: #eb6100;
      border-radius: 5px;
    }
    #badgeDivShow {
      display: none;
      position: relative;
      top: -20px;
      right: 20px;
      margin: 18px 0 0 0;
      width: 32px;
      height: 20px;
      background: #f00000;
      color: white;
      text-align: center;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      span {
        position: relative;
        top: 1px;
        font-size: 10px;
      }
    }
  }
  .activeBtn {
    background: #666666;
  }
  // 聊天界面层
  .chat-model {
    background-color: #ffffff;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    right: 20px;
    bottom: 10px;
    z-index: 999;
    border: 1px solid #eb6100;
    box-shadow:0 4px 9px 0 rgba(0,0,0,0.15);
    border-radius:4px;
    width: 858px;
    height: 578px;
    overflow: hidden;
    .menu {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      flex: 1;
      padding-top: 25px;
      background: #eb6100;
      color: #eaeaea;
      li {
        text-align: center;
        padding: 10px 0px;
        cursor: pointer;
        .icon {
          width: 50px;
          display: inline-block;
        }
      }
    }
    .friends-list {
      width: 330px;
      height: 578px;
      .left_friend {
        width: 60px;
        height: 100%;
        float: left;
        background: #eb6100;
        .top_img {
          text-align: center;
          margin-top: 52px;
          margin-bottom: 47px;
          img {
            cursor: pointer;
          }
        }
        .bottom_img {
          text-align: center;
          img {
            cursor: pointer;
          }
        }
      }
      .right_friend {
        width: 266px;
        height: 100%;
        float: left;
        .search-linkman {
          height: 64px;
          width: 100%;
          background: #fff;
          line-height: 60px;
          position: relative;
          padding: 0 20px;
          img {
            position: absolute;
            top: 25px;
            left: 30px;
          }
          input {
            background: #f5f6f7;
            border-radius: 4px;
            width: 240px;
            height: 42px;
            outline: none;
            padding-left: 30px;
            padding-right: 10px;
            font-size: 14px;
            border: none;
          }
          span {
            color: #fff;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
    .chat-part {
      background:#f5f6f7;
      width: 530px;
      height: 578px;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      .chat-part-title {
        height: 60px;
        width: 100%;
        padding: 0 10px;
        border-bottom: 1px solid #e6e6e6;
        div:nth-child(1) {
          float: left;
          height: 60px;
          padding-top: 5px;
          img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            float: left;
          }
          span {
            float: left;
            padding-top: 14px;
            padding-left: 20px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
          }
        }
        .close {
          float: right;
          width: 50px;
          text-align: center;
          cursor: pointer;
          margin-top: 20px;
          .el-icon-close {
            color: #000;
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
      .editbar-box {
        height: 95px;
        position: relative;
        .msgedit {
          outline: none;
          resize: none;
          border: none;
          margin-left: 3px;
          color: #666666;
          padding: 10px;
          background: none;
        }
        .editbar {
          border-top: 1px solid #e6e6e6;
          .chat_title_btn {
            cursor: pointer;
            display: inline-block;
          }
        }
        .editbar_button {
          background: #eb6100;
          width: 90px;
          height: 30px;
          position: absolute;
          right: 0;
          bottom: 0;
          border: none;
          outline: none;
          border-radius: 5px;
          color: #fff;
          margin-right: 22px;
        }
        .editbar_button:hover {
          background: #eb6100;
          color: #fff;
        }
      }
    }
    .my_friends_list_box {
      height: 450px;
      background: #fff;
      overflow: auto;
      .sessinfo {
        clear: both;
        height: 50px;
        border-width: 0px 0px 1px 0px;
        border-color: #d5d6d7;
        border-style: solid;
      }
      ul {
        height: 100%;
        overflow-y: auto;
        li {
          height: 64px;
          font-size:14px;
          padding-top: 5px;
          color:#333333;
          clear: both;
          position: relative;
          .face {
            float: left;
            width: 40px;
            height: 40px;
            margin: 5px 15px 5px 10px;
          }
          display: flex;
          flex-direction: row;
          img {
            width: 44px;
            height: 44px;
            margin: 5px 15px 5px 10px;
            border-radius: 50%;
          }
          span {
            display: inline-block;
            width: 160px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            cursor:pointer;
            padding-top: 15px;
            font-size: 14px;
          }
          .msg-tips {
            position: absolute;
            color: #eb6100;
            font-size: 12px;
            cursor:pointer;
            bottom: 5px;
            right: 10px;
            display: none;
          }
        }
        li.active {
          font-size: 14px;
          color:#333333;
          background:#ebedf0;
          border-right: 5px solid #eb6100;
        }
        li:hover {
          background:#ebedf0;
        }
      }
      ul::-webkit-scrollbar {
        width: 0;
      }
    }
  }
}
.select_pic {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: none;
  background: #333;
  opacity: 1;
  button {
    outline: none;
  }
  .modal-content {
    opacity: 1;
  }
}
</style>
<style lang='less'>
.sesslist {
  .sessinfo {
    display: flex;
    display: none;
    .face {
      width: 44px;
      height: 44px;
      margin: 5px 15px 5px 10px;
      border-radius: 50%;
    }
    .delChat {
      display: none;
    }
  }
}
.friends-list-con {
  .sessinfo-sel {
    display: none;
    // color: #fff;
    // background: #fff;
    height: 50px;
    // border-width: 0 0 1px;
    // border-color: #2c2d32;
    // background: #ebedf0;
    // border-right: 5px solid #eb6100;
    border-style: solid;
    font-size: 12px;
    clear: both;
    position: relative;
    .face {
      display: none;
    }
    .delChat {
      display: none;
    }
  }
}
.spinner {
  float: right;
  display: none;
}
.msgflow {
  width: 527px;
  height: 380px;
  padding: 20px 6px 0 6px;
  background: #f8f8f8;
  margin-left: 3px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  .onemsg {
    // height: 80px;
    margin-bottom: 20px;
    .msghead {
      color: #a1a1a1;
      line-height: 12px;
      font-size: 12px;
      margin-left: 6px;
      display: block;
      div {
        width: 100%;
        text-align: center;
        img {
          float: left;
          margin-top: 20px;
        }
        p {
          padding-right: 32px;
        }
      }
    }
    .msgbody {
      pre {
        margin: 15px 20px 0 10px;
      }
    }
    p.msghead {
      color: #a1a1a1;
    }
    .mebody {
      text-align: right;
      margin: 0 10px 0 0;
      div {
        width: 100%;
        text-align: center;
        img {
          float: right;
        }
        p {
          color: #a1a1a1;
          font-size: 12px;
          padding-left: 50px;
        }
      }
      pre {
        // float: right;
        display: inline-block;
        margin-top: 5px;
        margin-right: 10px;
        margin-left: 30px;
        width: auto;
        font-size: 13px;
        line-height: 1.428571429;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #fff;
        border-radius: 4px;
        white-space: pre-wrap;
        background: #eb6100;
        color: #fff;
        a {
          color: #fff;
        }
      }
    }
    .mehead {
      display: none;
    }
    p {
      margin: 0 0 10px;
    }
    .msgbody {
      margin: 0 0 0 18px;
      line-height: 13px;
      font-size: 14px;
    }
    pre {
      display: inline-block;
      padding: 9.5px;
      // margin: 0 10px 0 20px;
      width: auto;
      font-size: 13px;
      line-height: 1.428571429;
      color: #333333;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #fff;
      border-radius: 4px;
      white-space: pre-wrap;
      a {
        color: #428bca;
        text-decoration: none;
        background: transparent;
        font-size: 13px;
        line-height: 1.428571429;
        .glyphicon {
          position: relative;
          top: 1px;
          display: inline-block;
          font-family: 'Glyphicons Halflings';
          -webkit-font-smoothing: antialiased;
          font-style: normal;
          font-weight: normal;
          line-height: 1;
          -moz-osx-font-smoothing: grayscale;
        }
      }
    }
    .activeList {
      color: red;
    }
  }
  .headurlClass {
    height: 44px;
    width: 44px;
    vertical-align: middle;
    border: none;
    margin-top: 5px;
    border-radius: 50%;
    overflow: hidden;
  }
}
.spinner {
    width: 60px;
    text-align: center;
    position: absolute;
    right: 10px;
    top: 32px;
    text-align: right;
}
.spinner > div {
  width: 6px;
  height: 6px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.editbar {
  width: 100%;
  height: 25px;
  border-top: 1px solid #e6e6e6;
  img {
    width: 22px;
    height: 22px;
    margin: 5px 0 0 23px;
    cursor: pointer;
  }
}
.chat02_title_btn {
  background: url(../../../static/img/icon.png) no-repeat 0 0;
  cursor: pointer;
  float: left;
  display: block;
  width: 15px;
  height: 15px;
  margin: 5px 10px;
}
.ctb03 {
  background-position: 0 -152px;
}
.ctb05 {
  background-position: 0 -217px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999999999;
  overflow: auto;
  overflow-y: scroll;
}
.fade {
  opacity: 1;
}
.imgTAN {
  background: #333;
  // opacity: 0.9;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99999;
}
.modal-dialog {
  width: 600px;
  margin: 160px auto;
  z-index: 99999;
  .modal-content {
    position: relative;
    background-color: #ffffff;
    border: 1px solid #999999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    outline: none;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
    background-clip: padding-box;
    .modal-header {
      min-height: 16.428571429px;
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
      .modal-title {
        margin: 0;
        line-height: 1.428571429;
      }
      h4, .h4 {
        font-size: 18px;
      }
    }
    .modal-body {
      position: relative;
      padding: 20px;
      form {
        margin-bottom: 1em;
      }
      .form-group {
        margin-top: 10px;
      }
      .control-label {
        padding-top: 7px;
        margin-top: 0;
        margin-bottom: 0;
        float: left;
        width: 50px;
      }
      .col-sm-10 {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
        input {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        .img-responsive {
          display: block;
          height: auto;
          max-width: 100%;
        }
      }
    }
    .modal-footer {
      padding: 19px 20px 20px;
      margin-top: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5;
      .btn-default {
        color: #333333;
        background-color: #ffffff;
        border-color: #cccccc;
      }
      .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: normal;
        line-height: 1.428571429;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
      }
      .btn-primary {
        color: #ffffff;
        background-color: #eb6100;
        border-color: #eb6100;
      }
    }
  }
}
.modal-header .close {
    margin-top: -2px;
}
button.close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  -webkit-appearance: none;
}
.close {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: #000000;
  text-shadow: 0 1px 0 #ffffff;
  opacity: 0.2;
  filter: alpha(opacity=20);
}
</style>

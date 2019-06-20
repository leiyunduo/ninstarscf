<template>
  <div class="three_step">
    <div class="list_content">
      <div class="title">
        <h3>信贷员选择</h3>
      </div>
      <div class="creditor_list">
        <div class="list" v-for="(item, index) in threeList" :key="index">
          <el-checkbox-group v-model="checkList" :checked='checked' @change="checkChange(checkList, index)">
            <el-checkbox :label="item.id">
              <div class="top">
                <img src="../../../../../static/img/boss.png" alt="">
                <div class="check_posi">
                </div>
                <p>{{ item.name }}</p>
              </div>
              <div class="bottom"></div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="submit">提交</button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>提交后融资申请将发送给您申请的信贷员</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'threeStep',
  data () {
    return {
      threeList: [
        {
          id: 1,
          name: '张嘉英'
        },
        {
          id: 2,
          name: '张嘉英'
        },
        {
          id: 3,
          name: '张嘉英'
        },
        {
          id: 4,
          name: '张嘉英'
        },
        {
          id: 5,
          name: '张嘉英'
        },
        {
          id: 6,
          name: '张嘉英'
        },
        {
          id: 7,
          name: '张嘉英'
        },
        {
          id: 8,
          name: '张嘉英'
        },
        {
          id: 9,
          name: '张嘉英'
        },
        {
          id: 10,
          name: '张嘉英'
        }
      ],
      checkList: [],
      checked: '',
      dialogVisible: false
    }
  },
  methods: {
    checkChange (val, i) {
      console.log(this.checked)
      const that = this
    },
    handleClose () {
      this.dialogVisible = false
    },
    submit () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.three_step {
  margin: 0 40px;
  .list_content {
    background:rgba(255,255,255,1);
    margin: 20px 0 40px 0;
    .title {
      border-bottom: 1px solid rgba(221,221,221,1);
      height: 53px;
      h3 {
        padding-left: 30px;
        line-height: 53px;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:bold;
        color:rgba(102,102,102,1);
      }
    }
    .creditor_list {
      background:rgba(255,255,255,1);
      padding: 0 10px 44px;
      .list {
        width:140px;
        height:140px;
        display: inline-block;
        margin: 30px 20px 0;
        position: relative;
        .top {
          text-align: center;
          position: relative;
          height: 140px;
          z-index: 9;
          padding-left: 18px;
          img {
            width:80px;
            height:80px;
            border-radius:50%;
            border:1px solid rgba(220,220,220,1);
          }
          p {
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight:bold;
            color:rgba(153,153,153,1);
            padding-top: 20px;
          }
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width:140px;
          height:100px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(220,220,220,1);
          border-radius:4px;
        }
      }
      .list:hover {
        .top {
          img {
            border:1px solid rgba(254,200,162,1);
            overflow: hidden;
          }
          p {
            color:rgba(235,97,0,1);
          }
        }
        .bottom {
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 8px 0px #fec8a2;
          border: none;
          border-radius:4px;
        }
      }
      .is-checked {
        .el-checkbox__label {
          .top {
            img {
              border:1px solid rgba(254,200,162,1);
              overflow: hidden;
            }
            p {
              color:rgba(235,97,0,1);
            }
          }
          .bottom {
            background:rgba(255,255,255,1);
            box-shadow:0px 1px 8px 0px rgba(254,200,162,1);
            border-radius:4px;
            border: none;
          }
        }
      }
    }
  }
  .btn {
    text-align: center;
    button {
      width:74px;
      height:32px;
      background:linear-gradient(90deg,rgba(235,97,0,1) 0%,rgba(239,129,51,1) 100%);
      box-shadow:0px 2px 4px 0px rgba(235,97,0,0.4);
      border-radius:4px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(254,254,254,1);
      border: none;
      outline: none;
    }
  }
}
</style>

<style lang="less">
.three_step {
  .el-checkbox__inner {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
  .el-checkbox {
    width: 140px;
  }
  .el-checkbox__input {
    position: absolute;
    bottom: 51px;
    left: 42%;
    z-index: 999;
  }
  .el-checkbox__inner:hover {
    border-color: #eb6100;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #eb6100;
    border-color: #eb6100;
  }
  .is-checked {
    .el-checkbox__label {
      .top {
        img {
          border:1px solid rgba(254,200,162,1);
          overflow: hidden;
        }
        p {
          color:rgba(235,97,0,1);
        }
      }
      .bottom {
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 8px 0px rgba(254,200,162,1);
        border: none;
        border-radius:4px;
      }
    }
  }
  .el-checkbox__inner::after {
    width: 5px;
    height: 9px;
    border: 2px solid #fff;
    left: 5px;
    content: "";
    border-left: 0;
    border-top: 0;
    position: absolute;
    top: 1px;
  }
  .el-dialog__body {
    height: 200px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .el-dialog__header {
    border-bottom:1px solid rgba(220,220,220,1);
  }
  .el-dialog__footer {
    border-top:1px solid rgba(220,220,220,1);
  }
}
</style>

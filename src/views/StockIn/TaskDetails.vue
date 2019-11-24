<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card flat class="mx-auto">
        <v-card-title class="cyan">
          入库任务信息
        </v-card-title>

        <v-card-text>

          <v-form>
            <v-layout wrap>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDate(info.inTime)" label="入库时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.flowNumber" label="入库流水号" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.stockInType(info.type)" label="入库类型" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="`${info.warehouseNumber} - ${info.warehouseName}`" label="仓库" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="`${info.categoryNumber} - ${info.categoryName}`" label="货品类别" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.inCount" label="入库数量" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.unitWeight" label="单位重量" suffix="千克" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.inWeight" label="总重量" suffix="吨" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.specification" label="规格" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.originPlace" label="产地" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.durability" label="保质期" suffix="月" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.positionNumber" label="仓位编码" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.taskCode" label="任务码" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.trayCode" label="托盘码" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.shelfCode" label="货架码" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.userName" label="清点人" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDateTime(info.createTime)" label="清点时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.receiveUserName" label="接单人" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDateTime(info.receiveTime)" label="接单时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDateTime(info.enterTime)" label="上架时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDateTime(info.finishTime)" label="完成时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-textarea label=" 备注" :value="info.remark" readonly auto-grow rows="1">
                </v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" v-if="this.info.status == 72" @click.stop="receive">任务接单</v-btn>
          <v-btn color="success" v-if="this.info.status == 73" @click.stop="showEnter">上架操作</v-btn>
          <v-btn color="indigo" v-if="this.info.status == 74" @click.stop="finish">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialog" eager max-width="600px">
      <stock-in-handle-task ref="enterMod" @close="closeEnter"></stock-in-handle-task>
    </v-dialog>
  </v-layout>
</template>


<script>
import stockIn from '@/controllers/stockIn'
import StockInHandleTask from './HandleTask'

export default {
  name: 'StockInTaskDetails',
  props: {},
  components: {
    StockInHandleTask
  },
  data: () => ({
    taskId: '',
    info: {},
    dialog: false
  }),
  methods: {
    init(id) {
      this.taskId = id
      if (id == undefined || id == '') {
        return
      }

      this.getInfo()
    },

    getInfo() {
      let vm = this
      stockIn.getTask(this.taskId).then(res => {
        vm.info = res
      })
    },

    receive() {
      let vm = this

      this.info.receiveUserId = this.$store.state.user.id
      this.info.receiveUserName = this.$store.state.user.name
      this.info.status = 73

      stockIn.handleTask(this.info).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '任务接单成功')
          vm.getInfo()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    },

    showEnter() {
      this.$refs.enterMod.init(this.taskId)
      this.dialog = true
    },

    closeEnter(val) {
      this.dialog = false
      if (val) {
        this.getInfo()
      }
    },

    finish() {
      let vm = this
      this.info.status = 75

      stockIn.handleTask(this.info).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '确认成功')
          vm.getInfo()
        } else {
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    }
  }
}
</script>

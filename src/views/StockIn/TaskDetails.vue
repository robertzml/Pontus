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
                <v-text-field v-model="info.categoryName" label="类别名称" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.categoryNumber" label="类别编号" readonly></v-text-field>
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
                <v-text-field v-model="info.trayCode" label="托盘码" readonly></v-text-field>
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
                <v-text-field v-model="info.warehouseName" label="仓库名称" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.warehouseNumber" label="仓库编号" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field v-model="info.userName" label="登记人" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDateTime(info.createTime)" label="创建时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayDateTime(info.confirmTime)" label="确认时间" readonly></v-text-field>
              </v-flex>
              <v-flex xs6 md3>
                <v-text-field :value="$util.displayStatus(info.status)" label="状态" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 md12>
                <v-textarea label=" 备注" :value="info.remark" readonly auto-grow rows="1">
                </v-textarea>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import stockIn from '@/controllers/stockIn'

export default {
  name: 'StockInTaskDetails',
  props: {},
  data: () => ({
    taskId: '',
    info: {}
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
    }
  }
}
</script>

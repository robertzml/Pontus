<template>
  <v-layout wrap>
    <v-flex xs12 md12>
      <v-card class="mx-auto">
        <v-card-title class="orange">
          仓位信息
          <v-spacer></v-spacer>

          <v-btn text color="blue-grey lighten-4" v-if="shelfInfo.type == 2" @click="showSheet">生成仓位</v-btn>
        </v-card-title>

        <v-flex md12 class="pa-2">
          <div class="d-md-block my-2">
            货架号：{{ shelfInfo.number }}&nbsp;&nbsp;&nbsp;排数： {{ shelfInfo.row }}&nbsp;&nbsp;&nbsp;
            层数：{{ shelfInfo.layer }}&nbsp;&nbsp;&nbsp;进数：{{ shelfInfo.depth }}
          </div>
          <div class="d-flex flex-row" v-if="positionCount > 0">
            <div class="mr-1 align-self-center">
              <v-icon>arrow_upward</v-icon> <br />
              <span class="ml-1">层</span> <br />
              <v-icon>arrow_downward</v-icon>
            </div>
            <div>
              <div class="d-flex justify-center">
                <v-icon>arrow_back</v-icon>
                <span class="mb-1">排</span>
                <v-icon>arrow_forward</v-icon>
              </div>
              <div class="d-flex flex-wrap" v-for="layer in shelfInfo.layer" :key="layer">
                <v-card v-for="row in shelfInfo.row" :key="row" class="pa-2" outlined tile @click.stop="selectRowLayer(row, shelfInfo.layer - layer + 1)">
                  {{ row.toString().padStart(2, '0') }} - {{ shelfInfo.layer - layer + 1 }}
                </v-card>
              </div>
            </div>
          </div>

          <div v-show="sRowLayer">
            <div class="d-flex flex-column mt-4 pl-7">
              <div class="d-flex mb-2">
                {{ positionTitle }}
              </div>
              <div class="d-flex flex-wrap">
                <v-card v-for="depth in shelfInfo.depth" :key="depth" class="pa-2" outlined tile @click.stop="selectPosition(depth)">
                  {{ depth.toString().padStart(2, '0') }}
                </v-card>
              </div>
              <div class="d-flex my-4">
                仓位编号：{{ positionInfo.number }}&nbsp;&nbsp;&nbsp; 副编号：{{ positionInfo.viceNumber }}
              </div>
            </div>
          </div>
        </v-flex>

      </v-card>
    </v-flex>

    <v-bottom-sheet v-model="sheet" persistent>
      <v-sheet class="text-center" height="150px">
        <v-progress-linear color="light-green" height="10" :indeterminate="loading" striped>
        </v-progress-linear>
        <v-btn class="mt-6 mr-4" outlined color="red" @click.stop="startGenerate">开始生成</v-btn>
        <v-btn class="mt-6" text color="primary" @click="sheet = !sheet">关闭</v-btn>
        <div class="mt-2">
          <p>
            货架号：{{ shelfInfo.number }} 货架排数： {{ shelfInfo.row }} 货架层数：{{ shelfInfo.layer }} 货架进数：{{ shelfInfo.depth }}
          </p>
          <p>
            已有仓位数量：{{ positionCount }}
          </p>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-layout>
</template>

<script>
import shelf from '@/controllers/shelf'
import position from '@/controllers/position'

export default {
  name: 'PositionList',
  data: () => ({
    sheet: false,
    loading: false,
    sRowLayer: false,
    shelfInfo: {},
    positionCount: 0,
    positionListData: [],
    positionTitle: '',
    positionInfo: {},
    sRow: 0,
    sLayer: 0
  }),
  methods: {
    init(shelfId) {
      this.sRowLayer = false
      this.sRow = 0
      this.sLayer = 0
      this.positionInfo = {}

      let vm = this
      shelf.get(shelfId).then(res => {
        vm.shelfInfo = res
      })

      position.count(shelfId).then(res => {
        vm.positionCount = res
      })
    },

    showSheet() {
      this.sheet = true
      this.loading = false
    },

    startGenerate() {
      if (this.positionCount != 0) {
        alert('已有仓位')
        return
      }

      let vm = this
      this.loading = true
      position.generate({ shelfId: this.shelfInfo.id }).then(res => {
        if (res.status == 0) {
          vm.$store.commit('alertSuccess', '生成货架成功')
          vm.loading = false
          vm.sheet = false
        } else {
          vm.loading = false
          vm.$store.commit('alertError', res.errorMessage)
        }
      })
    },

    selectRowLayer(row, layer) {
      this.sRowLayer = true
      this.sRow = row
      this.sLayer = layer
      this.positionTitle = this.shelfInfo.number + '货架' + row + '列' + layer + '层 仓位'
      this.positionInfo = {}
    },

    selectPosition(depth) {
      let vm = this
      position.get({ shelfId: this.shelfInfo.id, row: this.sRow, layer: this.sLayer, depth: depth }).then(res => {
        vm.positionInfo = res
      })
    }
  }
}
</script>

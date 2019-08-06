<template>
  <div class="home">
    <dx-box :height="400" direction="col" width="100%">
      <dx-item :base-size="100" :ratio="0">
        <div slot-scope="_" class="rect demo-dark header">
          <dx-tabs :data-source="headerTabs" />
        </div>
      </dx-item>

      <dx-item :base-size="0" :ratio="2">
        <dx-box :height="125" direction="row" width="100%">
          <dx-item :ratio="1">
            <div slot-scope="_" class="rect demo-dark">Left Bar</div>
          </dx-item>
          <dx-item :ratio="1">
            <div slot-scope="_" class="rect demo-light">Content</div>
          </dx-item>
          <dx-item :ratio="1">
            <div slot-scope="_" class="rect demo-dark">Right Bar</div>
          </dx-item>
        </dx-box>
      </dx-item>

      <dx-item :ratio="1">
        <div slot-scope="_" class="rect demo-dark footer">Footer</div>
      </dx-item>
    </dx-box>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    
  },
  data() {
    return {
      headerTabs: [{
        id: 0,
        text: "冷库管理",
        icon: "home"
      }, {
        id: 1,
        text: '统计报表',
        icon: "chart"
      }]     
    }
  }
};
</script>

<style scoped>
.rect {
  text-align: center;
  font-size: 30px;
  padding-top: 10px;
  height: 100%;
}

.demo-light {
  background: rgba(245, 229, 166, 0.5);
}

.demo-dark {
  background: rgba(148, 215, 199, 0.5);
}

.demo-dark.header {
  background: rgba(243, 158, 108, 0.5);
}

.demo-dark.footer {
  background: rgba(123, 155, 207, 0.5);
}

.small {
  height: 50px;
  border: 1px solid lightgray;
}
</style>

<template>
  <v-expansion-panels v-model="expandToggle" flat   accordion class="mt-1 mb-1" style="z-index: auto;">
    <v-expansion-panel
    >
      <v-expansion-panel-header class="font-weight-bold" expand-icon="" @click="isexpand = !isexpand">
        <span>
          <slot name="title">
            {{titleName}}
          </slot>
          <v-icon v-show="isexpand" left >mdi-chevron-double-up</v-icon>
          <v-icon v-show="!isexpand" left >mdi-chevron-double-down</v-icon>
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot></slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "expandPanel",
  props: {
    titleName: {},
    expand_at_start: {
      default: true
    },

  },
  data() {
    return {
      isexpand:false,
      // expand_at_start:false,
      expandToggle:0,
    }
  },
  created() {
    this.changeExpand();
  },
  watch:{
    expand_at_start(){
      this.changeExpand();
    }
  },
  methods:{
    changeExpand(){
      if (this.expand_at_start){
        this.expandToggle =  0
      }else{
        this.expandToggle = undefined
      }
    }
  }
}
</script>

<style scoped>

</style>

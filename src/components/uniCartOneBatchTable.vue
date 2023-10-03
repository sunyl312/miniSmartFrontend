<template>
<v-sheet class="pa-2">
  <v-data-table
      :item-key="itemKey"
      :headers="headers"
      show-select
      :items="items"
      v-model="selectedItems"
  >

  </v-data-table>

  <div class="text-center">
    <v-btn class="mx-1" dark :color="$store.state.globalColor" small elevation="0" @click="copy2clipboard"><v-icon small >mdi-content-copy</v-icon>复制选择内容到剪贴板</v-btn>
    <v-btn class="mx-1" dark color="error" small elevation="0" @click="deleteOneBatch"><v-icon small >mdi-alert-circle-outline</v-icon>删除此项</v-btn>
  </div>
<!--  {{$store.state.cart}}-->
<!--  {{selectedItems}}-->
</v-sheet>
</template>

<script>
export default {
  name: "uniCartOneBatchTable",
  props:{
    itemKey:{
      default:"name"
    },
    batchName:{

    },
    headers:{},
    items:{}
  },
  data(){
    return {
      selectedItems:[]
    }
  },
  methods:{
    copy2clipboard(){
      this.$copyText(this.selectedItems.map(x=>{
        return x.name
      }).join("\n")).then(res=>{
        this.$store.dispatch("sendNotification",{msg:"成功复制到剪贴板",type:0})
      }).catch(err=>{
        this.$store.dispatch("sendNotification", {msg:"复制到剪贴板失败",type:1})
      })
    },
    deleteOneBatch(){
       this.$store.commit("deleteOneBatchFromGSACart",this.batchName);
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div>


    <v-navigation-drawer
        v-model="$store.state.cartShow"
        stateless
        absolute
        right
        touchless
        app
        width="600"
    >


      <v-row>
        <v-col cols="12">
          <v-sheet class="text-center text-h6 font-weight-bold teal--text"  > <v-icon color="teal">mdi-cart</v-icon>数据中转站
            <help-msg>添加到Cart中的ID会显示在这里，用于下一步的处理。</help-msg>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-btn :color="$store.state.globalColor" class="ma-1" dark small
                 @click="$store.state.cartShow= !$store.state.cartShow">
            <v-icon dark small>mdi-close</v-icon>
            关闭
          </v-btn>
          <v-btn class="ma-1" color="error" dark small>
            <v-icon dark small>mdi-cart-remove</v-icon>
            清空所有
          </v-btn>
          <v-btn class="ma-1" color="teal" dark small @click="refresh">
            <v-icon dark small>mdi-refresh</v-icon>
            刷新列表
          </v-btn>
        </v-col>
      </v-row>
      <v-sheet class="pa-2 ">

        <v-tabs v-model="tabs" centered>
          <v-tab>GSA</v-tab>
          <v-tab>GSA-Human</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>


            <v-sheet class="mt-4 pa-2" rounded>

              <v-card :key="items[0]" v-for="(items,idx) in  Object.entries(dataItems)" color="blue lighten-4">
                <v-card-subtitle class=" text-h6 font-weight-bold">
                  <v-chip color="blue" label small>#{{ idx + 1 }}</v-chip>
                  {{ items[0] }}
                </v-card-subtitle>
                <v-card-text>
                  <!--                    <v-data-table-->
                  <!--                        item-key="name"-->
                  <!--                        :headers="commonDTHeaders"-->
                  <!--                        show-select-->
                  <!--                        :items="items[1]"-->

                  <!--                    >-->
                  <!--                    </v-data-table>-->
                  <uni-cart-one-batch-table
                      :headers="commonDTHeaders"
                      :items="items[1]"
                      :batch-name="items[0]"
                  ></uni-cart-one-batch-table>
                  <!--                {{items[1]}}-->

                </v-card-text>
              </v-card>
            </v-sheet>


          </v-tab-item>
          <v-tab-item>TBD</v-tab-item>
        </v-tabs-items>
      </v-sheet>


    </v-navigation-drawer>
  </div>
</template>

<script>
import HelpMsg from "@/components/helpMsg";
import UniCartOneBatchTable from "@/components/uniCartOneBatchTable";

export default {
  name: "uniCart",
  components: {UniCartOneBatchTable, HelpMsg},
  data() {
    return {
      tabs: 0,
      commonDTHeaders: [
        {
          text: 'subCRA id',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {text: '修改时间', value: 'modtime'},
        {text: '状态', value: 'status'},
      ],
      // dataItems:[],
    }
  },
  computed:{
    dataItems(){
      return this.$store.state.cart.gsa || {}
    }

  },
  watch: {
    dataItems:{
          handler:function(newval){
            // this.dataItems = this.$store.state.cart.gsa;
            this.$nextTick(()=>{
              this.$forceUpdate();
            })
          },
      deep:true,
      immediate:true,
    },
  },

  methods:{
    refresh(){
      this.$forceUpdate();
    }
  }

}
</script>

<style scoped>

</style>
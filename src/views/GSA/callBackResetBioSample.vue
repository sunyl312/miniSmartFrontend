<template>
  <v-sheet min-height="600" outlined>

    <expand-panel>
      <template #title>
        <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
        功能描述和使用说明
      </template>
      <v-sheet class=" px-3 py-6" outlined rounded>
        这个命令的应用场景是：审编人员误操作通过了BioSample的审核，此命令将重置为未审核状态。
      </v-sheet>
    </expand-panel>
    <v-row no-gutters>
      <v-col cols="3">
        <v-sheet class="my-1 ml-2 mr-1 pa-3" min-height="600" outlined rounded>

          <v-sheet>
            <v-btn @click="loadData" :disabled="dataIDListStr ==null" :color="$store.state.globalColor" class="mx-2 my-1" style="color: white" small>
              <v-icon dark small>mdi-rocket</v-icon>
              执行
            </v-btn>
            <v-btn @click="reset" class="mx-2 my-1" color="red lighten-1" dark small>
              <v-icon dark small>mdi-refresh</v-icon>
              重置
            </v-btn>
          </v-sheet>
          <v-sheet>
            <v-textarea v-model="dataIDListStr" background-color="yellow lighten-4" clearable flat height="550" hide-details
                        label="subSAM ids"
                        outlined></v-textarea>
          </v-sheet>
          <v-sheet>
            <v-btn @click="loadData" :disabled="dataIDListStr ==null" :color="$store.state.globalColor" class="mx-2 my-1" style="color: white" small>
              <v-icon dark small>mdi-rocket</v-icon>
              执行
            </v-btn>
            <v-btn @click="reset" class="mx-2 my-1" color="red lighten-1" dark small>
              <v-icon dark small>mdi-refresh</v-icon>
              重置
            </v-btn>
          </v-sheet>

        </v-sheet>
      </v-col>
      <v-col cols="9">
        <v-sheet class="my-1 ml-1 mr-2 pa-3" min-height="600" outlined rounded>


          <v-row >
            <v-col cols="9">
              <v-row no-gutters>
                <v-col>
                  <v-btn class="px-2 my-1" color="white" elevation="0" label small>
                    <v-icon small>mdi-database-search</v-icon>
                    SQL命令
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right">
                  <v-btn @click="$copy2Clipboard(sqlStr)" class="px-2 my-1" color="success" dark elevation="0" label small>
                    <v-icon dark small>mdi-content-copy</v-icon>
                    复制到剪贴板
                  </v-btn>
                </v-col>

              </v-row>

              <v-textarea v-model="sqlStr" background-color="blue lighten-4" height="550" hide-details outlined></v-textarea>
            </v-col>
            <v-col cols="3">
              <v-row no-gutters>
                <v-col>
                  <v-btn class="px-2 my-1" color="white" elevation="0" label small>
                    <v-icon small>mdi-database-search</v-icon>
                    失败列表
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-sheet class="text-right">
                  <v-btn @click="$copy2Clipboard(sqlStr)" class="px-2 my-1 mr-1" color="success" dark elevation="0" label small>
                    <v-icon dark small>mdi-content-copy</v-icon>
                    复制到剪贴板
                  </v-btn>
                </v-sheet>
              </v-row>

              <v-textarea v-model="failedStr" background-color="blue lighten-4"
                          height="550"
                          hide-details outlined></v-textarea>


            </v-col>
          </v-row>


        </v-sheet>
      </v-col>

    </v-row>

  </v-sheet>
</template>

<script>
import ExpandPanel from "@/components/expandPanel";
export default {
  name: "callBackResetBioSample",
  components: {ExpandPanel},
  data(){return{
    dataIDListStr: null,
    isLoading: false,
    sqlStr: "",
    failedStr:""
  }},
  methods:{

    loadData() {
      // [
      //   {"type": "subCRA", "value": "subCRA018812"},
      //   {"type": "subCRA", "value": "subCRA018506"}
      // ]

      /*
      *  ”CRA111\nCRA222\n“
      *
      *  ['CRA111',
      * "CRA222"
      *  ]
      *
      * */
      this.isLoading = true;

      let dataList = this.dataIDListStr &&  this.dataIDListStr.trim().split(/\n/).filter(x => {
        return x.trim() != ""
      }).map(x => {
        return {
          type: "subSAM",
          value: x
        }
      }) || []


      // console.log(data)
      let x = axios.post(
          "/api/ResetBiosampleStatus/",
          dataList,
          {}
      ).then(res => {
        this.$store.dispatch("sendNotification", {msg: "成功获得数据", type: 0})

        let success = res.data.filter(x=>{return x.status === true});
        let failed = res.data.filter(x=>{return x.status === false});


        console.log(success,failed)

        this.sqlStr = success.map(x=>{return "# "+x.value +"\n"+ x.mysql.join("\n") }).join("\n");
        this.failedStr =failed.map(x=>{return x.value}).join("\n");
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
        console.log(err)
        this.$store.dispatch("sendNotification", {msg: "请求数据错误", type: 1})
      })


    },
    reset() {
      this.dataIDListStr = null;
      this.isLoading = false;
      this.sqlStr =""
      this.failedStr = ""
    }
  },

}
</script>

<style scoped>

</style>
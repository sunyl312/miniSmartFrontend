<template>
  <div>

    <common-sub-header :breadItems="headerItems" ></common-sub-header>

    <v-sheet class="pa-3">
      <v-tabs v-model="tabs">
        <v-tab>Run状态修改</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>

          <expand-panel>
            <template #title>
              <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
              功能描述和使用说明
            </template>
            <v-sheet class=" px-3 py-6" outlined rounded>

              此命令用于将指定Run和Run data file的状态修改为10。
            </v-sheet>
          </expand-panel>
          <v-row no-gutters>
            <v-col cols="3">
              <v-sheet class="my-1 ml-2 mr-1 pa-3" min-height="600" outlined rounded>
                <v-card elevation="0" class="pa-0">
                  <v-card-subtitle class="pa-0">1. 输入subCRA id</v-card-subtitle>
                  <v-card-text class="pa-0">
                    <v-text-field v-model="dataStr"  background-color="yellow lighten-4" clearable dense  outlined></v-text-field>

                  </v-card-text>
                </v-card>
                <v-card elevation="0" class="pa-0">
                  <v-card-subtitle class="pa-0">2. 指定处理时间</v-card-subtitle>
                  <v-card-text class="pa-0">
                    <v-switch      v-model="useCurrentTime"
                                   inset
                                   label="使用当前时间"></v-switch>
                    <v-sheet>

                    </v-sheet>
                    <v-row v-show="!useCurrentTime">
                      <v-col cols="12">
                        <v-date-picker width="100%" v-model="selected_date" locale="zh-cn" title="释放日期"></v-date-picker>
                      </v-col>
                      <v-col cols="12">
                        <v-time-picker full-width format="24hr" v-model="selected_time" locale="zh-cn" title="释放时间"></v-time-picker>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-card elevation="0" class="pa-0">
                  <v-card-subtitle class="pa-0">3. 复核信息并执行</v-card-subtitle>
                  <v-card-text class="pa-0">

                    <v-sheet color="blue lighten-3" rounded outlined class="pa-2">
                      数据集：[{{dataStr}}] <br/>
                      修改状态为：10(数据处理成功) <br/>
                      修改时间为：{{ useCurrentTime === true ? "点击执行时的时间" : selected_date +" "+selected_time  }}
                    </v-sheet>

                  </v-card-text>
                </v-card>

                <v-btn :disabled="dataStr == null" @click="loadData" :loading="isLoading" :color="$store.state.globalColor" class="mx-2 my-1" style="color: white" small>
                  <v-icon dark small>mdi-rocket</v-icon>
                  执行
                </v-btn>
                <v-btn @click="reset" class="mx-2 my-1" color="red lighten-1" dark small>
                  <v-icon dark small>mdi-refresh</v-icon>
                  重置
                </v-btn>


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
                        <v-btn @click="$copy2Clipboard(sqlStr)"  class="px-2 my-1" color="success" dark elevation="0" label small>
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
                        <v-btn @click="$copy2Clipboard(failedStr)" class="px-2 my-1 mr-1" color="success" dark elevation="0" label small>
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
        </v-tab-item>
      </v-tabs-items>

    </v-sheet>


  </div>


</template>

<script>
import CommonSubHeader from "@/components/commonSubHeader";
import ExpandPanel from "@/components/expandPanel";
import comm from "@/plugins/comm";

export default {
  name: "changeStatus",
  components: {ExpandPanel, CommonSubHeader},
  data(){
    return{
      headerItems:[
        {
          text: 'MiniSmart2',
          disabled: true,
        },
        {
          text: 'GSA',
          disabled: true,

        },
        {
          text: '状态修改',
          disabled: true,

        },
      ],
      selected_date:null,
      selected_time:null,
      tabs:0,
      useCurrentTime:true,
      currentTime: null,
      dataStr:null,
      isLoading:false,
      failedStr:"",
      sqlStr:"",
    }
  },

  methods:{
    loadData(){
      /*
      * [
{"type": "subCRA", "value": "subCRA019765","moditytime":"2023-09-10 00:00:00","modifystatus":"10"},
{"type": "subCRA", "value": "subCRA012222","moditytime":"2023-09-10 00:00:00","modifystatus":"10"}
]

      * */


      this.isLoading= true;
      let dataList =[
        {
          type: "subCRA",
          value: this.dataStr.trim(),
          moditytime: this.useCurrentTime ? comm.getCurrentDateTime() : this.selected_date +" " + this.selected_time,
          modifystatus :"10"
        }
      ]

      //     [{"type": "subCRA",
      //   "value": "subCRA019765"}, {
      //   "type": "subCRA",
      //   "value": "subCRA019560"
      // }]


      let x = axios.post(
          "/api/AssistModifyStatus/",
          dataList,
          {
          }
      ).then(res=>{
        this.$store.dispatch("sendNotification", {msg:"成功获得数据",type:0})

        let success = res.data.filter(x=>{
          return x.status == true;
        })
        let failed = res.data.filter(x=>{
          return x.status == false;
        })

        this.sqlStr = success.map(x=>"#"+ x.value+"\n"+  x.myqsql.join("\n")).join("\n");
        this.failedStr = failed.map(x=>x.value).join("\n");
        this.isLoading = false;
      }).catch(err=>{

        this.isLoading = false;
        this.$store.dispatch("sendNotification", {msg:"请求数据错误",type:1})
      })



    },
    reset(){
      this.selected_date = null;
      this.selected_time = null;
      this.useCurrentTime = true;
      this.currentTime = null;
      this.dataStr = null;
      this.isLoading = false;
      this.failedStr = "";
      this.sqlStr = "";

    }
  },
  mounted() {
    this.selected_time = comm.getCurrentTime()
    this.selected_date = comm.getCurrentDate()
  }

}
</script>

<style scoped>

</style>
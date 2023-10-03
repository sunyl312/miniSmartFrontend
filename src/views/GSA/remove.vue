<template>
  <div>
    <common-sub-header :bread-items="headerItems"></common-sub-header>

    <expand-panel :expand_at_start="true" title-name="Help">
      <template #title>
        <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
        功能描述和使用说明
      </template>
      <v-sheet class=" px-3 py-6" outlined rounded>

       删除一个数据集的所有内容，包括元信息和数据。

      </v-sheet>
    </expand-panel>


    <v-sheet class="ma-3" rounded>
      <v-row no-gutters>
        <v-col cols="3">
          <v-sheet class="ml-2 mr-1 my-2 pa-2" min-height="600" outlined>
            <v-card class="pa-0" elevation="0">
              <v-card-subtitle class="pa-0">1. 输入ID类型</v-card-subtitle>
              <v-card-text class="pa-0">

                <v-select  background-color="yellow lighten-4" v-model="selected_id_type" :items="id_types" dense hide-details outlined></v-select>
<!--                {{  }}-->

              </v-card-text>
            </v-card>
            <v-card class="pa-0" elevation="0">
              <v-card-subtitle class="pa-0">2. 输入ID</v-card-subtitle>
              <v-card-text class="pa-0">

                <v-textarea v-model="dataStr" height="350" background-color="yellow lighten-4" clearable dense  outlined></v-textarea>

              </v-card-text>
            </v-card>


            <v-btn :disabled="dataStr ==null" @click="loadData"  :color="$store.state.globalColor" class="mx-2 my-1" style="color: white" small>
              <v-icon dark small>mdi-rocket</v-icon>
              执行
            </v-btn>
            <v-btn @click="reset"  class="mx-2 my-1" color="red lighten-1" dark small>
              <v-icon dark small>mdi-refresh</v-icon>
              重置
            </v-btn>


          </v-sheet>
        </v-col>
        <v-col cols="9">
          <v-sheet class="ml-1 mr-2 my-2 pa-2" min-height="600" outlined>

            <v-row >
              <v-col cols="9">
                <v-row>
                  <v-col cols="12">
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

                    <v-textarea v-model="sqlStr" background-color="blue lighten-4" height="250" hide-details outlined></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-row no-gutters>
                      <v-col>
                        <v-btn class="px-2 my-1" color="white" elevation="0" label small>
                          <v-icon small>mdi-download</v-icon>
                          FTP命令
                        </v-btn>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col class="text-right">
                        <v-btn @click="$copy2Clipboard(ftpStr)"  class="px-2 my-1" color="success" dark elevation="0" label small>
                          <v-icon dark small>mdi-content-copy</v-icon>
                          复制到剪贴板
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-textarea  v-model="ftpStr" background-color="blue lighten-4" height="250" hide-details outlined></v-textarea>
                  </v-col>
                </v-row>
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
                    <v-btn  @click="$copy2Clipboard(failedStr)"  class="px-2 my-1 mr-1" color="success" dark elevation="0" label small>
                      <v-icon dark small>mdi-content-copy</v-icon>
                      复制到剪贴板
                    </v-btn>
                  </v-sheet>
                </v-row>

                <v-textarea v-model="failedStr" background-color="blue lighten-4"
                            height="560"
                            hide-details outlined></v-textarea>


              </v-col>

            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>


  </div>
</template>

<script>
import CommonSubHeader from "@/components/commonSubHeader";
import ExpandPanel from "@/components/expandPanel";

export default {
  name: "remove",
  components: {ExpandPanel, CommonSubHeader},
  data() {
    return {
      headerItems: [
        {
          text: 'MiniSmart2',
          disabled: true,
        },
        {
          text: 'GSA',
          disabled: true,

        },
        {
          text: '删除',
          disabled: true,

        },
      ],
      id_types: [
        {text: "CRA accession", value: "CRAacc"},
        {text: "subCRA id", value: "subCRA"},
        {text: "Sample accession", value: "SAMCacc"},
        {text: "Experiment accession", value: "CRXacc"},
        {text: "Run accession", value: "CRRacc"},
      ],
      selected_id_type: null,
      dataStr:null,
      isLoading:false,
      sqlStr:"",
      ftpStr:"",
      failedStr:"",
    }
  },
  methods:{
    loadData(){

      /*
      *
      * [{
        "type": "CRAacc",
                  "value": ["CRA008514", "CRA008522"]
              },
          ]

      * */

      let dataList  = [
        {
          type:this.selected_id_type,
          value: this.dataStr.trim().split(/\n/).filter(x=>{
            return x.trim != ""
          })
        }//
      ]

      // console.log(data)
      axios.post(
          "/api/DeleteGSA/",
          dataList,
          {}
      ).then(res => {
        this.$store.dispatch("sendNotification", {msg: "成功获得数据", type: 0})


        let success = res.data.filter(x=>{
          return x.status === true;
        })
        let failed = res.data.filter(x=>{
          return x.status === false;
        })

        this.sqlStr = success.map(x=>{
          return "# "+x.value +"\n"+ x.mysql.join("\n")
        }).join("\n") ;
        this.ftpStr = success.map(x=>{
          return "# "+x.value +"\n"+ x.ftp.join("\n")
        }).join("\n") ;

        this.failedStr = failed.map(x=>{
          return x.value
        }).join("\n");

        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
        console.log(err)
        this.$store.dispatch("sendNotification", {msg: "请求数据错误", type: 1})
      })


    },
    reset(){
      this.selected_id_type = null;
      this.dataStr = null;
      this.isLoading = false;
      this.sqlStr = "";
      this.ftpStr = "";
      this.failedStr ="";
    }
  }
}
</script>

<style scoped>

</style>
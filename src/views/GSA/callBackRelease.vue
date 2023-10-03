<template>


  <v-sheet min-height="600">
    <expand-panel>
      <template #title>
        <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
        功能描述和使用说明
      </template>
      <v-sheet class=" px-3 py-6" outlined rounded>

        对于已经释放的数据集，将其改为未释放状态。

      </v-sheet>
    </expand-panel>
    <v-row no-gutters>
      <v-col cols="3">
        <v-sheet class="my-1 ml-2 mr-1 pa-3" min-height="600" outlined rounded>
          <v-card class="pa-0" elevation="0">
            <v-card-subtitle class="pa-0">1. 输入ID类型和ID的值</v-card-subtitle>
            <v-card-text class="pa-0">
              <v-radio-group :disabled="isLoading" v-model="id_type"  row>
                <v-radio
                    value="CRAacc"
                    label="CRA accession"
                ></v-radio>
                <v-radio
                    value="subCRA"
                    label="subCRA id"
                ></v-radio>
              </v-radio-group>
              <v-text-field :disabled="isLoading" v-model="dataID" background-color="yellow lighten-4" clearable dense
                            outlined></v-text-field>

            </v-card-text>
          </v-card>


          <v-card class="pa-0" elevation="0">
            <v-card-subtitle class="pa-0">2. 选择新的释放日期</v-card-subtitle>
            <v-card-text class="pa-0">
              <v-date-picker :disabled="isLoading" v-model="selected_date" locale="zh-cn" title="释放日期"
                             width="100%"></v-date-picker>

            </v-card-text>
          </v-card>

          <v-card class="pa-0" elevation="0">
            <v-card-subtitle class="pa-0">3. 复核信息并生成命令</v-card-subtitle>
            <v-card-text class="pa-0">
              <v-sheet class="pa-2" color="blue lighten-3" outlined rounded>
                1. 数据集类型为[{{id_type}}].<br/>
                2. 将数据集[{{dataID}}]的状态修改为”未释放“.<br/>
                3. 将释放时间修改为： {{ fullDate }}
              </v-sheet>

            </v-card-text>
          </v-card>

          <v-btn @click="loadData" :loading="isLoading" :color="$store.state.globalColor" class="mx-2 my-1" dark small>
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

          <v-row no-gutters>
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
                  <v-btn  @click="$copy2Clipboard(ftpStr)" class="px-2 my-1" color="success" dark elevation="0" label small>
                    <v-icon dark small>mdi-content-copy</v-icon>
                    复制到剪贴板
                  </v-btn>
                </v-col>
              </v-row>
              <v-textarea v-model="ftpStr" background-color="blue lighten-4" height="250" hide-details outlined></v-textarea>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>


</template>

<script>
import comm from "@/plugins/comm";
import ExpandPanel from "@/components/expandPanel";

export default {
  name: "callBackRelease",
  components: {ExpandPanel},
  data(){
    return {
      id_type: "CRAacc",
      selected_date: null ,
      dataID:null,
      isLoading:false,
      sqlStr:"",
      ftpStr:"",
    }
  },
  methods:{
    loadData(){
      // [{"type": "subCRA","value": "subCRA018549","releasetime": "2023-12-31 00:00:00"}, {"type": "CRAacc","value": "CRA012521","releasetime": "2023-12-31 00:00:00"}]
      this.isLoading = true;

      let data = [{
        type: this.id_type,value: this.dataID,releasetime: this.fullDate
      }]
      console.log(data)
      axios.post(
          "/api/ReleaseCallback/",
          data,
          {
          }
      ).then(res=>{
        this.$store.dispatch("sendNotification", {msg:"成功获得数据",type:0})

        // let success = res.data.idlist. filter(x=>{
        //   return x.status == true;
        // })
        // let failed = res.data.idlist.filter(x=>{
        //   return x.status == false;
        // })

        this.sqlStr = res.data[0].mysql.join("\n");
        this.ftpStr = res.data[0].ftp.join("\n");
        this.isLoading = false;
      }).catch(err=>{
        this.isLoading = false;
        console.log(err)
        this.$store.dispatch("sendNotification", {msg:"请求数据错误",type:1})
      })


    },
    reset(){


      this.id_type = "CRAacc"
      this.selected_date = comm.getCurrentDate();
      this.isLoading = false;
      this.sqlStr = "";
      this.ftpStr = "";
      this.dataID = null;

    },

  },

  computed:{
    fullDate(){
      return this.selected_date + " 00:00:00"
    }
  },
  mounted() {
    this.selected_date = comm.getCurrentDate()
  }
}
</script>

<style scoped>

</style>
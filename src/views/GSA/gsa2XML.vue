<template>
  <div>
    <common-sub-header :breadItems="headerItems"></common-sub-header>
    <expand-panel :expand_at_start="true" title-name="Help">
      <template #title>
        <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
        功能描述和使用说明
      </template>
      <v-sheet class=" px-3 py-6" outlined rounded>

        接受一个CRA accession，生成一个符合NCBI SRA数据库的XML文件。

      </v-sheet>
    </expand-panel>

    <v-sheet class="ma-3" rounded>
      <v-row no-gutters>
        <v-col cols="3">
          <v-sheet class="ml-2 mr-1 my-2 pa-2" min-height="600" outlined>

            <v-card class="pa-0" elevation="0">
              <v-card-subtitle class="pa-0">CRA accession</v-card-subtitle>
              <v-card-text class="pa-0">
                <v-text-field
                    v-model="dataStr"
                    background-color="yellow lighten-4" clearable dense
                    outlined></v-text-field>

              </v-card-text>
            </v-card>

            <v-row no-gutters>
              <v-col cols="12">
                <v-btn :loading="isLoading" @click="loadData" :disabled="dataStr == null" :color="$store.state.globalColor" class="mt-1" style="color: white" small width="100%">
                  <v-icon dark small>mdi-rocket</v-icon>
                  执行</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn class="mt-1" color="red lighten-1" dark small width="100%">
                  <v-icon dark small>mdi-refresh</v-icon>
                  重置</v-btn>
              </v-col>
            </v-row>


          </v-sheet>
        </v-col>
        <v-col cols="9">
          <v-sheet class="ml-1 mr-2 my-2 pa-2" min-height="600" outlined>

            <v-row no-gutters>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col>
                    <v-btn class="px-2 my-1" color="white" elevation="0" label small>
                      <v-icon small>mdi-xml</v-icon>
                      预览XML文件
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="text-right">
                    <v-btn :loading="isDownloadLoading" @click="download" class="px-2 my-1" color="red lighten-1" dark elevation="0" label small>
                      <v-icon dark small>mdi-download</v-icon>
                      下载
                    </v-btn>
                  </v-col>

                </v-row>

<!--                <v-textarea v-model="xmlStr" background-color="blue lighten-4" height="550" hide-details outlined></v-textarea>-->
                <pre v-model="xmlStr" style="height: 550px;overflow-y: auto" class="blue lighten-4" >
                        {{xmlStr}}
                </pre>

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
import FileDownload from 'js-file-download'
export default {
  name: "gsa2XML",
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
          text: 'GSA2XML',
          disabled: true,

        },
      ],
      dataStr:null,
      isLoading:false,
      isDownloadLoading:false,
      xmlStr:"",
    }
  },
  methods:{
    loadData(){
      // [{"type": "subCRA","value": "subCRA018549","releasetime": "2023-12-31 00:00:00"}, {"type": "CRAacc","value": "CRA012521","releasetime": "2023-12-31 00:00:00"}]
      this.isLoading = true;

      let data = [{
        type:"CRAacc",value:this.dataStr.trim()
      }]
      console.log(data)
      axios.post(
          "/api/GSA2XMLFile/",
          data,
          {
          }
      ).then(res=>{
        this.$store.dispatch("sendNotification", {msg:"成功获得数据",type:0})

        this.xmlStr=res.data[0].content;


        this.isLoading = false;
      }).catch(err=>{
        this.isLoading = false;
        console.log(err)
        this.$store.dispatch("sendNotification", {msg:"请求数据错误",type:1})
      })


    },
    reset(){
      this.dataStr=null;
      this.isLoading = false;
      this.xmlStr = "";
    },
    download(){
      this.isDownloadLoading=true;
      if (this.xmlStr!=""){
        this.$store.dispatch("sendNotification",{
          msg:"开始生成XML文件",
          type:0
        })
        FileDownload(this.xmlStr,this.dataStr.trim()+".toNCBI.xml")
        this.$store.dispatch("sendNotification",{
          msg:"成功生成XML文件",
          type:0
        })
      }else{
        this.$store.dispatch("sendNotification",{
          msg:"无法下载XML文件",
          type:1
        })
      }
      this.isDownloadLoading = false;

    }
  }
}
</script>

<style scoped>

</style>
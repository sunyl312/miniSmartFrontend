<template>
<div>
  <common-sub-header :bread-items="headerItems"></common-sub-header>
  <expand-panel :expand_at_start="true" title-name="Help">
    <template #title>
      <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
      功能描述和使用说明
    </template>
    <v-sheet class=" px-3 py-6" outlined rounded>

      <br/>
      接受一组CRA accession，生成一个符合NCBI SRA数据库的XML文件。

    </v-sheet>
  </expand-panel>

  <v-sheet class="ma-3" rounded>
    <v-row no-gutters>
      <v-col cols="3">
        <v-sheet class="ml-2 mr-1 my-2 pa-2" min-height="600" outlined>

          <v-card class="pa-0" elevation="0">
            <v-card-subtitle class="pa-0">谱系文件 <a :href="example_file" target="_blank" style="text-decoration: none">示例</a> </v-card-subtitle>
            <v-card-text class="pa-0">
<!--              <v-text-field-->
<!--                  background-color="yellow lighten-4" clearable dense-->
<!--                  outlined></v-text-field>-->

              <v-file-input v-model="fileInput" outlined dense prepend-inner-icon="mdi-file"  prepend-icon="" background-color="yellow lighten-4"></v-file-input>

            </v-card-text>
          </v-card>

          <v-row no-gutters>
            <v-col cols="12">
              <v-btn @click="loadData" :disabled="fileInput ==null" :color="$store.state.globalColor" class="mt-1" style="color: white" small width="100%">
                <v-icon dark small>mdi-rocket</v-icon>
                提交</v-btn>
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
                    <v-icon small>mdi-database-search</v-icon>
                    运行结果
                  </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right">
<!--                  <v-btn class="px-2 my-1" color="red lighten-1" dark elevation="0" label small>-->
<!--                    <v-icon dark small>mdi-download</v-icon>-->
<!--                    下载-->
<!--                  </v-btn>-->
                </v-col>

              </v-row>

              <v-textarea v-model="msgStr" background-color="blue lighten-4" height="250" hide-details outlined></v-textarea>
              <v-row no-gutters>
                <v-col>
                  <v-btn class="px-2 my-1" color="white" elevation="0" label small>
                    <v-icon small>mdi-database-search</v-icon>
                    SQL
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
  name: "tax2GSA",
  components: {ExpandPanel, CommonSubHeader},
  data(){
    return {
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
          text: 'TAX2GSA',
          disabled: true,

        },
      ],
      example_file:`${process.env.BASE_URL}/examples/lineage_example.txt`,
      sqlStr:"",
      msgStr:"",
      isLoading:"",
      fileInput:null,
    }
  },
  methods:{
    loadData(){

      let taxLineageFormData = new FormData();
      taxLineageFormData.append("taxontxt", this.fileInput);

      axios.post(
          "/api/taxon2gsa/",
          taxLineageFormData,
          {
            headers:{
              "Content-Type":"multipart/form-data"
            }
          }
      ).then(res => {
        this.$store.dispatch("sendNotification", {msg: "成功获得数据", type: 0})

        console.log(res.data)

        if (res.data.status===true){
          this.$store.dispatch("sendNotification", {msg: "校验成功！", type: 0});
        }else{
          this.$store.dispatch("sendNotification", {msg: "校验失败！", type: 1});
        }

        this.msgStr="UUID: " + res.data.uuid +"\n\n后台返回消息：\n"+ res.data.message;
        this.sqlStr = res.data.content;

        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
        console.log(err)
        this.$store.dispatch("sendNotification", {msg: "请求数据错误", type: 1})
      })



    },
    reset(){

    }
  }
}
</script>

<style scoped>

</style>
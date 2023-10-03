<template>
  <div>
    <common-sub-header :breadItems="headerItems"></common-sub-header>


    <expand-panel :expand_at_start="true" title-name="Help">
      <template #title>
        <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
        功能描述和使用说明
      </template>
      <v-sheet class=" px-3 py-6" outlined rounded>
        此功能用于向用户反馈数据报错的信息。邮件会发送到指定审核员的邮箱中。
      </v-sheet>
    </expand-panel>
    <v-sheet class="ma-3" rounded>
      <v-row no-gutters>
        <v-col cols="3">
          <v-sheet class="ml-2 mr-1 my-2 pa-2" min-height="600" outlined>
            <v-sheet>
              <v-btn  :loading="isLoading" @click="loadData" :color="$store.state.globalColor" class="mx-2 my-1" dark small>
                <v-icon dark small>mdi-rocket</v-icon>
                执行
              </v-btn>
              <v-btn @click="reset" class="mx-2 my-1" color="red lighten-1" dark small>
                <v-icon dark small>mdi-refresh</v-icon>
                重置
              </v-btn>
              <v-btn class="mx-2 my-1" color="teal " dark small  @click="$store.state.cartShow = true">
                <v-icon dark small>mdi-cart</v-icon>
                打开数据中转站
              </v-btn>
            </v-sheet>
            <v-sheet>

              <v-card class="pa-0" elevation="0">
                <v-card-subtitle class="pa-0">1. 输入subCRA ids</v-card-subtitle>
                <v-card-text class="pa-0">
                  <v-textarea :disabled="isLoading" v-model="dataStr"  background-color="yellow lighten-4" clearable flat height="500" hide-details
                              label=""
                              outlined></v-textarea>
                </v-card-text>
              </v-card>

              <v-card class="pa-0" elevation="0">
                <v-card-subtitle class="pa-0">2. 输入Email</v-card-subtitle>
                <v-card-text class="pa-0">
                  <v-text-field :disabled="isLoading" v-model="email" background-color="yellow lighten-4" class="my-2" clearable dense hide-details
                                outlined></v-text-field>
                  <v-sheet>
                    <span>快捷邮箱：</span>
                    <a @click="email='sunyanling@big.ac.cn'" >sunyl</a> &nbsp;
                    <a @click="email='donglili@big.ac.cn'" >dongll</a> &nbsp;
                    <a @click="email='chentt@big.ac.cn'" >chentt</a> &nbsp;
                    <a @click="email='zhengxinchang@big.ac.cn'" >zhengxc</a>
                  </v-sheet>
                </v-card-text>
              </v-card>




            </v-sheet>
            <v-sheet>
              <v-btn  :loading="isLoading" @click="loadData" :color="$store.state.globalColor" class="mx-2 my-1" dark small>
                <v-icon dark small>mdi-rocket</v-icon>
                执行
              </v-btn>
              <v-btn @click="reset" class="mx-2 my-1" color="red lighten-1" dark small>
                <v-icon dark small>mdi-refresh</v-icon>
                重置
              </v-btn>
              <v-btn class="mx-2 my-1" color="teal " dark small  @click="$store.state.cartShow = true">
                <v-icon dark small>mdi-cart</v-icon>
                打开数据中转站
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-col>
        <v-col cols="9">
          <v-sheet class="ml-2 mr-1 my-2 pa-2" min-height="600" outlined>

            <v-row>
              <v-col cols="6">
                <v-btn class="px-2 my-1" color="white"  elevation="0" label small>
                  <v-icon color="success" dark small>mdi-check-bold</v-icon>
                  发送成功的subCRA id
                </v-btn>
                <v-textarea  v-model="successIDStr" background-color="blue lighten-4" height="600" outlined></v-textarea>
              </v-col>
              <v-col cols="6">
                <v-btn class="px-2 my-1" color="white"  elevation="0" label small>
                  <v-icon color="error" dark small>mdi-close</v-icon>
                  发送失败的subCRA id
                </v-btn>
                <v-textarea v-model="errorIDStr" background-color="blue lighten-4" height="600" outlined></v-textarea>
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
  name: "feedback",
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
          text: '报错反馈',
          disabled: true,

        },
      ],
      tabs: 0,
      email:"",
      dataStr:null,
      errorIDStr:"",
      successIDStr:"",
      isLoading:false,

    }
  },
  methods:{


    loadData(){

      if(this.email === null || this.email ===""){
        this.$store.dispatch("sendNotification", {msg:"邮箱不能为空",type:1})
        return false
      }

      if(this.dataStr === null || this.dataStr ===""){
        this.$store.dispatch("sendNotification", {msg:"ID列表不能为空",type:1})
        return false
      }


      this.isLoading= true;
      let dataList = this.dataStr.trim().split(/\n/).map(x=>{
        return {
          type:"subCRA",
          value:x.trim()
        }
      })

      let data =  {
        email: this.email,
        idlist: dataList
      }
      axios.post(
          "/api/feedback/",
          data,
          {
              timeout:144000 *1000
          }
      ).then(res=>{
        this.$store.dispatch("sendNotification", {msg:"成功获得数据",type:0})

        let success = res.data.idlist. filter(x=>{
          return x.status == true;
        })
        let failed = res.data.idlist.filter(x=>{
          return x.status == false;
        })

        this.successIDStr = success.map(x=>x.value).join("\n");
        this.errorIDStr = failed.map(x=>x.value).join("\n");
        this.isLoading = false;
      }).catch(err=>{
        this.isLoading = false;
        this.$store.dispatch("sendNotification", {msg:"请求数据错误",type:1})
      })

    },
    reset(){
      this.isLoading = false;
      this.errorIDStr= "";
      this.successIDStr = "";
      this.dataStr = null;
      this.email = ""
    }
  }
}
</script>

<style scoped>

</style>
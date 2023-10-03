<template>
  <div>
    <common-sub-header :breadItems="headerItems"></common-sub-header>

    <expand-panel :expand_at_start="false" title-name="Help">
      <template #title>
        <v-icon color="red lighten-2" small>mdi-tooltip-question</v-icon>
        功能描述和使用说明
      </template>
      <v-sheet class=" px-3 py-6" outlined rounded>

        查询指定的提交的处理状态。状态可以是：<br/>
        <v-simple-table>
          <thead>
            <tr>
              <th>状态码</th>
              <th>所处阶段</th>
              <th>解释</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>元信息提交后</td>
              <td>用户元信息提交完成，GSA正在处理</td>
            </tr>
            <tr>
              <td>3</td>
              <td>元信息提交后</td>
              <td>元信息审核通过，数据文件处理成功</td>
            </tr>
            <tr>
              <td>4</td>
              <td>元信息提交后</td>
              <td>元信息审核通过，数据文件处理失败</td>
            </tr>
            <tr>
              <td>5</td>
              <td>任何时候</td>
              <td>用户删除CRA</td>
            </tr>
            <tr>
              <td>11-16</td>
              <td>用户元信息提交过程</td>
              <td>用户处于元信息提交的某个步骤中</td>
            </tr>
          </tbody>
        </v-simple-table>

      </v-sheet>
    </expand-panel>

    <v-sheet class="ma-3" rounded>
      <v-row no-gutters>
        <v-col cols="3">
          <v-sheet class="ml-2 mr-1 my-2 pa-2" min-height="600" outlined>
            <v-sheet>
              <v-btn :loading="isLoading" @click="loadData" :color="$store.state.globalColor" class="mx-2 my-1" :disabled="inputSubCRAIDStr ===null" style="color: white" small>
                <v-icon dark small>mdi-rocket</v-icon>
                执行
              </v-btn>
              <v-btn @click="reset" class="mx-2 my-1" color="red lighten-1" dark small>
                <v-icon dark small>mdi-refresh</v-icon>
                重置
              </v-btn>
            </v-sheet>
            <v-sheet>
              <v-textarea background-color="yellow lighten-4"
                          clearable flat height="600" hide-details
                          v-model="inputSubCRAIDStr"
                          outlined></v-textarea>
            </v-sheet>
            <v-sheet>
              <v-btn :loading="isLoading" @click="loadData" :color="$store.state.globalColor" class="mx-2 my-1" :disabled="inputSubCRAIDStr ===null" style="color: white" small>
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
          <v-sheet class="ml-1 mr-2 my-2 pa-2" min-height="600" outlined>
            <v-tabs v-model="tabs">
              <v-tab>  状态4：数据报错<v-chip x-small class="mx-1" :color="$store.state.globalColor" dark label >{{ status4Items && status4Items.length || "0"}}</v-chip></v-tab>
              <v-tab>  状态2：元信息已经提交<v-chip x-small class="mx-1" :color="$store.state.globalColor" dark label >{{ status2Items && status2Items.length || "0"}}</v-chip></v-tab>
              <v-tab>  状态3：数据已经归档<v-chip x-small class="mx-1" :color="$store.state.globalColor" dark label >{{ status3Items && status3Items.length || "0"}}</v-chip></v-tab>
              <v-tab>  状态5：数据已经删除<v-chip x-small class="mx-1" :color="$store.state.globalColor" dark label >{{ status5Items && status5Items.length || "0"}}</v-chip></v-tab>
<!--              <v-tab> <v-chip>{{}}</v-chip> 其他状态：用户提交元信息过程中</v-tab>-->
            </v-tabs>
            <v-tabs-items v-model="tabs">

              <v-tab-item>
                <v-btn @click="addOneBatchToGSACart" :loading="isLoading" color="teal" class="mx-2 my-1" dark elevation="0" small>
                  <v-icon small>mdi-plus</v-icon>
                  添加到数据中转站
                </v-btn>
                <v-btn color="teal" class="mx-2 my-1" dark elevation="0"
                       small @click="$store.state.cartShow = true">
                  <v-icon small>mdi-cart</v-icon>
                  打开数据中转站
                </v-btn>
                <v-btn @click="$copy2Clipboard(status4selected.map(x=>{return x.name}).join('\n'))" class="px-2 my-1 mr-1" color="success" dark elevation="0" label small>
                  <v-icon dark small>mdi-content-copy</v-icon>
                  复制到剪贴板
                </v-btn>
                <v-data-table
                    v-model="status4selected"
                    item-key="name"
                    :headers="commonDTHeaders"
                    show-select
                    :items="status4Items"
                >
                  <template v-slot:item.action="{ item }">
                      <v-btn color="red lighten-2" small dark elevation="0" class="mr-1">操作</v-btn>
                  </template>

                </v-data-table>
              </v-tab-item>


              <v-tab-item>
                <v-data-table
                    item-key="name"
                    :headers="commonDTHeaders"
                    show-select
                    :items="status2Items"
                ></v-data-table>
              </v-tab-item>


              <v-tab-item>
                <v-data-table
                    item-key="name"
                    :headers="commonDTHeaders"
                    show-select
                    :items="status3Items"
                ></v-data-table>
              </v-tab-item>


              <v-tab-item>
                <v-data-table
                    item-key="name"
                    :headers="commonDTHeaders"
                    show-select
                    :items="status5Items"
                ></v-data-table>
              </v-tab-item>


<!--              <v-tab-item>-->
<!--                <v-data-table-->
<!--                    :headers="commonDTHeaders"-->
<!--                ></v-data-table>-->
<!--              </v-tab-item>-->

            </v-tabs-items>
          </v-sheet>
        </v-col>
      </v-row>

    </v-sheet>


  </div>
</template>

<script>
import CommonSubHeader from "@/components/commonSubHeader";
import ExpandPanel from "@/components/expandPanel";
import comm from '@/plugins/comm'
export default {
  name: "inquiry",
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
          text: '查询',
          disabled: true,

        },
      ],
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
        {text: '操作', value: 'action'},
      ],
      status4selected: [],
      items:[
        {
          name: '11234',
          modtime:'2012-12-21 00:01:15',
          status:"4"
        },
        {
          name: '11235',
          modtime:'2012-12-22 00:01:15',
          status:"4"
        },
        {
          name: '11236',
          modtime:'2012-12-25 00:01:15',
          status:"4"
        },
      ],
      inputSubCRAIDStr:null,
      isLoading:false,
    }
  },

  computed:{

    status4Items(){
      return this.items.filter(item=>{
        return item && item.status == "4" || false;
      })
    },
    status2Items(){
      return this.items.filter(item=>{
        return item && item.status == "2" || false;
      })
    },
    status3Items(){
      return this.items.filter(item=>{
        return item && item.status == "3" || false;
      })
    },
    status5Items(){
      return this.items.filter(item=>{
        return item && item.status == "5" || false;
      })
    }
  },

  methods:{
    loadData(){

      if(this.inputSubCRAIDStr ===null) {
        this.$store.dispatch("sendNotification",{
          msg:"输入数据为空，请检查",
          type:1
        })
        return false;
      }

      let inputSubCRAIDList = this.inputSubCRAIDStr.split(/\n/).filter(x=>{
        return x.trim() != "";
      });
      console.log(inputSubCRAIDList);
      let reformatedData = inputSubCRAIDList.map(x=>{
        return {
          "type": "subCRA",
          "value":x.trim()
        }
      });
      console.log(reformatedData);
      this.isLoading = true;
      axios.post(
          `/api/CheckIdStatus/`,
          reformatedData,
          {
          }
      ).then(res=>{
        this.$store.dispatch("sendNotification",{msg:"成功获得数据",type:0})
        this.items = res.data.map(x=>{
          return  {
            name: x.value,
            modtime:x.results.modtime,
            status:x.results.status.toString()
          }
        });
        this.isLoading = false;
      }).catch(err=>{
        this.isLoading = false;
        this.$store.dispatch("sendNotification", {msg:"请求数据错误",type:1 })
      })
    },
    addOneBatchToGSACart(){

      // console.log(this.status4selected);
      // this.$store.state.cart.gsa['aa'] = this.status4selected;
      if (this.status4selected.length == 0){
        this.$store.dispatch("sendNotification", {msg:"请选择数据集合",type:1 })
        return false;
      }

      let timestamp = comm.getCurrentDateTime();
      this.$store.commit("addOneBatchToCart",{
        type:"gsa",
        data:this.status4selected,
        name:timestamp
      });
    },
    reset(){
      this.isLoading = false;
      this.inputSubCRAIDStr = null
      this.status4selected = [];
      this.items = [
        {
          name: '11234',
          modtime:'2012-12-21 00:01:15',
          status:"4"
        },
        {
          name: '11235',
          modtime:'2012-12-22 00:01:15',
          status:"4"
        },
        {
          name: '11236',
          modtime:'2012-12-25 00:01:15',
          status:"4"
        }]
    },
    copy(){
      this.$copy2Clipboard(this.status4selected.map(x=>{return x.name}).join('\n'))
    }
  }
}
</script>

<style scoped>

</style>
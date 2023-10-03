<template>
  <v-container class="container--fluid pa-6">

    <v-row>

      <v-col cols="12">

        <v-sheet
            :style="{
           background: 'url('+bg+')',
           paddingBottom:'10px',

           marginLeft:'10px',
           marginRight:'10px',
           backgroundRepeat:'repeat',
           backgroundPosition: '50% 10%',
           backgroundSize:'120% ',
           borderRadius: '5px 5px 5px 5px',
           }"
            height="700"
        >
          <!--        <span class="white&#45;&#45;text">aaa</span>-->
          <!--        <div class="white&#45;&#45;text">aaa</div>-->
          <v-sheet class="pt-16 z-transparent"></v-sheet>
          <v-sheet class="z-transparent text-center white--text text-h3 py-2">
            <div style="color: white !important;">MiniSmart2 for GSA/GSA-Human</div>
          </v-sheet>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="11">
              <v-row>
                <v-col cols="10">
                  <v-card height="500">
                    <v-card-title>
                      <v-icon :color="$store.state.globalColor">mdi-chart-box</v-icon>
                      统计
                    </v-card-title>
                    <v-card-text>
                      <v-tabs  v-model="tabs" centered >
                        <v-tab>GSA</v-tab>
                        <v-tab disabled>GSA-Human</v-tab>
                      </v-tabs>
                      <v-tabs-items v-model="tabs">
                        <v-tab-item class="pa-1">
                          <v-row>
                            <v-col v-for="item in statsdata" :key="item.name" cols="12" lg="4" md="4" sm="4" xl="4">
                              <v-hover v-slot="{ hover }">
                                <v-card
                                    :elevation="hover?4:0"
                                    :to="item.to"
                                    class="mx-0 pa-3 text-center"
                                    min-height="170"
                                    tile

                                >

                                  <v-sheet class="pt-6">
                                    <v-progress-circular
                                        v-show="isLoading"
                                        :color="$store.state.globalColor"
                                        :size="45"
                                        :width="7"
                                        indeterminate
                                    ></v-progress-circular>

                                    <div v-show="!isLoading" :style="{color: $store.state.globalColor}"
                                         class="text-h4"
                                    >
                                      <v-icon :color="item.color">{{ item.icon }} mdi-36px</v-icon>
                                      {{ item.num }}
                                    </div>
                                    <v-divider dark></v-divider>

                                    <div :class="[item.fontsize]" :style="{color: $store.state.globalColor}"
                                         v-html="item.name"></div>
                                  </v-sheet>

                                </v-card>
                              </v-hover>
                            </v-col>
                          </v-row>
                        </v-tab-item>
                      </v-tabs-items>

                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="2">
                  <v-card height="500">
                    <v-card-title>
                      <v-icon :color="$store.state.globalColor">mdi-view-module</v-icon>
                      功能模块
                    </v-card-title>
                    <v-card-text>

                      <v-row>
                        <v-col cols="12">
                          <v-hover v-slot="{ hover }">
                            <v-card
                                :elevation="hover?4:0"
                                class="mx-0 pa-3 text-center"
                                min-height="190"
                                outlined
                                tile
                                to="/home-gsa"
                            >
                              <v-sheet class="pt-10">
                                <div
                                    class="text-h4"
                                >
                                  <v-img src="../assets/img/gsa.png"></v-img>
                                </div>
                                <v-divider dark></v-divider>

                                <div class="text-body-1 font-weight-bold">GSA审编</div>
                              </v-sheet>
                            </v-card>
                          </v-hover>
                        </v-col>
                        <v-col cols="12">
                          <v-hover v-slot="{ hover }">
                            <v-card
                                :elevation="hover?4:0"
                                class="mx-0 pa-3 text-center"
                                min-height="190"
                                outlined
                                tile
                                to="/home-gsa-human"

                            >
                              <v-sheet  class="pt-12">
                                <div
                                    class="text-h4"
                                >
                                  <v-img src="../assets/img/gsa_human.png"></v-img>
                                </div>
                                <v-divider dark></v-divider>

                                <div class="text-body-1 font-weight-bold">GSA-Human审编</div>
                              </v-sheet>
                            </v-card>
                          </v-hover>
                        </v-col>
                      </v-row>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-sheet>

      </v-col>

    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      bg: require("../assets/img/background2.jpg"),
      statsdata: [
        {
          name: "未完成",
          num: 0,
          icon: "mdi-star",
          fontsize: 24,
          color: "red lighten-3"
        },
        {
          name: "正在提交",
          num: 0,
          icon: "mdi-star",
          fontsize: 24,
          color: "red lighten-3"
        },
        {
          name: "已经归档",
          num: 0,
          icon: "mdi-star",
          fontsize: 24,
          color: "red lighten-3"
        },
        {
          name: "已经释放",
          num: 0,
          icon: "mdi-star",
          fontsize: 24,
          color: "red lighten-3"
        },
        {
          name: "报错",
          num: 0,
          icon: "mdi-star",
          fontsize: 24,
          color: "red lighten-3"
        },
      ],
      isLoading: false,
      toChinese: {
        "unfinished": "未完成",
        "submitting": "正在提交",
        "archive": "已经归档",
        "released": "已经释放",
        "processError": "报错"
      },
      tabs:0,
    }
  },
  methods: {
    loadData() {


      this.isLoading = true;

      axios.post(
          "/api/CheckStatusCount/",
          {},
          {}
      ).then(res => {
        // this.$store.dispatch("sendNotification", {msg:"成功获得数据",type:0})

        // let success = res.data.idlist. filter(x=>{
        //   return x.status == true;
        // })
        // let failed = res.data.idlist.filter(x=>{
        //   return x.status == false;
        // })

        this.statsdata = [];

        for (const [k, v] of Object.entries(res.data)) {
          this.statsdata.push(
              {
                name: this.toChinese[k],
                num: v,
                icon: "mdi-star",
                fontsize: 24,
                color: "red lighten-3"
              }
          )
        }

        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
        console.log(err)
        this.$store.dispatch("sendNotification", {msg: "请求数据错误", type: 1})
      })

    }
  },
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped>
.z-transparent {
  background-color: transparent !important;
  opacity: 2;
  border-color: transparent !important;
}

.z-transparent_half {
  background-color: white !important;
  opacity: 0.2;
  color: white !important;
  border-color: white !important;
}


</style>
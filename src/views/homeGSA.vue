<template>
  <v-sheet >
    <v-row no-gutters>
      <v-col cols="2" >
        <v-sheet min-height="1000" elevation="4" rounded class="mr-2"  >
          <v-row no-gutters>
            <v-col cols="12">
              <v-sheet :color="$store.state.globalColor" class="text-h6 text-center white--text" >GSA审编</v-sheet>
            </v-col>
            <v-col cols="12">
              <v-card elevation="0" class="my-1" tile >
                <v-card-subtitle>功能列表</v-card-subtitle>
                <v-card-text>
                  <v-list>
                    <v-list-group
                        :value="true"
                        prepend-icon=""
                        sub-group
                    >
                      <template v-slot:activator>
                        <v-list-item-title> <v-icon>mdi-cloud-upload</v-icon> 数据提交过程 <help-msg>用户数据提交过程中的状态查询和反馈数据报错</help-msg></v-list-item-title>
                      </template>
                      <v-list>
                        <v-list-item to="/home-gsa/inquiry">
                          状态查询
                        </v-list-item>
                        <v-list-item to="/home-gsa/feedback">
                          报错反馈
                        </v-list-item>
                      </v-list>

                    </v-list-group>

                    <v-list-group
                        :value="true"
                        prepend-icon=""
                        sub-group
                    >
                      <template v-slot:activator>
                        <v-list-item-title><v-icon>mdi-horse-human</v-icon> 人工介入<help-msg>全过程审编人员直接介入，协助用户删除，撤回，修改数据状态</help-msg></v-list-item-title>
                      </template>
                      <v-list>
                        <v-list-item to="/home-gsa/callback">
                          数据撤回
                        </v-list-item>
                        <v-list-item to="/home-gsa/remove">
                          数据删除
                        </v-list-item>
                        <v-list-item to="/home-gsa/change-status">
                          其他状态修改
                        </v-list-item>
                      </v-list>

                    </v-list-group>

                    <v-list-group
                        :value="true"
                        prepend-icon=""
                        sub-group
                    >
                      <template v-slot:activator>
                        <v-list-item-title> <v-icon>mdi-file-document</v-icon> 其他 <help-msg>其他辅助工具</help-msg></v-list-item-title>
                      </template>
                      <v-list>
                        <v-list-item to="/home-gsa/gsa2xml">
                          GSA2XML
                        </v-list-item>
                        <v-list-item to="/home-gsa/tax2gsa">
                          TAX2GSA
                        </v-list-item>
                      </v-list>

                    </v-list-group>

                  </v-list>
                </v-card-text>
              </v-card>
              <v-card elevation="0" class="my-1" tile>
                <v-card-subtitle>工具箱</v-card-subtitle>
                <v-card-text>
                  <v-sheet>
                    <v-btn color="teal" class="mr-2 my-1 ml-10" dark elevation="0"
                          small  @click="$store.state.cartShow = !$store.state.cartShow">
                      <v-icon small >mdi-cart</v-icon>
                      数据中转站
                    </v-btn>
<!--                    <v-btn color="teal" class="mx-2 my-1" dark elevation="0"-->
<!--                           small @click="$store.state.cartShow = false">-->
<!--                      <v-icon small>mdi-cart</v-icon>-->
<!--                      关闭数据中转站-->
<!--                    </v-btn>-->
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>

          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="10" >
        <v-sheet min-height="1000" elevation="4"  >
          <keep-alive>
            <router-view/>
          </keep-alive>

        </v-sheet>
      </v-col>
    </v-row>
<!--    {{$store.state.cart}}-->
<!--    {{$store.state.cartShow}}-->
  </v-sheet>
</template>

<script>
import HelpMsg from "@/components/helpMsg";
export default {
  name: "homeGSA",
  components: {HelpMsg},
  data(){
    return {
      expand:[0,1]
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
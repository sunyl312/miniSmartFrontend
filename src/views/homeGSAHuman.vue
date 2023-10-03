<template>
  <v-sheet >
    <v-row no-gutters>
      <v-col cols="2" >
        <v-sheet min-height="1000" elevation="4" rounded class="mr-2"  >
          <v-row no-gutters>
            <v-col cols="12">
              <v-sheet :color="$store.state.globalColor" class="text-h6 text-center white--text" >GSA-Human审编</v-sheet>
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
                        <v-list-item to="/home-gsa-human/feedback-GSAHuman">
                          报错反馈
                        </v-list-item>
                      </v-list>

                    </v-list-group>

                  </v-list>
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

  </v-sheet>
</template>

<script>
import HelpMsg from "@/components/helpMsg";
export default {
  name: "homeGSAHuman",
  components: {HelpMsg},
  data(){
    return{
      expand:[0]
    }
  }
}
</script>

<style scoped>

</style>
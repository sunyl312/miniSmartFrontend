<template>
  <div>
    <common-sub-header :bread-items="headerItems"></common-sub-header>
    <v-sheet class="ma-3" rounded>

      <v-tabs v-model="tabs">
        <v-tab>
          <v-icon :color="$store.state.globalColor" dark small>mdi-star</v-icon>
          撤回已经释放的数据
        </v-tab>
        <v-tab>
          <v-icon :color="$store.state.globalColor" dark small>mdi-star</v-icon>
          重置提交到初始状态 <help-msg>
          这个命令的应用场景是：审编人员审核不通过后，用户根据指示又修改了信息。则需要此命令将审核状态从已审核重置为未审核，以此来再次审核。
        </help-msg>
        </v-tab>
        <v-tab>
          <v-icon :color="$store.state.globalColor" dark small>mdi-star</v-icon>
          将审核通过的BioSample重置为未审核<help-msg>
          这个命令的应用场景是：审编人员误操作通过了BioSample的审核，此命令将重置为未审核状态。
        </help-msg>
        </v-tab>

      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>

          <call-back-release></call-back-release>
        </v-tab-item>
        <v-tab-item>

          <call-back-reset-meta-status></call-back-reset-meta-status>

        </v-tab-item>
        <v-tab-item>

          <call-back-reset-bio-sample></call-back-reset-bio-sample>
        </v-tab-item>

      </v-tabs-items>
    </v-sheet>

  </div>
</template>

<script>
import CommonSubHeader from "@/components/commonSubHeader";
import ExpandPanel from "@/components/expandPanel";
import HelpMsg from "@/components/helpMsg";
import CallBackRelease from "@/views/GSA/callBackRelease";
import CallBackResetMetaStatus from "@/views/GSA/callBackResetMetaStatus";
import CallBackResetBioSample from "@/views/GSA/callBackResetBioSample";

export default {
  name: "callBack",
  components: {CallBackResetBioSample, CallBackResetMetaStatus, CallBackRelease, HelpMsg, ExpandPanel, CommonSubHeader},
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
          text: '撤回',
          disabled: true,

        },
      ],
      tabs: 0,

    }
  },


}
</script>

<style scoped>

</style>
<template>
  <div class="text-center">


    <v-snackbar
        v-model="$store.state.msgShow"
        :multi-line="true"
        :color=" $store.state.msgType == 0 ? 'teal' : 'red'"
        dark

       bottom

    >

      <v-icon dark v-show="$store.state.msgType == 0">mdi-check-circle</v-icon>
      <v-icon dark v-show="$store.state.msgType != 0" >mdi-alert-circle-outline</v-icon>

      {{ $store.state.msgText }}
<!--      {{ $store.state.msgType }}-->
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="$store.state.msgShow=false"
        >
          <v-icon small>mdi-close</v-icon>
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "messageBar",
  data(){
    return {
      multiLine: true,
      snackbar: false,
      text: `I'm a multi-line snackbar.`,
    }
  }
}
</script>

<style scoped>

</style>
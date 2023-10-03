<template>
  <v-sheet :color="$store.state.globalColor" class="py-1">
    <v-row no-gutters align="center">

      <v-col cols="12">
        <v-breadcrumbs class="py-0 white--text" :items="breadItems" dark >
          <template #item="{item}">
            <span class="white--text">{{item.text}}</span>
          </template>

        </v-breadcrumbs>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>



  </v-sheet>
</template>

<script>
export default {
  name: "commonSubHeader",
  props:[
      "breadItems",
  ]
}
</script>

<style scoped>

</style>
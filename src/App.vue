<template>
  <v-app style="margin: 0 auto;">
    <header-bar></header-bar>
    <v-sheet
        :color="$store.state.globalColor"
        class="pb-1 "
        elevation="2"
        style="width: 100%;border-top: #e8f5ec 0.5px solid"
    >
      <!--      color="#3c8dbc"-->
      <v-row align="center" no-gutters>
        <v-col
            class=" mx-4  " cols="12"
            lg="2"
            md="12"
            sm="12"
            xl="2"
        >
          <v-img :src="logo" contain height="40"></v-img>

        </v-col>
        <v-col class="text-center" lg="8" md="12" sm="12">

          <v-tabs
              v-model="$store.state.currentTab"
              :background-color="$store.state.globalColor"

              dark
              show-arrows
          >
            <v-tab
                to="/"
            >
              <v-icon>mdi-home</v-icon> &nbsp; 首页
            </v-tab>
            <v-divider vertical></v-divider>
            <v-tab
                to="/home-gsa"
            >
              <v-icon>mdi-record-circle-outline</v-icon> &nbsp; GSA审编
            </v-tab>
            <v-divider vertical></v-divider>
            <v-tab
                to="/home-gsa-human"
            >
              <v-icon>mdi-account-multiple</v-icon> &nbsp; GSA-human 审编
            </v-tab>

          </v-tabs>
        </v-col>
        <v-spacer></v-spacer>

        <v-col
            cols="1"
            lg="1"
            md="1"
            sm="1"
            xl="1"

        >
          <v-sheet :color="$store.state.globalColor" class="float-end text-right  pr-6 ">
            <v-icon class="mdi-spin align--center" color="white" size="16">mdi-cog</v-icon>
            <span class="white--text text-body-2 ">V2.0</span>
          </v-sheet>
        </v-col>

        <v-spacer></v-spacer>
      </v-row>
    </v-sheet>
    <v-sheet height="10"></v-sheet>
    <v-main>

      <router-view/>
    </v-main>
    <v-sheet height="10"></v-sheet>

    <uni-cart></uni-cart>
    <message-bar></message-bar>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>

import FooterBar from "@/components/FooterBar";
import HeaderBar from "@/components/HeaderBar";
import UniCart from "@/views/uniCart";
import MessageBar from "@/components/messageBar";

export default {
  name: 'App',
  components: {MessageBar, UniCart, HeaderBar, FooterBar},
  data: () => ({
    logo: require("@/assets/minismart2logo.png")
  }),
};
</script>

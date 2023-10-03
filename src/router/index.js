import Vue from 'vue'
import VueRouter from 'vue-router'

import homeGSA from "@/views/homeGSA";
import home from "@/views/home";
import homeGSAHuman from "@/views/homeGSAHuman";
import callBackGSA from "@/views/GSA/callBack";
import inquiryGSA from "@/views/GSA/inquiry";
import removeGSA from '@/views/GSA/remove'
import feedbackGSA from "@/views/GSA/feedback";
import changeStatusGSA from "@/views/GSA/changeStatus";
import gsa2XMLGSA from "@/views/GSA/gsa2XML";
import tax2GSA from "@/views/GSA/tax2GSA";
import feedbackGSAHuman from "@/views/GSAHUMAN/feedbackGSAHuman";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/home-gsa',
    name: 'homeGSA',
    component: homeGSA,
    children: [
      {
        path: 'callback',
        name: 'homeGSA-callback',
        component: callBackGSA,
      },
      {
        path: 'inquiry',
        name: 'homeGSA-inquiryGSA',
        component: inquiryGSA
      },
      {
        path: '/',
        name: 'homeGSA-inquiryGSA',
        component: inquiryGSA
      },
      {
        path: 'remove',
        name: 'homeGSA-removeGSA',
        component: removeGSA
      }, {
        path: 'feedback',
        name: 'homeGSA-feedbackGSA',
        component: feedbackGSA
      },
      {
        path: 'change-status',
        name: 'homeGSA-change-status',
        component: changeStatusGSA
      },
      {
        path: 'gsa2xml',
        name: 'homeGSA-gsa2xml',
        component: gsa2XMLGSA
      },
      {
        path: 'tax2gsa',
        name: 'homeGSA-tax2gsa',
        component: tax2GSA
      },
    ]
  },
  {
    path: '/home-gsa-human',
    name: 'homeGSAHuman',
    component: homeGSAHuman,
    children: [
      {
        path: 'feedback-GSAHuman',
        name: 'homeGSA-feedbackGSAHuman',
        component: feedbackGSAHuman
      },
      {
        path: '',
        name: 'homeGSA-feedbackGSAHuman',
        component: feedbackGSAHuman
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouterBuilder } from './router-builder'

export interface VueBuilder {
  router(config: (bd: RouterBuilder) => VueRouter): VueBuilder
  build(): Vue
}

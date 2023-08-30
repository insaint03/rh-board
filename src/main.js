// registration start
(function(w,b,c){
  w[b]=w[b]||[];
  w[c]=w[c]||(function(){ w[b].push(arguments)});
})(window,'_boards','cardboards');

import Vue from 'vue'
import App from '@/App.vue'

Vue.config.productionTip = false

// use vue-material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-icons/iconfont/material-icons.css';

// use Vue-Router
import VueRouter from 'vue-router'
import container from '@/components/Container'

// router
Vue.use(VueRouter);


// start on document ready
import utils from '@/utils';
import setup from '@/setup';

Vue.use(VueMaterial);
Vue.use(utils);
Vue.use(setup);


// async process start
const builder = (async function(selector, base) {
  // sync load libraries
  await (setup.includes||[]).map(async (lib)=>await utils.include(lib));
  // load routes
  let boards = JSON.parse((await utils.gets(setup.datafile)).responseText);
  // set as plugin
  Vue.use({
    install: (vue)=>{
      vue.boards = boards;
      vue.prototype.cardboards = ((path)=>{ return boards[path] });
    },
  });
  // Vue.use({install: (vue) =>{ vue.boards = boards; }});

  // build up routes
  const routes = Object.entries(boards).map(([path, cards])=>({
    path,
    // cards,
    component: container,
  }));
  // register routes
  const router =new VueRouter({
    routes,
    boards,
    setup,
    // mode: 'history',
    base: base || process.env.BASE_URL,
  });


  // start application
  return new Vue({
    boards,
    router,
    render: h=>h(App)
  }).$mount(selector);
});
// aliasing the builder
window._boards.push = builder;

//
window._boards.map((args)=>builder.apply(window, args));
// FILE: main.js

import { createApp } from 'vue'
import store from "./store";
import { Quasar } from 'quasar'

// Import icon libraries

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@fortawesome/fontawesome-free/css/all.css'




// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)


myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
    config: {
      dark: 'true' // or Boolean true/false
    }
  
})

myApp.use(store)

myApp.config.globalProperties.$q.iconSet.tree.icon = "chevron_right"
// console.log(myApp)
// console.log(myApp.config.globalProperties.$q.iconSet.tree)
// myApp.config.globalProperties.$q.iconSet.def.tree.icon = "chevron_right"
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
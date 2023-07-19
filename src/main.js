import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'//1 글로벌 변수 보관함
let emitter = mitt();//2 글로벌 변수 보관함
let app = createApp(App);//3 글로벌 변수 보관함
app.config.globalProperties.emitter = emitter;  //4 글로벌 변수 보관함

import store from './store.js'

app.use(store).mount('#app')


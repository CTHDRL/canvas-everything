import { createApp } from 'vue'
import { canvasEverythingPlugin } from './canvas-everything'
import App from './App.vue'

const app = createApp(App)
app.use(canvasEverythingPlugin)
app.mount('#app')

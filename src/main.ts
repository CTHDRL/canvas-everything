import { createApp } from 'vue'
import { canvasEverything } from './canvas-everything'
import App from './App.vue'

const app = createApp(App)
app.use(canvasEverything)
app.mount('#app')

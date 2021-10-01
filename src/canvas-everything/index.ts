import { createApp, Plugin } from 'vue'
import { CanvasEverything } from './types'

// import components
import MainCanvas from './components/MainCanvas.vue'

export const canvasEverythingPlugin: Plugin = {
    install(app, options: CanvasEverything.PluginOptions = {}) {
        app.component('MainCanvas', MainCanvas)

        if (options.canvas) {
            // TODO: allow passing custom canvas
        } else if (!options.preventCanvasAutoCreate) {
            // create and mount MainCanvas
            let container = typeof options.mountPoint === 'string'
                ? document.querySelector(options.mountPoint)
                : options.mountPoint

            // create our own mount point for the canvas
            if (!container) {
                container = document.createElement('div')
                document.body.appendChild(container)
            }

            // create and attach MainCanvas
            createApp(MainCanvas).mount(container)
        } else {
            // in this case, user is responsible for creating MainCanvas
        }
    }
}
import { createApp, Plugin } from 'vue'
import { setupDom } from './core'

// import components
import MainCanvas from './components/MainCanvas.vue'
import CanvasText from './components/CanvasText.vue'
// import directives
import { directive } from './directive'

export const canvasEverything: Plugin = {
    install(app, options: CanvasEverything.PluginOptions = {}) {
        // setup dom
        setupDom()

        // register components
        app.component('MainCanvas', MainCanvas)
        app.component('CanvasText', CanvasText)
        // register directives
        app.directive('canvas', directive)

        // add canvas
        if (options.canvas) {
            // TODO: allow passing custom canvas?
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
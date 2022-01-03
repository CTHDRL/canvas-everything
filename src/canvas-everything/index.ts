import { createApp, inject, Plugin } from 'vue'
import { setupDom } from './core'
import { canvasNodes, refreshCanvasEverything } from './core'

// import components
import MainCanvas from './components/MainCanvas.vue'
// import directives
import { directive } from './directive'

const canvasNodesKey = 'canvasNodes'
const refreshKey = 'refreshCanvasEverything'

// main plugin
export const canvasEverything: Plugin = {
    install(app, options: CanvasEverything.PluginOptions = {}) {
        // setup dom
        setupDom()

        // register components
        app.component('MainCanvas', MainCanvas)
        // register directives
        app.directive('canvas', directive)

        // add canvas
        if (options.canvas) {
            // TODO: allow passing custom canvas?
        } else if (!options.preventCanvasAutoCreate) {
            // create and mount MainCanvas
            let container =
                typeof options.mountPoint === 'string'
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

        // provide info
        app.provide(canvasNodesKey, canvasNodes)
        app.provide(refreshKey, refreshCanvasEverything)
    },
}

/** Refresh composable */
export const useRefresh = () => {
    return inject<() => void>(refreshKey)!
}

/** Canvas nodes */
export const useCanvasNodes = () => {
    return inject<CanvasEverything.Node[]>(canvasNodesKey)!
}

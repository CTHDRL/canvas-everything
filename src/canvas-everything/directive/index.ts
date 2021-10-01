import { ObjectDirective } from 'vue'
import { v4 as createUuid } from 'uuid'
import { addOrUpdateCanvasEverythingNode, removeCanvasEverythingNode, setHovered } from '../core'
import { CanvasEverything } from '../types'

const canvasEverythingUuidAttribute = 'data-canvas-everything-uuid'

export const directive: ObjectDirective = {
    mounted(el: HTMLElement, binding) {
        const options = (binding.value ?? {}) as CanvasEverything.DirectiveOptions

        // save uuid to el
        const uuid = options.uuid ?? createUuid()
        el.setAttribute(canvasEverythingUuidAttribute, uuid)

        // create canvas dom
        addOrUpdateCanvasEverythingNode({
            element: el,
            focus: false,
            hover: false,
            meta: binding.value?.meta,
            rect: el.getBoundingClientRect(),
            style: window.getComputedStyle(el),
            type: 'CanvasEverything',
            updateOverride: undefined,
            uuid,
            z: 0,
            ...options,
        })

        // hide original el
        el.style.opacity = '0'
    },
    unmounted(el: HTMLElement) {
        const uuid = el.getAttribute(canvasEverythingUuidAttribute)
        if (uuid) {
            removeCanvasEverythingNode(uuid)
        }
    }
}
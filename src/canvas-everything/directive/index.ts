import { ObjectDirective } from 'vue'
import { v4 as createUuid } from 'uuid'
import {
    addOrUpdateCanvasEverythingNode,
    canvasEverythingUuidAttribute,
    intersectionObserver,
    removeCanvasEverythingNode,
} from '../core'

export const directive: ObjectDirective = {
    mounted(el: HTMLElement, binding) {
        const options = (binding.value ??
            {}) as CanvasEverything.DirectiveOptions

        // save uuid to el
        const uuid = options.uuid ?? createUuid()
        el.setAttribute(canvasEverythingUuidAttribute, uuid)

        // create node
        addOrUpdateCanvasEverythingNode({
            element: el,
            focus: false,
            hover: false,
            isIntersecting: false,
            meta: binding.value?.meta,
            rect: el.getBoundingClientRect(),
            refresh() {
                this.rect = this.element.getBoundingClientRect()
                this.style = window.getComputedStyle(this.element)
            },
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
            intersectionObserver.unobserve(el)
        }
    },
}

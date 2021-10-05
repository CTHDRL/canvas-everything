import { ObjectDirective } from 'vue'
import { v4 as createUuid } from 'uuid'
import {
    addOrUpdateCanvasEverythingNode,
    canvasEverythingUuidAttribute,
    intersectionObserver,
    removeCanvasEverythingNode,
} from '../core'
import { getTextNodesIn } from './getTextNodesInElement'

export const directive: ObjectDirective = {
    mounted(el: HTMLElement, binding) {
        const options = (binding.value ?? {}) as CanvasEverything.DirectiveOptions
        const modifiers = (binding.modifiers ?? {}) as CanvasEverything.DirectiveModifiers

        // save uuid to el
        const uuid = options.uuid ?? createUuid()
        el.setAttribute(canvasEverythingUuidAttribute, uuid)

        // hide original el
        el.style.opacity = '0'

        // should we wrap contens in spans?
        const wrapText = modifiers.wrapText || modifiers['wrap-text']

        if (wrapText) {
            // find all text nodes
            const textNodes = getTextNodesIn(el)
            // replace each text node with text split into spans
            const container = document.createElement('div')
            textNodes.forEach(node => {
                const newContent = '<span data-canvas-everything-wrapper><span>' + (node.textContent ?? '').trim().replace(/\s+/g, '</span> <span>') + '</span></span>'
                container.innerHTML = newContent
                node.parentElement?.replaceChild(container.firstChild!, node)
            })

            // add new elements
            const toTrack = Array.from(el.querySelectorAll('*[data-canvas-everything-wrapper] > span'))
            if (toTrack.length) {
                // if we have anything to track, do so here
                toTrack.forEach((item, i) => {
                    const itemUuid = `${uuid}.${i}`
                    item.setAttribute(canvasEverythingUuidAttribute, itemUuid)

                    addOrUpdate(item as HTMLElement, binding, itemUuid, options)
                })
            } else {
                // otherwise, just use the regular element
                addOrUpdate(el as HTMLElement, binding, uuid, options)
            }
        } else {
            addOrUpdate(el as HTMLElement, binding, uuid, options)

        }
    },
    unmounted(el: HTMLElement) {
        const uuid = el.getAttribute(canvasEverythingUuidAttribute)
        if (uuid) {
            removeCanvasEverythingNode(uuid)
            intersectionObserver.unobserve(el)
        }
    }
}


const addOrUpdate = (el: HTMLElement, binding: any, uuid: CanvasEverything.Uuid, options: CanvasEverything.DirectiveOptions) => {
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
}
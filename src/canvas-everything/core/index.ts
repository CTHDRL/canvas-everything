import { intersectionObserver } from "./dom"
export * from './canvasImageUpdate'
export * from './canvasTextUpdate'

export * from './dom'

export let canvasNodes: Array<CanvasEverything.Node> = []
export const canvasEverythingUuidAttribute = 'data-canvas-everything-uuid'

export const refreshCanvasEverything = () => {
    canvasNodes = canvasNodes
        // remove empties...
        .filter(item => item.element)
        // ...then update rect & style
        .map(item => {
            return {
                ...item,
                rect: item.element.getBoundingClientRect(),
                style: window.getComputedStyle(item.element),

            }
        })
}

export const addOrUpdateCanvasEverythingNode = (opts: CanvasEverything.Node) => {
    const idx = canvasNodes.findIndex((v) => v.uuid.startsWith(opts.uuid))
    if (idx !== -1) {
        canvasNodes.splice(idx, 1, opts)
    } else {
        canvasNodes.push(opts)
        intersectionObserver.observe(opts.element)
    }
}

export const removeCanvasEverythingNode = (uuid: string) => {
    const idx = canvasNodes.findIndex((v) => v.uuid.startsWith(uuid))
    if (idx !== -1) {
        intersectionObserver.unobserve(canvasNodes[idx].element)
        canvasNodes.splice(idx, 1)
    }
}

export const setHovered = (uuid: string, hovered: boolean, focus?: boolean) => {
    const found = canvasNodes.find(v => v.uuid.startsWith(uuid))
    if (found) {
        found.hover = hovered
        found.focus = focus ?? hovered
    }
}

export const isCanvasEverythingNode = (target: any): target is CanvasEverything.Node => {
    return target?.uuid && ['CanvasEverything'].includes(target?.type)
}
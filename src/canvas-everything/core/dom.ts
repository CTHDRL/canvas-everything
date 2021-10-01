import { canvasEverythingUuidAttribute, canvasNodes } from './'

export let intersectionObserver: IntersectionObserver

export const setupDom = () => {
    // update node if we focused in or out of a canvas element
    document.addEventListener('focusin', evt => {
        trySetFocusState(evt.target as HTMLElement, true)
    })
    document.addEventListener('focusout', evt => {
        trySetFocusState(evt.target as HTMLElement, false)
    })

    // setup intersection observer
    intersectionObserver = new IntersectionObserver(intersectionObserverCallback)

    // setup scroll listener
    window.addEventListener('scroll', () => {
        canvasNodes
            .filter(n => n.isIntersecting)
            .forEach(n => n.rect = n.element.getBoundingClientRect())
    })
}

/** Try to set a focus state on a CanvasEverything.Node */
const trySetFocusState = (el: HTMLElement, newState: boolean) => {
    const uuid = el.getAttribute(canvasEverythingUuidAttribute)
    const foundNode = canvasNodes.find(n => n.uuid === uuid)

    if (foundNode) {
        foundNode.focus = newState
    }
}

/** Update intersection status for all v-canvas items */
const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
        const found = canvasNodes.find(n => n.uuid === entry.target.getAttribute(canvasEverythingUuidAttribute))
        if (found) {
            found.isIntersecting = entry.isIntersecting
        }
    })
}
<template>
    <canvas
        class="canvas-everything-main-canvas"
        :width="canvasDimensions.x"
        :height="canvasDimensions.y"
        ref="canvas"
        :style="{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            'z-index': -1,
        }"
    />
</template>

<script lang="ts" setup>
import {
    defineProps,
    onBeforeUnmount,
    onMounted,
    ref,
    withDefaults,
    nextTick,
} from 'vue'
import { canvasNodes, isCanvasEverythingNode } from '../core'
import { canvasImageUpdate, canvasTextUpdate } from '../core'

// Props
// ====================
const props = withDefaults(
    defineProps<{
        update?:
            | CanvasEverything.UpdateFunction
            | Array<{ z: number; update: CanvasEverything.UpdateFunction }>
        updateZ?: number
    }>(),
    { update: undefined, updateZ: 0 }
)

// Canvas meta
// ====================
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D
const dpr = ref(1)
const canvasDimensions = ref({ x: 0, y: 0 })

// Canvas setup
// ====================
onMounted(async () => {
    if (!canvas.value || !canvas.value.getContext('2d')) {
        throw new Error('missing canvas')
    }

    // save canvas info
    dpr.value = window.devicePixelRatio
    ctx = canvas.value.getContext('2d')!

    // setup canvas scaling
    ctx.setTransform(dpr.value, 0, 0, dpr.value, 0, 0)

    // add listeners
    window.addEventListener('resize', resizeCanvas)
    // size canvas
    resizeCanvas()
    // size canvas again after a tick
    await nextTick()
    resizeCanvas()

    // kick main update loop
    update()
})

// Resize callback
// ====================
const resizeCanvas = () => {
    canvasDimensions.value = {
        x: window.innerWidth * dpr.value,
        y: window.innerHeight * dpr.value,
    }
}

// Update
// ====================
// switch off on unmount
let alive = true
onBeforeUnmount(() => (alive = false))
// actual update function
const update = () => {
    if (alive) requestAnimationFrame(update)

    // clear canvas
    ctx.clearRect(0, 0, canvasDimensions.value.x, canvasDimensions.value.y)

    // use this to sort by z-index
    const layers: {
        [idx: number]: Array<CanvasEverything.Node | Function>
    } = {}

    // first, get text
    canvasNodes.forEach((node) => {
        if (!layers[node.z]) {
            layers[node.z] = [node]
        } else {
            layers[node.z].push(node)
        }
    })
    // then add update functions if we have an array...
    if (Array.isArray(props.update)) {
        const updateFunctions = props.update
        updateFunctions.forEach((item) => {
            if (!layers[item.z]) {
                layers[item.z] = [item.update]
            } else {
                layers[item.z].push(item.update)
            }
        })
    }
    // ...or regular update function if we have a function
    else if (props.update) {
        const update = props.update as CanvasEverything.UpdateFunction
        if (!layers[props.updateZ]) {
            layers[props.updateZ] = [update]
        } else {
            layers[props.updateZ].push(update)
        }
    }

    // sort z-index in ascending order
    const sortedLayers = Object.keys(layers).map(parseInt)
    sortedLayers.sort((a, b) => a - b)

    // run update functions
    sortedLayers.forEach((z) => {
        const toRun = layers[z]
        toRun.forEach((item) => {
            if (isCanvasEverythingNode(item)) {
                ctx.save()
                if (isCanvasEverythingNode(item)) {
                    if (item.element.tagName.toLowerCase() === 'img') {
                        // handle images
                        canvasImageUpdate(item, ctx, dpr.value)
                    } else {
                        // handle text (fallback)
                        canvasTextUpdate(item, ctx, dpr.value)
                    }
                }
                ctx.restore()
            }
        })
    })
}
</script>

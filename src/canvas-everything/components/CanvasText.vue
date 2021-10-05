<template>
    <span
        class="canvas-text"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        :style="{ opacity: 0 }"
    >
        <span
            v-for="(word, i) in splitText"
            :key="i"
            :data-canvas-everything-uuid="`${uuid}.${i}`"
            :ref="setWordRef"
            >{{ word + (i === splitText.length - 1 ? '' : ' ') }}</span
        ></span
    >
</template>

<script lang="ts" setup>
import { v4 as createUuid } from 'uuid'
import {
    Component,
    computed,
    defineProps,
    nextTick,
    onBeforeUpdate,
    onMounted,
    onUpdated,
    ref,
    withDefaults,
} from 'vue'

// Props
// ====================
const props = withDefaults(
    defineProps<{
        forceHovered?: boolean
        meta?: Record<string, any>
        text: string
        updateOverride?: CanvasEverything.UpdateOverride
        z?: number
    }>(),
    { z: 0 }
)

// Data
// ====================
const uuid = ref<string>()
const hovered = ref(false)
const splitText = computed(() => props.text.split(/\s+/))
// words multiple refs (https://v3.vuejs.org/guide/migration/array-refs.html)
const words = ref<HTMLElement[]>([])
const setWordRef = (el: Element | Component | null) => {
    if (el) words.value.push(el as HTMLElement)
}
onBeforeUpdate(() => (words.value = []))
onUpdated(() => {
    nextTick(refresh)
})

// Mounted
// ====================
onMounted(() => {
    uuid.value = createUuid()
    nextTick(refresh)
})

// Refresh
// ====================
import { addOrUpdateCanvasEverythingNode } from '../core'
const refresh = () => {
    words.value.forEach((word, i) => {
        // const opts: CanvasEverything.Node = {
        //     element: word,
        //     focus: false,
        //     hover: false,
        //     isIntersecting: false,
        //     meta: props.meta ?? {},
        //     rect: word.getBoundingClientRect(),
        //     style: window.getComputedStyle(word),
        //     type: 'CanvasEverything',
        //     updateOverride: props.updateOverride,
        //     uuid: `${uuid.value}.${i}`,
        //     z: props.z,
        // }
        // addOrUpdateCanvasEverythingNode(opts)
    })
}
</script>

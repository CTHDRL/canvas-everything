declare namespace CanvasEverything {
    // NODES
    // ====================
    interface Node {
        element: HTMLElement
        focus: boolean
        hover: boolean
        selection: Selection | undefined
        image?: ImageData
        isIntersecting: boolean
        meta: { [key: string]: any }
        rect: DOMRect
        refresh: () => void
        style: CSSStyleDeclaration
        type: Type
        updateOverride?: UpdateOverride
        uuid: Uuid
        z: number
    }

    interface ImageNode extends Node {
        imageLoaded: boolean
    }

    // OTHER TYPES
    // ====================
    type DirectiveModifiers = {
        formatText?: boolean
        'format-text'?: boolean
    }

    type DirectiveOptions = Partial<Node>

    interface OverrideOptions {
        canvasText: Node
        ctx: CanvasRenderingContext2D
        defaultUpdate: UpdateFunction
    }

    interface PluginOptions {
        canvas?: string | HTMLCanvasElement
        mountPoint?: string | HTMLElement
        preventCanvasAutoCreate?: boolean
    }

    type Type = 'CanvasEverything'

    type UpdateOverride = (opts: OverrideOptions, x: number, y: number) => void

    type UpdateFunction = (item: Node, x: number, y: number) => void

    type Uuid = string
}

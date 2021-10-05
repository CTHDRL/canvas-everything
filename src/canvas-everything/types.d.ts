declare namespace CanvasEverything {
    // NODES
    // ====================
    interface Node {
        element: HTMLElement
        focus: boolean
        hover: boolean
        isIntersecting: boolean
        meta: { [key: string]: any }
        rect: DOMRect
        refresh: () => void
        style: CSSStyleDeclaration
        type: Type
        update?: CustomUpdateFunction
        uuid: Uuid
        z: number
    }

    interface ImageNode extends Node {
        image: ImageData
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
        node: Node
        ctx: CanvasRenderingContext2D
        defaultUpdate: () => void
    }

    interface PluginOptions {
        canvas?: string | HTMLCanvasElement
        mountPoint?: string | HTMLElement
        preventCanvasAutoCreate?: boolean
    }

    type Type = 'CanvasEverything'

    type CustomUpdateFunction =
        (opts: OverrideOptions, x: number, y: number) => void

    type UpdateFunction =
        (item: Node, x: number, y: number) => void

    type Uuid = string
}
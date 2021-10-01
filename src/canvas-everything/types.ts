export declare namespace CanvasEverything {
    interface Node {
        element: HTMLElement
        focus: boolean
        hover: boolean
        meta: { [key: string]: any }
        rect: DOMRect
        style: CSSStyleDeclaration
        type: Type
        updateOverride?: UpdateOverride
        uuid: Uuid
        z: number
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

    type UpdateOverride =
        (opts: OverrideOptions, x: number, y: number) => void

    type UpdateFunction =
        (item: Node, x: number, y: number) => void

    type Uuid = string
}
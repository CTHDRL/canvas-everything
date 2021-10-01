declare namespace CanvasEverything {
    interface Node {
        element: HTMLElement
        focus: boolean
        hover: boolean
        meta: { [key: string]: any }
        rect: DOMRect
        style: CSSStyleDeclaration
        type: Type
        updateOverride?: UpdateOverride
        uuid: string
        z: number
    }

    type DirectiveOptions = Partial<Node>

    interface OverrideOptions {
        canvasText: Node
        ctx: CanvasRenderingContext2D
        defaultUpdate: UpdateFunction
    }

    type UpdateOverride =
        (opts: OverrideOptions, x: number, y: number) => void

    type UpdateFunction =
        (item: Node, x: number, y: number) => void

    type Type = 'CanvasEverything'
}
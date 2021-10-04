export const canvasImageUpdate = (
    node: CanvasEverything.Node,
    ctx: CanvasRenderingContext2D,
    dpr: number) => {

    ctx.drawImage(
        node.element as HTMLImageElement,
        node.rect.left * dpr,
        node.rect.top * dpr,
        node.rect.width * dpr,
        node.rect.height * dpr
    )
}


export const canvasImageUpdate = (
    node: CanvasEverything.ImageNode,
    ctx: CanvasRenderingContext2D,
    dpr: number) => {

    const img = node.element as HTMLImageElement
    if (img.complete) {
        node.imageLoaded = true
        node.refresh()
    } else {
        img.onload = () => {
            node.imageLoaded = true
            node.refresh()
        }
    }

    // draw
    ctx.drawImage(
        img,
        node.rect.left * dpr,
        node.rect.top * dpr,
        node.rect.width * dpr,
        node.rect.height * dpr
    )
}
export const canvasTextUpdate = (
    item: CanvasEverything.Node,
    ctx: CanvasRenderingContext2D,
    dpr: number
) => {
    // ignore if offscreen
    if (!item.isIntersecting) return

    const { element, rect, style, updateOverride } = item
    // update font style
    ctx.textBaseline = 'top'
    ctx.textAlign = 'left'
    const fontSizeFloat = parseFloat(style.fontSize)
    ctx.font = `${style.fontWeight} ${fontSizeFloat * dpr}px ${
        style.fontFamily
    }`
    ctx.fillStyle = style.color

    // calc position
    const x = rect.left * dpr
    const y = rect.top * dpr
    const width = rect.width * dpr
    const height = rect.height * dpr
    const paddingLeft = parseFloat(style.paddingLeft) * dpr
    const paddingTop = parseFloat(style.paddingTop) * dpr

    // draw background
    if (style.backgroundColor) {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = style.backgroundColor
        ctx.fillRect(x, y, width, height)
        ctx.restore()
    }

    // draw selection
    if (item.selection && item.selection.type === 'Range') {
        const { anchorOffset, focusOffset } = item.selection
        const selectedText = element.innerText.slice(anchorOffset, focusOffset)
        const leadingText = element.innerText.slice(0, anchorOffset)
        const { width: selectionWidth } = ctx.measureText(selectedText)
        const { width: leadingWidth } = ctx.measureText(leadingText)

        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#0075ff'
        ctx.fillRect(x + leadingWidth, y, x + selectionWidth, height)
        ctx.fillStyle = 'white'
        ctx.fillText(selectedText, x + leadingWidth, y)
        ctx.restore()
    }

    // draw text
    if (updateOverride) {
        updateOverride(
            {
                ctx,
                canvasText: item,
                defaultUpdate: () =>
                    defaultTextUpdate(
                        element.innerText,
                        x,
                        y,
                        paddingLeft,
                        paddingTop,
                        ctx
                    ),
            },
            x,
            y
        )
    } else {
        defaultTextUpdate(element.innerText, x, y, paddingLeft, paddingTop, ctx)
    }
}
const defaultTextUpdate = (
    text: string,
    x: number,
    y: number,
    paddingLeft: number,
    paddingTop: number,
    ctx: CanvasRenderingContext2D
) => {
    ctx.fillText(text, x + paddingLeft, y + paddingTop)
}

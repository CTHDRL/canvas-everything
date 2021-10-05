export const canvasTextUpdate = (
    item: CanvasEverything.Node,
    ctx: CanvasRenderingContext2D,
    dpr: number
) => {
    // ignore if offscreen
    if (!item.isIntersecting) return

    const { element, rect, style, update: updateOverride } = item
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
    const yAdjusted = y + (height - paddingTop * 2 - fontSizeFloat) / 2

    // draw background
    if (style.backgroundColor) {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = style.backgroundColor
        ctx.fillRect(x, y, width, height)
        ctx.restore()
    }

    // draw border
    if (parseFloat(style.borderWidth) > 0) {
        ctx.save()
        const borderWidth = parseFloat(style.borderWidth)
        ctx.strokeStyle = style.borderColor
        ctx.lineWidth = borderWidth
        ctx.strokeRect(x, y, width, height)
        ctx.restore()
    }

    // draw underline
    if (style.textDecoration.includes('underline')) {
        ctx.save()
        const thickness =
            style.textDecorationThickness === 'auto'
                ? 2
                : parseFloat(style.textDecorationThickness)
        const { width: textWidth, fontBoundingBoxDescent: textHeight } =
            ctx.measureText(element.innerText)
        ctx.lineWidth = thickness * dpr
        ctx.strokeStyle = style.textDecorationColor
        ctx.beginPath()
        ctx.moveTo(x + paddingLeft, yAdjusted + paddingTop + textHeight)
        ctx.lineTo(
            x + paddingLeft + textWidth,
            yAdjusted + paddingTop + textHeight
        )
        ctx.stroke()
        ctx.restore()
    }

    // draw text
    if (updateOverride) {
        updateOverride(
            {
                ctx,
                node: item,
                defaultUpdate: () =>
                    defaultTextUpdate(
                        element.innerText,
                        x,
                        yAdjusted,
                        paddingLeft,
                        paddingTop,
                        ctx
                    ),
            },
            x,
            y
        )
    } else {
        defaultTextUpdate(
            element.innerText,
            x,
            yAdjusted,
            paddingLeft,
            paddingTop,
            ctx
        )
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

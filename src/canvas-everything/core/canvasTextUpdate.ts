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

    // draw selection
    if (item.selection && item.selection.type === 'Range') {
        // TODO handle cases where selection is only part of a word or element
        const anchorEl = item.selection?.anchorNode?.parentElement
        const focusEl = item.selection?.focusNode?.parentElement
        const { anchorOffset, focusOffset } = item.selection
        let selectionColor = 'white'
        let selectionBackground = '#0075ff'
        const selectionStyles = window.getComputedStyle(
            document.body,
            '::selection'
        )
        if (!document.hasFocus()) {
            selectionColor = 'black'
            selectionBackground = '#c8c8c8'
        }
        // TODO assign colors of selection pseudo element if set
        // if (document.querySelector('document.body::selection')) {
        //     selectionColor = selectionStyles.color
        //     selectionBackground = selectionStyles.backgroundColor
        // }

        let selectionWidth = width
        let leadingWidth = 0
        let trailingWidth = 0

        ctx.save()
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = selectionBackground
        ctx.fillRect(x, y + paddingTop, width, height - paddingTop * 2)
        ctx.restore()
        ctx.fillStyle = selectionColor
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

# Canvas Everything

A Vue 3 plugin for drawing the DOM to canvas.

## Works with...

DOM elements: 

-   [x] All text elements
-   [x] Images
-   [ ] Video
-   [ ] Inputs
-   [ ] Buttons

CSS properties:

-   Position
-   Font size/color/family
-   Background color
-   Transitions

## Install

[Vue.js 3.0](https://v3.vuejs.org/) is required for this directive.
`npm i canvas-everything`
or
`yarn add canvas-everything`

## Usage

In your main.js or main.ts file...

```Javascript
import { canvasEverything } from 'canvas-everything'

const app = createApp(App)
app.use(canvasEverything)
```

Then in your Vue component...

```HTML
<h1 v-canvas> Hello World! </h1>

<img src="your-image.jpg" v-canvas>
```

That's it! Each element using the `v-canvas` directive will be cloned to the main canvas.

### Modifiers & Options

By default, `v-canvas` doesn't handle text wrapping or some other CSS properties (`text-align: center`, for example). If your text isn't looking correct, try adding the `format-text` modifier:

```HTML
<p v-canvas.format-text>Lorem ipsum dolor...</p>
```

This will create more accurate text rendering at the cost of some extra DOM manipulation.

A full list of available directive options with their defaults:

```js
{
    meta, // Object - default {} arbitrary key-value data
    updateOverride, // Function - see below
    z, // Number - default 0 - what z-index this should be drawn on on the canvas

    // Available but usually handled internally:
    element, // HTMLElement - default: the attached element. Usually left alone. 
    focus, // boolean - default whether the element is focused
    hover, // boolean - default whether the element is hovered
    image, // ImageData - only used if on an <img>
    imageLoaded, // boolean - only used if on an <img>
    isIntersecting, // boolean - whether the element is in view
    rect, // DOMRect - the element's boundingClientRect
    refresh, // Function - function to run when updating position & style
    style, // CSSStyleDeclaration - the element's computed style
    type, // CanvasEverything.Type - internal marker
    uuid, // CanvasEverything.Uuid - internal identifier - not recommended to change
}
```

### Using Custom Update Functions

`TODO` Documentation for using updateOverride

### Redrawing the canvas

`TODO` Documentation for refreshCanvasEverything

# Canvas Everything

A Vue 3 directive for drawing the DOM to canvas.

## Works with...

-   [x] All text elements
-   [x] Images
-   [ ] Video
-   [ ] Inputs
-   [ ] Buttons

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
```

That's it! Each element using the `v-canvas` directive will be cloned to the main canvas.

### Using Custom Update Functions

`TODO` Documentation for using updateOverride

### Redrawing the canvas

`TODO` Documentation for refreshCanvasEverything

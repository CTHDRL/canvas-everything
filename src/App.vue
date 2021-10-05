<template>
    <main class="canvas-everything-demo">
        <h1>Title</h1>
        <button v-canvas>button</button>
        <p>
            <span class="p1" v-canvas>nonne inventa sunt?</span> Quis est, qui
            non oderit libidinosam, protervam adolescentiam? Verum tamen cum de
            rebus grandioribus dicas, ipsae res verba rapiunt; Quibusnam
            praeteritis? Duo Reges: constructio interrete. Cur deinde Metrodori
            liberos commendas? Se dicere inter honestum et turpe nimium quantum,
            nescio quid inmensum, inter ceteras res nihil omnino interesse.
            Illud dico, ea, quae dicat, praeclare inter se cohaerere. Cur
            igitur, cum de re conveniat, non malumus usitate loqui? Quae cum
            dixisset paulumque institisset, Quid est?
        </p>
        <h2 v-canvas="{ update }">Customizable Update Functions</h2>
        <div class="image-sizer">
            <img src="//placekitten.com/250/250" v-canvas />
        </div>
        <h2>Another Title</h2>
        <div v-canvas.format-text>
            Text
            <p class="test">
                <strong>Lorem ipsum dolor sit amet,</strong> consectetur
                adipiscing elit. Ea, quae dialectici nunc tradunt et docent,
                nonne ab illis instituta sunt aut inventa sunt? Quis est, qui
                non oderit libidinosam, protervam adolescentiam? Verum tamen cum
                de rebus grandioribus dicas, ipsae res verba rapiunt; Quibusnam
                praeteritis? Duo Reges: constructio interrete. Cur deinde
                Metrodori liberos commendas? Se dicere inter honestum et turpe
                nimium quantum, nescio quid inmensum, inter ceteras res nihil
                omnino interesse. Illud dico, ea, quae dicat, praeclare inter se
                cohaerere. Cur igitur, cum de re conveniat, non malumus usitate
                loqui? Quae cum dixisset paulumque institisset, Quid est?
            </p>

            <ul>
                <li>Example</li>
                <li>Second Example</li>
            </ul>
        </div>

        <h2 class="color-title" v-canvas>Color Title</h2>
        <p v-canvas.format-text>
            <strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing
            elit. Ea, quae dialectici nunc tradunt et docent, nonne ab illis
            instituta sunt aut inventa sunt? Quis est, qui non oderit
            libidinosam, protervam adolescentiam? Verum tamen cum de rebus
            grandioribus dicas, ipsae res verba rapiunt; Quibusnam praeteritis?
            Duo Reges: constructio interrete. Cur deinde Metrodori liberos
            commendas? Se dicere inter honestum et turpe nimium quantum, nescio
            quid inmensum, inter ceteras res nihil omnino interesse. Illud dico,
            ea, quae dicat, praeclare inter se cohaerere. Cur igitur, cum de re
            conveniat, non malumus usitate loqui? Quae cum dixisset paulumque
            institisset, Quid est?
        </p>
        <h1 v-canvas.format-text>Title</h1>
    </main>
</template>

<script lang="ts" setup>
import { onMounted, inject } from 'vue'

// refresh on mounted (not needed - just a demo of `refresh` injection)
const refreshAll = inject<() => void>('refreshCanvasEverything')!
onMounted(() => refreshAll())

// custom update function
const update: CanvasEverything.CustomUpdateFunction = (options, x, y) => {
    const { ctx, node } = options
    ctx.save()
    ctx.translate(window.innerWidth, y)
    ctx.rotate(Math.sin(Date.now() * 0.001) * 0.1)
    ctx.textAlign = 'center'
    ctx.fillText(node.element.innerText, 0, 0)
    ctx.restore()
}
</script>

<style lang="scss">
.canvas-everything-demo {
    font-family: sans-serif;
    text-align: center;

    h2 {
        font-weight: 400;
        text-decoration: underline;
    }
    p {
        max-width: 400px;
        margin: 20px auto;
    }
    .p1 {
        background: blue;
    }

    .image-sizer {
        height: 250px;
    }

    .color-title {
        color: #f5f7e3;
        background: #1d748e;
        cursor: pointer;
        display: inline-block;
        transition: all 300ms ease;
        padding: 50px 30px;
        border: 5px solid green;

        &:hover {
            color: #909280;
            background: #155568;
            border-color: red;
        }
    }
}
</style>

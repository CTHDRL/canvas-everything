<template>
    <main class="canvas-everything-demo">
        <h1>Title</h1>
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
        <div class="image-sizer">
            <img src="//placekitten.com/250/250" v-canvas />
        </div>
        <h2 v-canvas>Another Title</h2>
        <p>
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

        <h2 class="color-title" v-canvas>Color Title</h2>
        <p>
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
        <h1>Title</h1>
    </main>
</template>

<style lang="scss">
.canvas-everything-demo {
    font-family: sans-serif;

    h2 {
        font-weight: 400;
    }
    p {
        max-width: 400px;
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

        &:hover {
            color: #909280;
            background: #155568;
        }
    }
}
</style>

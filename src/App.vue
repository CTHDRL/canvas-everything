<template>
    <main class="canvas-everything-demo">
        <h1>Title</h1>
        <p>
            <canvas-text class="p1" text="nonne inventa sunt?" /> Quis est, qui
            non oderit libidinosam, protervam adolescentiam? Verum tamen cum de
            rebus grandioribus dicas, ipsae res verba rapiunt; Quibusnam
            praeteritis? Duo Reges: constructio interrete. Cur deinde Metrodori
            liberos commendas? Se dicere inter honestum et turpe nimium quantum,
            nescio quid inmensum, inter ceteras res nihil omnino interesse.
            Illud dico, ea, quae dicat, praeclare inter se cohaerere. Cur
            igitur, cum de re conveniat, non malumus usitate loqui? Quae cum
            dixisset paulumque institisset, Quid est?
        </p>
        <h2><canvas-text text="Another Title" /></h2>
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
    .p1 span {
        background: blue;
    }

    .color-title {
        color: #f5f7e3;
        background: #1d748e;
        cursor: pointer;
        display: inline;
        transition: all 300ms ease;

        &:hover {
            color: #909280;
            background: #155568;
            /* font-size: 2em; */
        }
    }
}
</style>

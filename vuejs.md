<script setup>
import { reactive } from "vue";
let chro = "";
let state = reactive({
    min: 0,
    secondes: 59,
    cent: 99,
    intervalID: "",

});

function startQuizz() {
    state.intervalID = setInterval(() => {
        if (state.min > -1) {
            state.cent--;
            if (state.cent === 0) {
                state.cent = 99;
                state.secondes--;
            } else if (state.secondes === 0) {
                state.secondes = 60;
                state.min--;
            }
        } else if (state.min <= -1) {
            clearInterval(state.intervalID);
            state.min = 0;
            state.cent = 0;
            state.secondes = 0;
            console.log('clearInterval');
        }
    }, 0, 1);
}

function doubleNum(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}
</script>

<template>
    <!-- <button @click="count++">You clicked me {{ count }} times.</button> -->
    <div class="container">
        <div class="containBtn">
            <button @click="startQuizz">Chrono</button>
        </div>
        <div class="showChrono">
            <span>
                Affiche moi le chrono : {{ doubleNum(state.min) }} : {{ doubleNum(state.secondes) }} : {{
                    doubleNum(state.cent) }}
            </span>
        </div>

    </div>
</template>
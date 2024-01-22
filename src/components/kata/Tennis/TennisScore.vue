<script setup>
import {ref} from "vue";

let scorePlayerOne = ref('love');
let scorePlayerTwo = ref('love');

const addPoint = player => {
  const availablePoints = ['love', '15', '30', '40'];
  let playerScore = player === 1 ? scorePlayerOne : scorePlayerTwo

  let nextIndex = availablePoints.indexOf(playerScore.value) + 1
  playerScore.value = availablePoints[nextIndex]
}

</script>

<template>
  <div>
    <h1>Tennis Kata</h1>
  </div>
</template>

<style scoped>

</style>
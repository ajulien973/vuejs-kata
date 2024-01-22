<script setup>
import {ref} from "vue";

let scorePlayerOne = ref('love');
let scorePlayerTwo = ref('love');

const isDeuce = () => {
  return scorePlayerOne.value === '40' && scorePlayerTwo.value === '40';
}

const isAdvantage = () => {
  return scorePlayerOne.value === 'av' || scorePlayerTwo.value === 'av';
}

const addPoint = player => {
  const availablePoints = ['love', '15', '30', '40', 'av'];
  let playerScore = player === 1 ? scorePlayerOne : scorePlayerTwo

  let nextIndex = availablePoints.indexOf(playerScore.value) + 1
  if (!isDeuce() && playerScore.value === availablePoints[3]) {
    scorePlayerOne.value = availablePoints[0]
    scorePlayerTwo.value = availablePoints[0]
    return;
  }
  if (isDeuce()) {
    playerScore.value = availablePoints[4];
    return;
  }
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
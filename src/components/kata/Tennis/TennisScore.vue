<script setup>
import {ref} from "vue";

let scorePlayerOne = ref('love');
let scorePlayerTwo = ref('love');

const availablePoints = ['love', '15', '30', '40', 'av'];

const isDeuce = () => {
  return scorePlayerOne.value === availablePoints[3] && scorePlayerTwo.value === availablePoints[3];
}

const isAdvantage = () => {
  return scorePlayerOne.value === availablePoints[4] || scorePlayerTwo.value === availablePoints[4];
}

const addPoint = player => {
  let playerScore = player === 1 ? scorePlayerOne : scorePlayerTwo
  let opponentScore = player === 1 ? scorePlayerTwo : scorePlayerOne

  const winningState1 = !isDeuce() && !isAdvantage() && playerScore.value === availablePoints[3]
  const winningState2 = playerScore.value === availablePoints[4]
  if (winningState1 || winningState2) {
    scorePlayerOne.value = availablePoints[0]
    scorePlayerTwo.value = availablePoints[0]
    return;
  }
  if (isDeuce()) {
    playerScore.value = availablePoints[4];
    return;
  }
  if (isAdvantage() && opponentScore.value === availablePoints[4]) {
    opponentScore.value = availablePoints[3];
    return;
  }
  let nextScoreIndex = availablePoints.indexOf(playerScore.value) + 1
  playerScore.value = availablePoints[nextScoreIndex]
}
</script>

<template>
  <div>
    <h1>Tennis Kata Score</h1>
    <p data-test="score">{{ scorePlayerOne }} - {{ scorePlayerTwo }}</p>
    <button data-test="player1-add" @click="addPoint(1)">Add Player 1</button>
    <button data-test="player2-add" @click="addPoint(2)">Add Player 2</button>
  </div>
</template>

<style scoped>

</style>
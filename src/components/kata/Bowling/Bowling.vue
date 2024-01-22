<script setup lang="ts">
  const props = defineProps<{
    game: Array
  }>()

  function isLastTurn(index) {
    return index === props.game.length - 1;
  }
  function score() {
    if (!props.game) return 0;
    const scoreBoard = props.game.map((turn) => {
      const turnTotal = turn[0] + turn[1];
      if (turnTotal < 10) {
        return turnTotal;
      }
      if (turnTotal == 10 && turn[1]) {
        return '/'
      }
      if (turn[0] == 10) {
        return 'X'
      }
    })

    let score = 0;
    scoreBoard.forEach((turn, index) => {
      if (turn === '/') {
        console.log('spare')
        if (isLastTurn(index)) {
          score += 10 + props.game[index][2];
        } else {
          score += 10 + props.game[index + 1][0]
        }
        console.log('turn'+ (index+1) + ' : '  +  score)
      } else if (turn === 'X') {
        console.log('strike')
        if (isLastTurn(index)) {
          score += 10 + props.game[index][1] + props.game[index][2]
        } else if (isLastTurn(index + 1)) {
          score += 10 + props.game[index + 1][0] + props.game[index + 1][1]
        } else {
          score += 10 + props.game[index + 1][0] + props.game[index + 2][0]
        }
        console.log('turn'+ (index+1) + ' : '  +  score)
      }
      else {
        score += turn;
        console.log('turn'+ (index+1) + ' : '  +  score)
      }
    })

    return score
  }
</script>

<template>
  <div>
    <h1>Bowling Kata</h1>
    <div data-test="score">Score : {{ score() }}</div>
  </div>
</template>
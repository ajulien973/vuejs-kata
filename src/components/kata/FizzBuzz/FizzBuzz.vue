<script setup lang="ts">
function fizzbuzz() {
  let list = [];
  for(let i = 1; i <= 100; i++) {
    let value = ''
    if (i.toString().includes('3')) {
      value += 'fizz';
    }
    if (i.toString().includes('5')) {
      value += 'buzz';
    }
    if (i%3 === 0) {
      value += 'fizz';
    }
    if (i%5 === 0) {
      value += 'buzz';
    }
    if (!value) {
      value = i;
    }
    list.push(value);
  }
  return list;
}
</script>

<template>
  <div>
    <h1>FizzBuzz Kata</h1>
    <div>
      <h2>Results</h2>
      <ul data-test="list">
        <li v-for="step in fizzbuzz()">{{ step }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
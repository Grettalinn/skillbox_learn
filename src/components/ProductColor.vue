<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" :value=color>
      <span class="colors__value" v-bind:style="{ backgroundColor: color }"></span>
    </label>
  </li>
</template>

<script>
export default {
  props: ['color'],
};
</script>

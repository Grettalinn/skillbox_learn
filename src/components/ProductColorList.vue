<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :id="color.id" :value="color.id" v-model="computedColor">
        <span class="colors__value" :style="{ backgroundColor: color.code }"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'currentColor'],
  computed: {
    computedColor: {
      get() {
        return this.currentColor;
      },
      set(value) {
        this.$emit('update:currentColor', value);
      },
    },
  },
};
</script>

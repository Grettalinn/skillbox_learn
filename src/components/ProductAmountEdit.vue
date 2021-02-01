<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="amount -= 1">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="amount += 1">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['productAmount'],
  computed: {
    amount: {
      get() {
        return this.productAmount;
      },
      set(value) {
        const lvalue = (value > 0) ? value : 0;
        this.$emit('update:productAmount', lvalue);
      },
    },
  },
};
</script>

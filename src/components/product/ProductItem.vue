<template>
  <ul class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id }}" >
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>
    <ProductColorList :colors="product.colors" :current-color.sync="currentColor"/>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ProductColorList from '@/components/product/ProductColorList.vue';

export default {
  components: { ProductColorList },
  data() {
    return {
      currentColor: this.product.colors[0].id,
    };
  },
  watch: {
    color(value) {
      this.currentColor = value;
    },
  },
  filters: {
    numberFormat,
  },
  props: ['product'],
};
</script>
<style>
.colors--black {
  --border-color: #222;
}
</style>

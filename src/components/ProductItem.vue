<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>
    <ProductColorList :colors="product.colors"/>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductColorList from '@/components/ProductColorList.vue';

export default {
  components: { ProductColorList },
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  props: ['product'],
  computed: {
    checkColor: {
      get() {
        return this.color;
      },
      set(newColor) {
        this.color = newColor;
      },
    },
  },
};
</script>

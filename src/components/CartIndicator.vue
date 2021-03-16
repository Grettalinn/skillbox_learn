<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров" v-if="productsLoading">...</span>
    <span class="header__count" aria-label="Количество товаров" v-else-if="productsLoadingFailed">!!!</span>
    <span class="header__count" aria-label="Количество товаров" v-else> {{ totalCount }} </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      totalCount: 'cartTotalCount',
      productsLoading: 'productsLoading',
      productsLoadingFailed: 'productsLoadingFailed',
    }),
  },
};
</script>

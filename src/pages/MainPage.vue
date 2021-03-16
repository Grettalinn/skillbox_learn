<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{  countProducts | productCountFormat }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="productFilters.filterPriceFrom" :price-to.sync="productFilters.filterPriceTo" :category-id.sync="productFilters.filterCategoryId" :color.sync="productFilters.filterColor"/>
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button @click.prevent="loadProducts">Попробовать еще раз</button></div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import ProductFilter from '@/components/product/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import productCountFormat from '@/helpers/productCountFormat';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  filters: { productCountFormat },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      productFilters: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColor: 0,
      },
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(` ${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.productFilters.filterCategoryId,
            minPrice: this.productFilters.filterPriceFrom,
            maxPrice: this.productFilters.filterPriceTo,
            colorId: this.productFilters.filterColor,
          },
        })
        // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
        // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
        // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 0);
    },
  },
  watch: {
    page: {
      handler: 'loadProducts',
      immediate: true,
    },
    productFilters: {
      handler: 'loadProducts',
      deep: true,
    },
  },
};
</script>

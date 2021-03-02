<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <ProductAmountEdit :product-amount.sync="amount" />

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
    <div v-show="deleteProductFailure">Не удалось удалить товар</div>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ProductAmountEdit from '@/components/ProductAmountEdit.vue';

export default {
  props: ['item'],
  filters: { numberFormat },
  components: { ProductAmountEdit },
  data() {
    return {
      deleteProductFailure: false,
    };
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        return this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    deleteProduct(val) {
      this.deleteProductFailure = false;
      return this.$store.dispatch('deleteCartProduct', val)
        // eslint-disable-next-line no-return-assign
        .catch(() => this.deleteProductFailure = true);
    },
  },

};
</script>

<template>
  <div class="cart__block" v-if="orderItems">
    <ul class="cart__orders">
      <OrderProduct v-for="item in orderItems" :key="item.product.id" :item="item" />
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ itemsTotalCount | productCountFormat }}</b> на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
    <slot/>
  </div>
</template>

<script>
import OrderProduct from '@/components/order/OrderProduct.vue';
import numberFormat from '@/helpers/numberFormat';
import productCountFormat from '@/helpers/productCountFormat';

export default {
  props: ['orderItems', 'itemsTotalCount', 'totalPrice'],
  components: {
    OrderProduct,
  },
  filters: {
    numberFormat,
    productCountFormat,
  },
};
</script>

<style scoped>

</style>

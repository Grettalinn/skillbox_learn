import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    state: {
      cartProducts: [
        { productId: 1, amount: 2 },
      ],
    },
    mutations: {
      addProductToCart(state, { productId, amount }) {
        const itemLoc = state.cartProducts.find((item) => item.productId === productId);
        if (itemLoc) {
          itemLoc.amount += amount.number;
        } else {
          state.cartProducts.push(
            {
              productId,
              amount,
            },
          );
        }
      },
      updateCartProductAmount(state, { productId, amount }) {
        const itemLoc = state.cartProducts.find((item) => item.productId === productId);

        if (itemLoc) {
          if (amount <= 0) {
            itemLoc.amount = 0;
          } else {
            itemLoc.amount = amount.number;
          }
        }
      },
      deleteCartProduct(state, productId) {
        state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
      },
    },
    getters: {
      cartDetailProducts(state) {
        return state.cartProducts.map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId),
        }));
      },
      cartTotalPrice(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      },
      cartTotalCount(state) {
        return state.cartProducts.length;
      },
    },
  },
);

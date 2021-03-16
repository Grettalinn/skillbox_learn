import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);

export default new Vuex.Store(
  {
    state: {
      cartProducts: [],
      userAccessKey: null,
      cartProductsData: [],
      productsLoading: false,
      productsLoadingFailed: false,
      orderInfo: null,
      orderLoading: false,
      orderLoadError: false,
    },
    mutations: {
      updateOrderInfo(state, orderInfo) {
        state.orderInfo = orderInfo;
      },
      resetCart(state) {
        state.cartProducts = [];
        state.cartProductsData = [];
      },
      updateCartProductAmount(state, { productId, amount }) {
        const itemLoc = state.cartProducts.find((item) => item.productId === productId);

        if (itemLoc) {
          itemLoc.amount = (amount > 0) ? amount : 0;
        }
      },
      updateUserAccessKey(state, accessKey) {
        state.userAccessKey = accessKey;
      },
      updateCartProductsData(state, items) {
        state.cartProductsData = items;
      },
      syncCartProducts(state) {
        state.cartProducts = state.cartProductsData.map((item) => ({
          productId: item.product.id,
          amount: item.quantity,
        }));
      },
      deleteCartProduct(state, productId) {
        state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
      },
    },
    getters: {
      orderDetail(state) {
        return state.orderInfo;
      },
      orderTotalCount(state) {
        return state.orderInfo.basket.items.reduce((acc, item) => (item.quantity) + acc, 0);
        // state.orderInfo.basket.items.length;
      },
      cartDetailProducts(state) {
        return state.cartProducts.map((item) => {
          const { product } = state.cartProductsData.find((p) => p.product.id === item.productId);
          return {
            ...item,
            product: {
              ...product,
              image: product.image.file.url,
            },
          };
        });
      },
      cartTotalPrice(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      },
      cartTotalCount(state, getters) {
        return getters.cartDetailProducts.reduce((acc, item) => (item.amount) + acc, 0);
        // state.cartProducts.length;
      },
      productsLoading(state) {
        return state.productsLoading;
      },
      productsLoadingFailed(state) {
        return state.productsLoadingFailed;
      },
      orderLoading(state) {
        return state.orderLoading;
      },
      orderLoadingFailed(state) {
        return state.orderLoadError;
      },
    },
    actions: {
      loadOrderInfo(context, orderId) {
        this.orderLoadError = false;
        this.orderLoading = true;
        this.orderInfo = null;
        return axios
          .get(` ${API_BASE_URL}/api/orders/${orderId}`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateOrderInfo', response.data);
          })
          // eslint-disable-next-line no-return-assign
          .catch((error) => {
            this.orderLoadError = true;
            throw error;
          })
          // eslint-disable-next-line no-return-assign
          .then(() => this.orderLoading = false);
      },
      loadCart(context) {
        // eslint-disable-next-line no-param-reassign
        this.productsLoading = true;
        // eslint-disable-next-line no-param-reassign
        this.productsLoadingFailed = false;
        return axios
          .get(` ${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey);
              context.commit('updateUserAccessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts', response.data.items);
          })
          // eslint-disable-next-line no-return-assign,no-param-reassign
          .catch(() => { this.productsLoadingFailed = true; })
          // eslint-disable-next-line no-return-assign,no-param-reassign
          .then(() => { this.productLoading = false; });
      },
      addProductToCart(context, { productId, amount }) {
        return (new Promise((resolve) => setTimeout(resolve, 0)))
          .then(() => axios
            .post(` ${API_BASE_URL}/api/baskets/products`, {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts', response.data.items);
            }));
      },
      updateCartProductAmount(context, { productId, amount }) {
        context.commit('updateCartProductAmount', { productId, amount });
        if (amount < 1) {
          return;
        }
        // eslint-disable-next-line consistent-return
        return axios
          .put(` ${API_BASE_URL}/api/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          })
          .catch(() => context.commit('syncCartProducts'));
      },
      deleteCartProduct(context, productId) {
        context.commit('deleteCartProduct', { productId });
        // eslint-disable-next-line consistent-return
        return axios
          .delete(` ${API_BASE_URL}/api/baskets/products`, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            },
          })
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          });
      },
    },
  },
);

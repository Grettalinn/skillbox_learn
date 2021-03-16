<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title" v-if="orderDetail">
        Заказ оформлен <span>№ {{ orderDetail.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <div v-if="orderLoading">Загрузка заказа...</div>
      <div v-if="orderLoadingFailed">Произошла ошибка при загрузке заказа. Попробуйте еще раз</div>
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary" v-if="orderDetail">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderDetail.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderDetail.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderDetail.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderDetail.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <OrderProductList v-if="orderDetail" :order-items="orderDetail.basket.items" :items-total-count="orderTotalCount" :total-price="orderDetail.totalPrice">
        </OrderProductList>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderProductList from '@/components/order/OrderProductList.vue';

export default {
  components: { OrderProductList },
  computed: {
    ...mapGetters(['orderDetail', 'orderTotalCount', 'orderLoading', 'orderLoadingFailed']),
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
          return;
        }
        this.$store.dispatch('loadOrderInfo', this.$route.params.id)
          .catch((error) => {
            if (error.response.data.error.code === 0) {
              this.$router.replace({ name: 'notFound' });
            }
          });
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <ul class="colors colors--black">
    <ProductColor v-for="color in colors" :key="color" :color="color"/>
  </ul>
</template>

<script>
import ProductColor from '@/components/ProductColor.vue';

export default {
  components: { ProductColor },
  props: ['colors'],
};
</script>

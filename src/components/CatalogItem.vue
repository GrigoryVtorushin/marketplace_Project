<template>
  <div class="catalog-item">
    <div
        @click="$router.push(`/catalog/${product_data.id}`)"
        style="cursor: pointer"
    >
      <img :src="product_data.image" style="max-width: 200px; max-height: 200px" />
      <p class="catalog-item-title">{{ product_data.title }}</p>
      <p class="catalog-item-rating">{{ product_data.rating.rate }}⭐ ({{product_data.rating.count}} оценок)</p>
      <p class="catalog-item-price">{{ product_data.price }}$</p>
    </div>

    <img
        v-if="!this.cart.includes(product_data)"
        src="@/assets/cart.svg"
        class="catalog-item-add-to-favourite-btn"
        @click="addItemToCart"
    >
    <img
        v-if="this.cart.includes(product_data)"
        src="@/assets/cart1.svg"
        class="catalog-item-add-to-favourite-btn"
        @click="$router.push('/cart')"
    >

    <img v-if="this.favourite.includes(product_data)" src="@/assets/red-heart.svg" class="catalog-item-add-to-favourite-btn" @click="addItemToFavourite(product_data)">
    <img v-if="!this.favourite.includes(product_data)" src="@/assets/gray-heart.svg" class="catalog-item-add-to-favourite-btn" @click="addItemToFavourite(product_data)">

  </div>
</template>

<script>
import ProductPage from "@/pages/ProductPage";
import {mapGetters} from "vuex";

export default {
  components: {
    ProductPage,
  },
  props: {
    product_data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addItemToCart() {
      this.$emit('addItemToCart' ,this.product_data)
    },

    addItemToFavourite() {
      this.$emit('addItemToFavourite' ,this.product_data)
      this.favouriteBtnText = 'В избранном'
    }

  },
  mounted() {
    this.product_data['quantity'] = 1
  },

  computed: {
    ...mapGetters([
        'favourite',
        'cart',
    ])
  }

}
</script>

<style>
.catalog-item{
  width: 250px;
  height: 400px;
  box-shadow: 0 0 8px 0 lightgray;
  padding: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
  border-radius: 10px;

}
.catalog-item:hover{
  box-shadow: 0 0 8px 0 gray;
}
.catalog-item-add-to-favourite-btn{
  margin: 0 30px;
  cursor: pointer;
  max-width: 45px;

}
</style>
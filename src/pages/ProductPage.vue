<template>
  <div class="product-page-header">
    <header>

      <div class="header-body">
        <div class="cart-btn" @click="$router.push('/catalog')">
          Каталог
        </div>
        <div class="cart-btn" @click="$router.push('/favourites')">
          Избранное: {{this.favourite.length}}
        </div>
        <div
            class="cart-btn"
            @click="$router.push('/cart')"
        >Корзина: {{cart.length}}</div>
      </div>
    </header>
  </div>
  <div class="product-page-body">
    <div class="product-image">
      <img :src="products_item.image" style="max-width: 300px">
    </div>
    <div class="product-info">
      <p class="product-title">{{products_item.title}}</p>
      <p class="product-rating">{{ this.products[`${this.$route.params.id - 1}`].rating.rate }}⭐ ({{this.products[`${this.$route.params.id - 1}`].rating.count}})</p>
      <p class="product-price">{{products_item.price}}$</p>
      <div class="product-btns">
        <div
            v-if="!this.cart.includes(products_item)"
            class="add-to-cart-btn"
            @click="addItemToCart(products_item)"
        >
          Добавить в корзину
        </div>
        <div
            v-else
            class="add-to-cart-btn"
            @click="$router.push('/cart')"
        >
          Перейти в корзину
        </div>

        <img v-if="!this.favourite.includes(products_item)" src="@/assets/gray-heart.svg" class="add-to-favourite-btn" @click="addItemToFavourite(products_item)">
        <img v-if="this.favourite.includes(products_item)" src="@/assets/red-heart.svg" class="add-to-favourite-btn" @click="addItemToFavourite(products_item)">
      </div>

    </div>
  </div>
  <div class="product-description">
    <p style="font-size: 20px">Описание:</p>
    {{products_item.description}}
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      products_item: {},
    }
  },

  mounted() {
    this.fetchProducts()
    this.setProductsItem()
    // console.log(this.products_item)
    // console.log(this.$route.params.id)
    // console.log(this.products)
  },

  methods: {
    ...mapActions([
        'fetchProducts',
        'addToCart',
        'addToFavourite'
    ]),

    async setProductsItem() {
      this.products_item = {...this.products[`${this.$route.params.id - 1}`]}
    },

    addItemToCart(data){
      this.addToCart(data)
    },

    addItemToFavourite(data){
      this.addToFavourite(data)
    }


  },

  computed: {
    ...mapGetters([
        'products',
        'cart',
        "favourite"
    ]),

  },

}
</script>

<style>
.product-page-body{
  display: flex;
  align-items: center;

}
.product-title{
  font-size: 30px;
  max-width: 600px;
  flex-wrap: wrap;
}
.add-to-cart-btn{
  border: solid 1px gray;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  background: #ff5941;
  color: white;
  font-size: 28px;
  max-width: 300px;
  margin-left: 80px;

}
.product-price{
  font-size: 30px;

}
.product-image{
  box-shadow: 0 0 8px 0 lightgray;
  padding: 40px;
  margin: 0 auto;

}
.product-info{
  margin: 0 auto;
}
.product-description{
  margin-left: 50px;
  max-width: 700px;
}
.product-rating{
  font-size: 25px;
}
.add-to-favourite-btn{
  max-width: 50px;
  margin-left: 20px;
  cursor: pointer;
}

.product-btns{
  display: flex;

}

</style>
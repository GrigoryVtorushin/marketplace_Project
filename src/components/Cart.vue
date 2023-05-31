<template>
  <div class="catalog-header">
    <header>

      <div class="header-body">
        <input
            class="search-product"
            type="text"
            placeholder="Поиск"
        >
        <div class="favourites-btn" @click="$router.push('/favourites')">Избранное: {{this.favourite.length}}</div>
        <div class="cart-btn" @click="$router.push('/catalog')">Каталог</div>
      </div>
    </header>
  </div>

  <div class="cart" v-if="cart.length">
    <div class="cart-items">
      <div class="cart-items-header">
        <h1>Корзина</h1>
        <button @click="clearCart">Очистить корзину</button>
      </div>

      <cart-item
        v-for="(item, i) in cart"
        :key="item.id"
        :cart_item_data="item"
        @deleteItemFromCart="deleteItemFromCart(i)"
        @increment="increment(i)"
        @decrement="decrement(i)"
      />


    </div>
    <div class="cart-total" v-if="this.cart.length">
      <div>
        <p>Итого: {{getTotalCost}}$</p>
        <div class="place-order-btn">Оформить заказ</div>
      </div>
    </div>
  </div>
  <div style="font-size: 40px" v-else>Ваша корзина пуста!</div>
</template>

<script>
import CartItem from "@/components/CartItem";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {CartItem},

  methods: {
    ...mapActions([
        'deleteFromCart',
        'decrementItem',
        'incrementItem',
        'clearCart'
    ]),
    deleteItemFromCart(index) {
      this.deleteFromCart(index)
    },
    increment(index){
      this.incrementItem(index)
    },
    decrement(index){
      this.decrementItem(index)
    },

  },

  computed: {
    ...mapGetters([
        'cart',
        'favourite'
    ]),

    getTotalCost() {
      let result = [];

      if (this.cart.length){
        for (let i of this.cart) {
          result.push(i.price * i.quantity);
        }
        result = result.reduce((sum, e) => {
          return sum + e;
        })
        return result
      }
      else return 0
    }
  }
}
</script>

<style scoped>
.cart{
  display: flex;
  align-items: center;
}
.cart-items{
  margin: 0 auto;
  margin-right: 20px;
}
.cart-total{
  font-size: 30px;

  margin:0 auto;

}
.place-order-btn{
  border: solid 1px gray;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  background: #ff5941;
  color: white;

}
</style>
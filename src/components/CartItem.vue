<template>
  <div class="cart-item">
    <div class="cart-item-image-title">
    <img
        class="cart-item-image"
        :src="cart_item_data.image"
        @click="$router.push(`/catalog/${cart_item_data.id}`)"
        style="cursor: pointer"
    />
    <div class="cart-item-info">
      <p class="cart-item-title"
          @click="$router.push(`/catalog/${cart_item_data.id}`)"
      >
        {{ cart_item_data.title }}
      </p>

    </div>
    </div>
    <div class="count-price">
    <div class="cart-item-count">
      <p>Кол-во:</p>
      <span>
        <span class="count-button" @click="decrementItem">-</span>
        {{ cart_item_data.quantity }}
        <span class="count-button" @click="incrementItem">+</span>
      </span>
    </div>

    <div>
      <p>{{ cart_item_data.price * cart_item_data.quantity}}$</p>
      <img src="https://www.svgrepo.com/show/506027/trash-2.svg" class="delete-from-cart-btn" @click="deleteFromCart">
      <img v-if="!this.favourite.includes(cart_item_data)" src="@/assets/gray-heart.svg" class="add-to-favourite" @click="addItemToFavourite(cart_item_data)">
      <img v-if="this.favourite.includes(cart_item_data)" src="@/assets/red-heart.svg" class="add-to-favourite" @click="addItemToFavourite(cart_item_data)">
    </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    cart_item_data: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions([
       'addToFavourite'
    ]),

    deleteFromCart() {
      this.$emit('deleteItemFromCart')
    },
    incrementItem() {
      this.$emit('increment')
    },
    decrementItem() {
      this.$emit('decrement')
    },

    addItemToFavourite(data){
      this.addToFavourite(data)
    }
  },
  mounted() {
    if (this.cart_item_data['quantity']) {

    } else {
      this.cart_item_data['quantity'] = 1
    }
  },
  computed: {
    ...mapGetters([
        'favourite'
    ])
  }
}
</script>

<style scoped>
.cart-item{
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 8px 0 lightgray;
  margin: 20px 0;
  max-width: 700px;
  min-height: 150px;
  padding: 0 20px;
  border-radius: 10px;
  align-items: center;
}
.cart-item-image{
  max-width: 100px;
  padding: 10px;
}
.cart-item-info{
  margin-right: 20px;
}
.cart-item-count{
  padding-bottom: 10px;
  width: 150px;
}
.count-button{
  cursor: pointer;
  padding: 3px 10px;
  border: solid 1px lightgray;
  border-radius: 8px;
  margin: 0 5px;

}
.count-button:hover{
  background-color: lightgray;
}
.count-button:active{
  background-color: gray;
}

.delete-from-cart-btn{
  cursor: pointer;
  max-width: 30px;


}
.add-to-favourite{
  cursor: pointer;
  max-width: 30px;
}

.cart-item-title{
  cursor: pointer;
  flex-wrap: wrap;
  max-width: 300px;
  font-size: 14px;

}

.count-price{
  display: flex;
  justify-content: flex-end;
}
.cart-item-image-title{
  display: flex;
  align-items: center;
}
</style>
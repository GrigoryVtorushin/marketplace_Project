<template>
  <div>
    <div class="catalog-header">
      <header>

        <div class="header-body">

          <div
              class="favourites-btn"
              @click="$router.push('/catalog')"
          >
            Каталог</div>
          <div
              class="cart-btn"
              @click="$router.push('/cart')"
          >Корзина: {{cart.length}}</div>
        </div>
      </header>
    </div>
    <h1>Главная страница</h1>
  </div>
</template>

<script lang="ts">
import {mapGetters} from "vuex";

export default {
 data() {
   return{
     searchQuery: '',
   }
 },

  computed: {
   ...mapGetters([
       'cart'
   ])
  }

}
</script>

<style scoped>

</style>
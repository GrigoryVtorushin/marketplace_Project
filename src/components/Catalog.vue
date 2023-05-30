<template>
  <div class="catalog-header">
    <header>

      <div class="header-body">
        <img src="https://www.svgrepo.com/show/511119/search-magnifying-glass.svg" style="max-width: 29px">
        <my-input
            v-model="searchQuery"
            placeholder="Поиск"
        />
        <div
            class="favourites-btn"
            @click="$router.push('/favourites')"
        >
          Избранное: {{this.favourite.length}}</div>
        <div
            class="cart-btn"
            @click="$router.push('/cart')"
        >Корзина: {{cart.length}}</div>
      </div>
    </header>
  </div>
  <h1 style="margin-bottom: 20px">Каталог</h1>

  <div class="catalog">

    <div class="catalog-filters">

      <h2>Цена, $</h2>
      <div class="filter-by-price">
        <div>
          <p>От</p>
          <input
              type="text"
              v-model.number="minPrice"
              @change="setRangeOfPrice"
          >
        </div>
        <div>
          <p>До</p>
          <input
              type="text"
              v-model.number="maxPrice"
              @change="setRangeOfPrice"
          >
        </div>
      </div>

      <h2>Категории:</h2>
      <div class="categories" v-for="category in this.categories">
        <p
            class="category"
            @click="sortByCategories(category)"
        >
          {{ category.name }}
        </p>
      </div>

    </div>
    <div class="catalog-body">
      <my-select
          style="margin-bottom: 20px"
          :selected="selectedSort"
          :options="[{name: 'По возрастанию цены', value: 'price'},
                   {name: 'По убыванию цены', value: 'price'},
                   {name: 'По рейтингу', value: 'rating'},
                   {name: 'По популярности', value: 'rating'},
                   {name: 'По названию', value: 'title'},
                   {name: 'Сбросить', value: 'price'}
                   ]"
          @select="sortProducts"
      />
      <div class="catalog-list">
        <catalog-item
            v-for="product in searchedProducts"
            :key="product.id"
            :product_data="product"
            @addItemToCart="addItemToCart"
            @addItemToFavourite="addItemToFavourite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CatalogItem from "@/components/CatalogItem";
import {mapGetters, mapActions} from "vuex";
import ProductPage from "@/pages/ProductPage";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {
    MyInput,
    MySelect,
    CatalogItem,
    ProductPage
  },

  data() {
    return {
      product: {
        title: '',
        image: '',
        price: '',
        id: '',
        description: '',
        category: '',
        rating: {
          count: 0,
          rate: 0.0,
        }
      },
      selectedCategories: 'Категории',
      sortedProducts: [],
      selectedSort: 'Сортировать по:',
      maxPrice: 1000,
      minPrice: 0,
      searchQuery: '',
      toFavourite: 'Избранное',
      toFavouriteFlag: false,
    }
  },

  computed: {
    ...mapGetters([
      'products',
      'categories',
        'cart',
        'favourite'

    ]),

    filteredProducts() {
      if(this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.products
      }
    },
    searchedProducts() {
      return this.filteredProducts.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

  methods: {
    sortProducts(category) {
      if(category.name === 'По возрастанию цены'){
        this.filteredProducts.sort((a,b) => parseFloat(a.price) - parseFloat(b.price))
        this.selectedSort = category.name
      } else if(category.name === 'По убыванию цены') {
        this.filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        this.selectedSort = category.name
      } else if(category.name === 'По рейтингу') {
        this.filteredProducts.sort((a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate));
        this.selectedSort = category.name
      } else if(category.name === 'По популярности') {
        this.filteredProducts.sort((a, b) => parseFloat(b.rating.count) - parseFloat(a.rating.count));
        this.selectedSort = category.name
      } else if(category.name === 'По названию') {
        this.filteredProducts.sort((a, b) => a.title?.localeCompare(b.title))
        this.selectedSort = category.name
      }
      else {
        this.filteredProducts.sort((a,b) => parseFloat(a.id) - parseFloat(b.id))
        this.selectedSort = 'Сортировать по:';
      }
    },

    ...mapActions([
        'fetchProducts',
        'addToCart',
        'addToFavourite'

    ]),

    sortByCategories(category) {
      let vm = this;
      this.sortedProducts = [...this.products]
      this.sortedProducts = this.sortedProducts.filter(function (item){
        return item.price >= vm.minPrice && item.price <= vm.maxPrice
      })
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(function (e){
          vm.selectedCategories = category.name
          return e.category === category.name
        })
      }
    },

    setRangeOfPrice() {
      if( this.minPrice > this.maxPrice){
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp
      }
      this.sortByCategories()
    },


    addItemToCart(data){
      this.addToCart(data)
    },

    addItemToFavourite(data){
      this.addToFavourite(data)
    }

  },

  mounted() {
    this.fetchProducts()
  }
}
</script>

<style>
.catalog-header {

}
.header-body{
  display: flex;
  justify-content: right;
  padding: 15px;
  align-items: center;
  margin-bottom: 40px;

}
.search-product{
  margin-right: 40px;
}
.favourites-btn{
  margin-right: 40px;
  cursor: pointer;
}
.favourites-btn:hover{
  color: #ff5941;
}
.cart-btn{
  margin-right: 40px;
  cursor: pointer;
}
.cart-btn:hover{
  color: #ff5941;
}
.catalog-list {
  display: flex;
  flex-wrap: wrap;
  
}
.catalog-body{
}
.catalog {
  display: flex;
  justify-content: left;


}
.catalog-filters {
  margin-right: 30px;
}
.categories {

}
.category {
  margin-bottom: auto;
  cursor: pointer;
}
.category:hover{
  color: #ff5941;
}
.filter-by-price{
  display: flex;
}

.filter-by-price input{
  max-width: 60px;
  margin: 0 10px;
}
</style>
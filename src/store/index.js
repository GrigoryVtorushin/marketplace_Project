import { createStore } from 'vuex'
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    products: [],
    categories: [],
    cart:[],
    favourite: [],

  },
  getters: {
    products(state){
      return state.products
    },
    categories(state){
      return state.categories
    },
    cart(state){
      return state.cart
    },
    favourite(state){
      return state.favourite
    },


  },
  mutations: {

    setProducts(state, products) {
      state.products = products
    },

    setCategories(state, products) {
      let a =[];
      state.categories =[{name: 'All categories', value: 'All categories'}]
      for (let product of products){
        if (!a.includes(product.category)){
          a.push(product.category)
          state.categories.push({name: product.category, value: product.category})
        }
      }
    },


    setCart (state, product) {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.map((item) => {
          if (item.id === product.id){
            isProductExists = true;
            item.quantity += 1
          }
        })
        if (!isProductExists){
          state.cart.push(product)
        }
      } else {
        state.cart.push(product)
      }

    },

    setFavourite(state, product) {
      if (state.favourite.length) {
        let isProductExists = false;
        state.favourite.map((item) => {
          if (item.id === product.id){
            isProductExists = true;
            const index = state.favourite.indexOf(item)
            state.favourite.splice(index, 1)
          }
        })
        if (!isProductExists){
          state.favourite.push(product)
        }
      } else {
        state.favourite.push(product)
      }
    },

    removeProduct(state, i) {
      state.cart.splice(i, 1)
    },

    removeAllProducts(state){
      state.cart.splice(0)
    },

    incrementProductInCart (state, index) {
      state.cart[index].quantity++
    },
    decrementProductInCart (state, index) {
      if (state.cart[index].quantity > 1){
        state.cart[index].quantity--
      }
    },
  },
  actions: {
    async fetchProducts({state, commit}) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        commit('setProducts', response.data)
        commit('setCategories', response.data)

      } catch (e) {
        console.log(e)
      }
    },

    addToCart({commit}, product) {
      commit('setCart', product)
    },
    addToFavourite({commit}, product) {
      commit('setFavourite', product)
    },

    incrementItem({commit}, index) {
      commit('incrementProductInCart', index)
    },
    decrementItem({commit}, index) {
      commit('decrementProductInCart', index)
    },
    deleteFromCart({commit}, index){
      commit('removeProduct', index)
    },
    clearCart({commit}){
      commit('removeAllProducts')
    },

  },
  modules: {
  },

  plugins: [createPersistedState()]

})

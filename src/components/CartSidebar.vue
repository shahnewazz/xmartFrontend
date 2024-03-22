<script setup>
import { useCart } from '@/stores'
import { storeToRefs } from 'pinia';

const cart = useCart();
const { cartItems, cartItemsCount, totalPrice, cartTotalItems } = storeToRefs(cart)


const deleteItem = (index) => {
  cart.deleteCartItem(index)
}

const cartDecrement = (index) => {
  cart.decrementCartItem(index)
}

const cartIncrement = (index) => {
  cart.incrementCartItem(index)
}

</script>

<template>
  <div>
    <aside class="cart-sidebar">
      <div class="cart-header">
        <div class="cart-total">
          <i class="fas fa-shopping-basket"></i><span>total item ({{ cartTotalItems }})</span>
        </div>
        <button class="cart-close"><i class="icofont-close"></i></button>
      </div>
      <TransitionGroup name="list" tag="ul" class="cart-list" v-if="cartTotalItems !== 0">


        <li class="cart-item" v-for="(cart, index) in cartItems" :key="cart.id">
          <div class="cart-media">
            <a href="#">
              <img :src="$filters.makeImagePath(cart.thumbnail)" alt="product" /></a>
              <button class="cart-delete" @click.prevent="deleteItem(index)">
              <i class="far fa-trash-alt"></i>
              </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6><a href="product-single.html">{{ cart.name }}</a></h6>
              <p>Unit Price - {{ cart.price }}</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button class="action-minus" title="Quantity Minus" @click.prevent="cartDecrement(index)" :disabled="cart.quantity === 1 ? true: false">
                  <i class="icofont-minus"></i>
                </button>

                <input class="action-input" title="Quantity Number" type="text" name="quantity" :value="cart.quantity" />

                <button class="action-plus" title="Quantity Plus" @click.prevent="cartIncrement(index)">
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>{{$filters.currencySymbol((cart.quantity * cart.price).toFixed(2))}}</h6>
            </div>
          </div>
        </li>

      </TransitionGroup>
      <ul class="cart-list" v-else>
        <li class="cart-item">
          <h4>Cart is empty</h4>
        </li>
      </ul>
      <div class="cart-footer pt-5">

        <router-link :to="{ name: 'checkout.page' }" class="cart-checkout-btn"><span class="checkout-label">Proceed to
            Checkout</span><span class="checkout-price">{{ $filters.currencySymbol(totalPrice) }}</span></router-link>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
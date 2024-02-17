<script setup>
import { RouterLink } from 'vue-router';

 
</script>
 
<template>
    <div>
        <nav class="navbar-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="navbar-content">
              <ul class="navbar-list">
                <li class="navbar-item dropdown">
                  <a class="navbar-link" href="#">home</a>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <a class="navbar-link dropdown-arrow" href="#">Categories</a>

                </li>

                <li class="navbar-item dropdown-megamenu">
                  <RouterLink :to="{name: 'shop.page'}" class="navbar-link">shop</RouterLink>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <RouterLink :to="{name: 'seller.page'}" class="navbar-link">Seller List</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </div>
</template>
 
<style scoped>
 
</style>
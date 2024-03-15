<script setup>
    import {computed} from 'vue'

    const props = defineProps({
        price: {
            type: Number,
            required : true
        },
        discount: {
            type: Number,
        }
    })


    const discountPrice = computed(()=> {
        let price = props.price;
        let discount = props.discount / 100
        let totalPrice = price - (price * discount);

        return totalPrice.toFixed(2)
    })

</script>

<template>
    <div>

        <h6 class="product-price" v-if="props.discount">     
            <del>{{ $filters.currencySymbol(price) }}</del>
            <span>{{ $filters.currencySymbol(discountPrice) }}
                <small></small>
            </span>
        </h6>
        <h6 class="product-price" v-else>
            <span>{{$filters.currencySymbol(price)}}
                <small></small>
            </span>
        </h6>
    </div>
</template>

<style scoped>

</style>
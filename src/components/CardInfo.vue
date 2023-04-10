<template>
    <div class="card-info-container">
        <p class="m-0">
            {{ cardData.cardNumber }}
        </p>
        <p class="m-0">
            {{ cardData.cardHolder }}
        </p>
        <p class="m-0">
            expiration: {{ cardData.cardExpirationDate }}
        </p>
        <p class="m-0">
            cvv: {{ cardData.cardCVV }}
        </p>

        <div class="card-logo-icon">
            <img src="https://cdn.icon-icons.com/icons2/1186/PNG/512/1490135017-visa_82256.png" alt="" v-if="cardData.cardCVV < 555">
            <img src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Master-Card-Blue-icon.png" alt="" v-else>
        </div>
        
        <button class="btn casino-btn remove-btn" @click="$emit('removeCard')" v-if="!noRemovable">
            <img src="https://cdn-icons-png.flaticon.com/512/542/542724.png" alt="">
        </button>
    </div>
</template>

<script>
    export default {
        name: "CardInfo",
        props: ["cardData", "noRemovable"],
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
        },
        watch: {
        }
    }
</script>

<style scoped>
.card-info-container {
    color: white;
    width: 300px;
    border: 1px solid white;
    border-radius: 15px;
    padding: 2rem;
    position: relative;
    background: darkblue;
    box-shadow: 0 5px 5rem 5px black;
}

.card-logo-icon {
    position: absolute;
    right: 25px;
    bottom: 10px;
}

.card-logo-icon > img {
    width: 75px;
}

.remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0 7px 5px 7px;
}

.remove-btn > img {
    width: 20px;
}

.casino-btn {
    background: turquoise;
    transition: 0.5s;
    border: none;
    z-index: 1;
    font-weight: 650;
    color: black !important;
    user-select: none;
}

.casino-btn:hover {
    background: var(--second-color);
}

.casino-btn:active {
    background: var(--second-color) !important;
    opacity: 50%;
}
</style>
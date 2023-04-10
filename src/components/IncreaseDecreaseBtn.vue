<template>
    <div class="btn-container">
        <button class="btn casino-btn add-btn" @click="$emit('increase')" v-if="action == 'increase'" :disabled="isActive">
            <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="">
        </button>
        <button class="btn casino-btn substract-btn" @click="$emit('decrease')" v-else :disabled="isActive">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828901.png" alt="">
        </button>
    </div>
</template>

<script>
    export default {
        name: "IncreaseDecreaseBtn",
        props: ["action", "isActive"],
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
.btn-container > button > img {
    width: 15px;
    margin: 5px 0;
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

.casino-btn:disabled {
    background: turquoise;
    opacity: 25%;
}
</style>
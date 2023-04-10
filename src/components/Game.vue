<template>
    <!-- {{ getPlayers === "" ? "" : fromStoreToObjArr(getPlayers)[0].cards.length }} -->
    <div v-if="players !== ''">
        <div class="score">
            <p>
                {{
                    players[0].score
                }}
            </p>
        </div>
        <button @click="drawCards([0, 1])" :disabled="players[0].score >= 21">DRAW</button>
        <div class="cards-container">
            <img v-for="(card, index) in players[0].cards" :key="index" :src="card.image">
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";

export default {
    name: "Game",
    computed: {
        ...mapGetters(["union", "getPlayers"]),
        players() {
            if(this.getPlayers === "") return "";
            else return this.fromStoreToObjArr(this.getPlayers);
        },
    },
    methods: {
        ...mapMutations(["addPlayer"]),
        ...mapActions(["drawCards"]),
        fromStoreToObjArr(str) {
            if(str !== "") return str.split(this.union).map(s => JSON.parse(s));
        }
    },
    mounted() {
        fetch("https://deckofcardsapi.com/api/deck/ujhv6iu1lgiv/shuffle/");
        this.addPlayer(["John"]);
    },
}
</script>

<style scoped>
    .cards-container > img {
        width: 100px;
    }
</style>
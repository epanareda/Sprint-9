<template>
    <div>
        <div v-if="userMatches.length === 0">
            <div class="no-macthes-container">
                <p>
                    There are no matches registered yet
                </p>
            </div>
        </div>
        <div class="table-container" v-else>
            <div class="sort-element-container">
                <div>
                   <p>
                        Sort by:
                    </p>
                    <select v-model="selectedSortElement">
                        <option value="finished">FINISHED</option>
                        <option value="bet">BET</option>
                        <option value="result">RESULT</option>
                        <option value="outcome">OUTCOME</option>
                        <option value="date">DATE</option>
                    </select> 
                </div>
                <div>
                   <p>
                        Order by:
                    </p>
                    <select v-model="selectedOrderElement">
                        <option value="ascending">ASCENDING</option>
                        <option value="descending">DESCEDNING</option>
                    </select> 
                </div>
            </div>
            <div class="table-header header-background">
                <!-- <div>
                    <p>
                        player id
                    </p>
                </div> -->
                <div class="big-cell no-display-medium-screen">
                    <p>
                        username
                    </p>
                </div>
                <div class="no-display-super-small-screen">
                    <p>
                        finished
                    </p>
                </div>
                <div class="small-cell">
                    <p>
                        bet
                    </p>
                </div>
                <div class="small-cell">
                    <p>
                        result
                    </p>
                </div>
                <div>
                    <p>
                        outcome
                    </p>
                </div>
                <div class="big-cell no-display-small-screen">
                    <p>
                        date
                    </p>
                </div>
            </div>

            <div class="table-row" v-for="(match, index) in sortedUserMatches" :key="index" :class="index%2 === 0 ? 'blue-background' : 'red-background'"
            @click="setModal(match)">
                <!-- <div>
                    <p>
                        {{ match.userID }}
                    </p>
                </div> -->
                <div class="big-cell no-display-medium-screen">
                    <p>
                        {{ match.username }}
                    </p>
                </div>
                <div class="no-display-super-small-screen">
                    <p>
                        {{ match.finish ? "Yes" : "No" }}
                    </p>
                </div>
                <div class="small-cell">
                    <p>
                        {{ match.bet }} €
                    </p>
                </div>
                <div class="small-cell">
                    <p>
                        {{ setResultText(match.result) }}
                    </p>
                </div>
                <div>
                    <p>
                        {{ match.winings }}{{ match.winings === "-" ? "" : " €" }}
                    </p>
                </div>
                <div class="big-cell no-display-small-screen">
                    <p>
                        {{ match.dateString.match(/\d\d \w{3} \d{4} \d\d:\d\d/)[0] }}
                    </p>
                </div>
            </div>
        </div>
        <historic-modal
            :open-modal="openModal" :match-data="matchData"
            @modalOpened="resetOpenModal" @modalClosed="resetModalMatchData"
        />
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import { db } from "@/firebase/index.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import HistoricModal from "@/components/HistoricModal.vue";

export default {
    name: "Historic",
    components: {
        HistoricModal,
    },
    data() {
        return {
            userMatches: [],
            openModal: false,
            matchData: [],
            selectedSortElement: "date",
            selectedOrderElement: "ascending",
        }
    },
    computed: {
        ...mapGetters(["uid", "userData"]),
        sortedUserMatches() {
            switch(this.selectedSortElement) {
                case "finished":
                    if(this.selectedOrderElement === "ascending") return this.userMatches.sort((a, b) => a.finish - b.finish);
                    return this.userMatches.sort((a, b) => b.finish - a.finish);

                case "bet":
                    if(this.selectedOrderElement === "ascending") return this.userMatches.sort((a, b) => Number(a.bet) - Number(b.bet));
                    return this.userMatches.sort((a, b) => Number(b.bet) - Number(a.bet));
                    
                case "result":
                    const correctOrder = ["Player wins", "Player wins with blackjack", "Player loses", "Player loses against blackjack", "It's a tie", "It's a blackjack tie", "-"];
                    if(this.selectedOrderElement === "ascending") return this.userMatches.sort((a, b) => correctOrder.indexOf(a.result) - correctOrder.indexOf(b.result));
                    return this.userMatches.sort((a, b) => correctOrder.indexOf(b.result) - correctOrder.indexOf(a.result));

                case "outcome":
                    if(this.selectedOrderElement === "ascending") return this.userMatches.sort((a, b) => Number(a.winings) - Number(b.winings));
                    return this.userMatches.sort((a, b) => Number(b.winings) - Number(a.winings));
                    
                case "date":
                    if(this.selectedOrderElement === "ascending") return this.userMatches.sort((a, b) => Number(a.date) - Number(b.date));
                    return this.userMatches.sort((a, b) => Number(b.date) - Number(a.date));
                    
            }
        },
    },
    methods: {
        setUserMatches() {
            if(this.uid !== "") {
                getDocs(query(collection(db, "matches"), where("userID", "==", this.uid)))
                    .then(doc => doc.forEach(x => this.userMatches.push(x.data())));
            }
        },
        setResultText(str) {
            if(str.includes("black")) {
                if(str.includes("win")) return "win [B]";
                if(str.includes("lose")) return "lose [B]";
                return "tie [B]";
            }
            if(str.includes("win")) return "win";
            if(str.includes("lose")) return "lose";
            if(str.includes("tie")) return "tie";
            return str;
        },
        setModal(arr) {
            this.openModal = true;
            this.matchData = arr;
        },
        resetOpenModal() {
            this.openModal = false;
        },
        resetModalMatchData() {
            this.matchData = [];
        },
    },
    mounted() {
        this.setUserMatches();
    },
    watch: {
        uid() {
            console.log(this.uid)
            this.setUserMatches();
        },
    }
}
</script>

<style scoped>
.no-macthes-container {
    border: 1px solid rgba(255, 255, 255, 0.5);
    width: 430px;
    text-align: center;
    padding: 3rem 0;
    border-radius: 5px;
    margin: 100px auto;
}

.no-macthes-container > p {
    margin: 0;
    text-transform: uppercase;
    font-weight: bold;
}

.table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
}

.sort-element-container {
    display: flex;
    gap: 15px;
    margin-bottom: 1.5rem;
    justify-content: center;
    align-items: center;
}

.sort-element-container > div {
    display: flex;
    gap: 5px;
}

.sort-element-container > div > p {
    margin: 0;
}

.table-header,
.table-row {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 50px;
}

.table-header > div,
.table-row > div {
    width: 15%;
    text-align: center;
}

.table-header > div > p,
.table-row > div > p {
    margin: 0;
}

.table-header > div {
    font-size: 0.9rem;
    font-weight: bold;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
}

.table-row > div {
    font-size: 0.8rem;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.big-cell {
    width: 22.5% !important;
}

.small-cell {
    width: 12.5% !important;
}

.header-background {
    background: rgba(255, 255, 255, 0.75);
    color: black;
}

.red-background {
    cursor: pointer;
    background: rgba(255, 0, 0, 0.25);
    transition: 0.5s;
}

.blue-background {
    cursor: pointer;
    background: rgba(64, 224, 208, 0.25);
    transition: 0.5s;
}

.red-background:hover {
    background: rgba(255, 0, 0, 0.5);
}

.blue-background:hover {
    background: rgba(64, 224, 208, 0.5);
}

input, select {
    padding: 0.25rem 0.5rem;
    color: var(--main-color);
    background: darkslategray;
    border: 1px solid white;
    border-radius: 5px;
    transition: 0.5s;
}

input:focus,
select:focus {
    border-color: var(--main-color);
    border: 1px solid transparent;
    outline: 5px solid turquoise;
}

@media screen and (max-width: 768px) {
    .no-display-medium-screen {
        display: none !important;
    }

    .table-header > div,
    .table-row > div {
        width: 20%;
    }

    .big-cell {
        width: 30% !important;
    }

    .small-cell {
        width: 15% !important;
    }
}

@media screen and (max-width: 575.5px) {
    .no-macthes-container {
        width: 350px;
        font-size: 0.9rem;
    }

    .sort-element-container {
        flex-direction: column;
    }

    .no-display-small-screen {
        display: none !important;
    }

    .table-header > div,
    .table-row > div {
        width: 25%;
    }

    .big-cell {
        width: 25% !important;
    }

    .small-cell {
        width: 25% !important;
    }
}

@media screen and (max-width: 450px) {
    .no-macthes-container {
        width: 300px;
        font-size: 0.85rem;
    }
    .no-display-super-small-screen {
        display: none !important;
    }

    .table-header > div,
    .table-row > div {
        width: 40%;
    }

    .small-cell {
        width: 30% !important;
    }
}
</style>
<template>
    <div :class="[gameOn ? 'game-container' : '']">
        <div class="game-setup" v-if="!gameOn">
            <div class="title-container">
                <div class="diamond-container">
                    <div class="diamond-tr"></div>
                    <div class="diamond-br"></div>
                    <div class="diamond-bl"></div>
                    <div class="diamond-tl"></div>
                </div>
                <h3>game</h3>
            </div>
            <div>
                <p>
                    To play this game you need to have:
                </p>
                <ul>
                    <li>
                        Your profile completed.
                    </li>
                    <li>
                        Minimum of 2€ on your account.
                    </li>
                </ul>
                <p>
                    <strong>IMPORTANT!</strong> Once you start the game you won’t be able to stop it or leave. If you refresh the page or close the browser you will lose your bet. Rounds are short, play them until the end. Make sure to have internet connection at all moment.
                </p>
            </div>
            <button class="play-btn casino-btn" @click="() => {
                openModal = true
                setBetModal = true
            }">
            <!-- <button class="play-btn casino-btn" @click="setGameOn(true)"> -->
                <img src="https://oneidacasino.net/wp-content/uploads/2020/03/Blackjack.png" alt="">
                <p>Let's play</p>
                <img src="https://oneidacasino.net/wp-content/uploads/2020/03/Blackjack.png" alt="">
            </button>
        </div>
        <div class="board-container" v-else>
            <div class="board" v-if="players !== ''">
                <div class="buttons-container">
                    <button class="btn casino-btn" @click="drawCards([0, 1])" :disabled="players[0].score >= 21 || playerStand">HIT</button>
                    <button class="btn casino-btn" @click="playerStand = true" :disabled="players[0].score >= 21 || playerStand">STAND</button>
                </div>
                <div class="player" dealer="dealer">
                    <div class="player-border-right"></div>
                    <div class="player-border-left"></div>
                    <div class="player-identifyer-container">
                        <p>
                            DEALER
                        </p>
                    </div>
                    <!-- <div class="score">
                        <p>
                            {{
                                players[1].score
                            }}
                        </p>
                    </div> -->
                    <div class="cards-container" :class="[hiddenCard ? 'has-hidden-cards' : '']">
                        <img v-for="(card, index) in players[1].cards" :key="index" :src="index === 1  && hiddenCard ? 'https://images.squarespace-cdn.com/content/v1/5abd8db4620b85fa99f15131/1542340370129-WV43BVUJLUTWL6FRRK52/Card+Back+2.0+-+Poker+Size+-+Red_shw.png' : card.image" :class="[index === 1 && hiddenCard ? 'hidden-card' : '']">
                    </div>
                </div>
                <div class="player">
                    <div class="player-border-right"></div>
                    <div class="player-border-left"></div>
                    <div class="player-identifyer-container">
                        <p>
                            PLAYER
                        </p>
                    </div>
                    <!-- <div class="score">
                        <p>
                            {{
                                players[0].score
                            }}
                        </p>
                    </div> -->
                    <div class="cards-container">
                        <img v-for="(card, index) in players[0].cards" :key="index" :src="card.image">
                    </div>
                </div>
            </div>
        </div>
        <game-modal
            :open-modal="openModal" @resetOpenModal="openModal = false"
            :max-credit="'56'" :set-bet="setBetModal" :bet="bet" @setBet="setBet"
            @startGame="startGame"
            :result-modal="resultModal" :result-msg="resultModalMsg"
            @goBack="goBack" @playAgain="playAgain"
        />
    </div>
    
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";
import GameModal from "@/components/GameModal.vue";

export default {
    name: "Game",
    components: {
        GameModal,
    },
    data() {
        return {
            // Game variables
            playerStand: false,
            interval: "",
            gameOver: false,

            // Modal options
            openModal: false,
            setBetModal: false,
            bet: 0,
            resultModal: false,
            resultModalMsg: "",

        }
    },
    computed: {
        ...mapGetters(["union", "gameOn", "getPlayers"]),
        players() {
            if(this.getPlayers === "") return "";
            else return this.fromStoreToObjArr(this.getPlayers);
        },
        dealersTurn() {
            if(this.players === "") return false;
            if(this.players[0].score === 21 || this.playerStand) return true;
            return false;
        },
        hiddenCard() {
            if(this.players[1].cards.length === 2 && !this.dealersTurn) return true;
            return false;
        }
    },
    methods: {
        ...mapMutations(["setGameOn", "addPlayer", "resetPlayers"]),
        ...mapActions(["drawCards"]),
        resetModalDisplays() {
            this.setBetModal = false;
            this.resultModal = false;
            this.resultModalMsg = "";
        },
        setBet(val) {
            this.bet = val;
        },
        startGame() {
            // Modal variables
            this.openModal = true;
            this.setGameOn(true);
            this.resetModalDisplays();

            // Store variables
            fetch("https://deckofcardsapi.com/api/deck/ujhv6iu1lgiv/shuffle/");
            this.resetPlayers();
            this.addPlayer(["John"]);
            this.addPlayer(["Dealer", true]);
            this.drawCards([0, 2]);
            this.drawCards([1, 2]);

            // Data variables
            this.gameOver = false;
            this.playerStand = false;
        },
        playAgain() {
            this.resultModal = false;
            this.setBetModal = true;
        },
        goBack() {
            this.openModal = true;
            this.setGameOn(false);
            this.resetModalDisplays();
        },
        fromStoreToObjArr(str) {
            if(str !== "") return str.split(this.union).map(s => JSON.parse(s));
        },
        dealersGame() {
            if(this.players[1].score >= 17 ||
                this.players[0].score === 21 && this.players[0].cards.length === 2) this.gameOver = true;
            else {
                let interval = setInterval(() => {
                    this.drawCards([1, 1]);
                }, 1000);
                this.interval = interval;
            }
        },
        results() {
            // Over 21 points scenarios
            if(this.players[0].score > 21) {
                this.resultModalMsg = "Player loses";
            } else if(this.players[1].score > 21) {
                this.resultModalMsg = "Player wins";
            }
            // Blackjack scenarios
            else if(this.players[0].score === 21 && this.players[0].cards.length == 2 ||
                    this.players[1].score === 21 && this.players[1].cards.length == 2) {
                if(this.players[0].score > this.players[1].score) {
                    this.resultModalMsg = "Player wins with blackjack";
                } else if(this.players[0].score < this.players[1].score) {
                    this.resultModalMsg = "Player loses against blackjack";
                } else if(this.players[0].score === this.players[1].score) {
                    if(this.players[1].cards.length > 2) {
                        this.resultModalMsg = "Player wins with blackjack";
                    } else if(this.players[0].cards.length > 2) {
                        this.resultModalMsg = "Player loses against blackjack";
                    } else {
                        this.resultModalMsg = "It's a blackjack tie";
                    }
                }
            }
            // Stand scenarios
            else if(this.players[0].score > this.players[1].score) {
                this.resultModalMsg = "Player wins";
            } else if(this.players[0].score < this.players[1].score) {
                this.resultModalMsg = "Player loses";
            } else if(this.players[0].score === this.players[1].score) {
                this.resultModalMsg = "It's a tie";
            }
            // Store
            // UPDATE CREDIT IF WON OR TIE
            // 
            // Modal
            this.resultModal = true;
            this.openModal = true;
        }
    },
    mounted() {
        
    },
    watch: {
        dealersTurn(val) {
            // console.log(val);
            if(val) this.dealersGame();
        },
        players(val) {
            if(val[0].score > 21) {
                this.gameOver = true;
            };
            if(val[1].score >= 17 && this.dealersTurn) {
                clearInterval(this.interval);
                this.gameOver = true;
            };
        },
        gameOver(val) {
            if(val === true) this.results();
        }
    }
}
</script>

<style scoped>
.play-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 15px;
    margin: 2rem auto;
}

.play-btn > p {
    margin: 0;
}

.play-btn > img {
    width: 100px;
}

.game-container {
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: table;
}

.board-container {
    display: table-cell;
    vertical-align: middle;
}

.board {
    position: relative;
    background-image: linear-gradient(rgb(53, 21, 0), rgb(165, 77, 42), rgb(123, 55, 0));
    margin: 0 -5rem;
    padding: 5rem 10rem;
    border-radius: 500px;
    box-shadow: 0px 10px 50px 15px rgba(125, 125, 125, 0.75);
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.buttons-container {
    position: fixed;
    top: calc(100% - 50px);
    right: calc(50% - 150px);
    width: 300px;
    display: flex;
    justify-content: space-between;
    z-index: 3;
}

.buttons-container > button {
    width: 145px;
    border-radius: 5px;
    box-shadow: 0 0 0.5rem 0.25rem black;
}

.player {
    position: relative;
    padding: 1.75rem;
    border: 1px solid var(--main-color);
    border-top: none;
    border-radius: 5px;
}

.player-border-right {
    position: absolute;
    top: 0;
    right: 0;
    height: 100px;
    width: calc(50% - 75px);
    padding: 1.75rem;
    border-top: 1px solid var(--main-color);
    border-radius: 5px;
    border-top-left-radius: 0;
}

.player-border-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 100px;
    width: calc(50% - 75px);
    padding: 1.75rem;
    border-top: 1px solid var(--main-color);
    border-radius: 5px;
    border-top-right-radius: 0;
}

.player-identifyer-container {
    position: absolute;
    top: -1.25rem;
    left: calc(50% - 40px);
    text-align: cetner;
}

.player-identifyer-container > p {
    margin: 0;
    color: var(--main-color);
    font-size: 1.5rem;
}

.cards-container {
    --card-width: 100px;
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
}

.cards-container > img {
    width: var(--card-width);
}

.hidden-card {
    margin-top: calc(var(--card-width) * -0.115);
    margin-bottom: calc(var(--card-width) * -0.1475);
    margin-left: calc(var(--card-width) * -0.12);
    width: calc(var(--card-width) * 1.275) !important;
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

@media screen and (max-width: 1600px) {
    .board {
        margin: auto -15rem;
    }
}

@media screen and (max-width: 1200px) {
    .board {
        margin: auto -5rem;
    }

    .cards-container {
        --card-width: 75px;
    }
}

@media screen and (max-width: 992px) {
    .board {
        margin: auto 0rem;
    }

    .cards-container {
        --card-width: 60px;
    }
}

@media screen and (max-width: 768px) {
    .board {
        border-radius: 50px;
        padding: 4rem 2rem;
    }
}

@media screen and (max-width: 576px) {
    .cards-container {
        --card-width: 50px;
    }

    .play-btn > img {
        width: 75px;
    }
}

@media screen and (max-width: 450px) {
    .board {
        padding: 2rem 1rem;
        margin: 0 -1rem;
    }
}
</style>
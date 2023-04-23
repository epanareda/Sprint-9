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

            <button class="btn play-btn casino-btn" @click="() => {
                openModal = true
                setBetModal = true
            }" :class="[(userData.credit >= 2 && userData.state === 'completed') ? '' : 'casino-btn-disabled']">
                <img src="https://oneidacasino.net/wp-content/uploads/2020/03/Blackjack.png" alt="">
                <p>Let's play</p>
                <img src="https://oneidacasino.net/wp-content/uploads/2020/03/Blackjack.png" alt="">
            </button>
        </div>
        <div class="board-container" v-else>
            <div class="board" v-if="players !== ''">
                <div class="game-info">
                    <p>
                        Credit: {{ userData.credit }} €
                    </p>
                    <p>
                        {{ openModal ? "" : "Bet: " + bet + "€"}}
                    </p>
                </div>
                <div class="buttons-container">
                    <button class="btn casino-btn" @click="drawCards([0, 1])" :class="[(players[0].score >= 21 || playerStand) ? 'casino-btn-disabled' : '']">HIT</button>
                    <button class="btn casino-btn" @click="playerStand = true" :class="[(players[0].score >= 21 || playerStand) ? 'casino-btn-disabled' : '']">STAND</button>
                </div>
                <div class="player" dealer="dealer">
                    <div class="player-border-right"></div>
                    <div class="player-border-left"></div>
                    <div class="player-identifyer-container">
                        <p>
                            DEALER
                        </p>
                    </div>
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
                    <div class="cards-container">
                        <img v-for="(card, index) in players[0].cards" :key="index" :src="card.image">
                    </div>
                </div>
            </div>
        </div>
        <game-modal
            :open-modal="openModal" :closeModal="closeModal" @modalOpened="closeModal = false" @modalClosed="openModal = false"
            :max-credit="userData.credit" :set-bet="setBetModal" :bet="bet" @setBet="setBet"
            @startGame="startGame" :isRegame="isRegame"
            :result-modal="resultModal" :result-msg="resultModalMsg" :reward="reward" :noCreditModal="noCreditModal"
            @goBack="goBack" @playAgain="playAgain"
        />
    </div>
    
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";
import GameModal from "@/components/GameModal.vue";
import { db } from "@/firebase/index.js";
import { doc, collection, getDoc, updateDoc, addDoc } from "firebase/firestore";

export default {
    name: "Game",
    components: {
        GameModal,
    },
    data() {
        return {
            // Game variables
            matchID: "",
            playerStand: false,
            interval: "",
            gameOver: false,
            reward: 0,

            // Modal options
            openModal: false,
            closeModal: false,
            setBetModal: false,
            bet: 2,
            isRegame: false,
            resultModal: false,
            resultModalMsg: "",
            noCreditModal: false,
        }
    },
    computed: {
        ...mapGetters(["union", "uid", "userData", "gameOn", "getPlayers"]),
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
        ...mapMutations(["setUserData", "setGameOn", "addPlayer", "resetPlayers"]),
        ...mapActions(["getNewDeck", "shuffleDeck", "drawCards"]),
        setStoreUserData() {
            if(this.uid !== "") {
                getDoc(doc(collection(db, "users"), this.uid))
                    .then(data => this.setUserData(data.data()));
            }
        },
        resetModalDisplays() {
            this.setBetModal = false;
            this.resultModal = false;
            this.resultModalMsg = "";
        },
        setBet(val) {
            this.bet = Number(val);
        },
        startGame() {
            // Update user data
            updateDoc(doc(collection(db, "users"), this.uid), {
                credit: Number(this.userData.credit) - Number(this.bet)
            })
                .then(_ => {
                    this.setStoreUserData();
                });

            // Create match data
            addDoc(collection(db, "matches"), {
                userID: this.uid,
                username: this.userData.username,
                bet: this.bet,
                finish: false,
                result: "-",
                winings: "-",
                date: Date.now(),
                dateString: (new Date).toUTCString(),
            })
                .then(doc => this.matchID = doc.id);

            // Modal variables
            this.closeModal = true;
            this.setGameOn(true);
            this.resetModalDisplays();
            this.reward = 0,

            // Store variables
            this.shuffleDeck();
            this.resetPlayers();
            this.addPlayer(["John"]);
            this.addPlayer(["Dealer", true]);
            setTimeout(() => this.drawCards([0, 2]), 500);
            setTimeout(() => this.drawCards([1, 2]), 1000);

            // Data variables
            this.gameOver = false;
            this.playerStand = false;
        },
        playAgain() {
            this.isRegame = true;
            this.resultModal = false;
            this.setBetModal = true;
        },
        goBack() {
            this.isRegame = false;
            this.closeModal = true;
            this.setGameOn(false);
            this.resetModalDisplays();
        },
        fromStoreToObjArr(str) {
            if(str !== "") return str.split(this.union).map(s => JSON.parse(s));
        },
        dealersGame() {
            let interval = setInterval(() => {
                if(this.players[1].score < 17) this.drawCards([1, 1]);
            }, 1000);
            this.interval = interval;
        },
        results() {
            // Over 21 points scenarios
            if(this.players[0].score > 21) {
                this.resultModalMsg = "Player loses";
            } else if(this.players[1].score > 21) {
                this.resultModalMsg = "Player wins";
                this.reward = this.bet * 2;
            }
            // Blackjack scenarios
            else if(this.players[0].score === 21 && this.players[0].cards.length == 2 ||
                    this.players[1].score === 21 && this.players[1].cards.length == 2) {
                if(this.players[0].score > this.players[1].score) {
                    this.resultModalMsg = "Player wins with blackjack";
                    this.reward = this.bet * 2.5;
                } else if(this.players[0].score < this.players[1].score) {
                    this.resultModalMsg = "Player loses against blackjack";
                } else if(this.players[0].score === this.players[1].score) {
                    if(this.players[1].cards.length > 2) {
                        this.resultModalMsg = "Player wins with blackjack";
                        this.reward = this.bet * 2.5;
                    } else if(this.players[0].cards.length > 2) {
                        this.resultModalMsg = "Player loses against blackjack";
                    } else {
                        this.resultModalMsg = "It's a blackjack tie";
                        this.reward = this.bet;
                    }
                }
            }
            // Stand scenarios
            else if(this.players[0].score > this.players[1].score) {
                this.resultModalMsg = "Player wins";
                this.reward = this.bet * 2;
            } else if(this.players[0].score < this.players[1].score) {
                this.resultModalMsg = "Player loses";
            } else if(this.players[0].score === this.players[1].score) {
                this.resultModalMsg = "It's a tie";
                this.reward = this.bet;
            }
            // this.resultModalMsg = "Player wins with blackjack";
            // this.reward = this.bet * 2.5;

            // Store
            if(this.reward !== 0) {
                updateDoc(doc(collection(db, "users"), this.uid), {
                    credit: Number(this.userData.credit) + this.reward
                })
                    .then(_ => {
                        this.setStoreUserData();
                    });
            };

            // Update match data
            updateDoc(doc(collection(db, "matches"), this.matchID), {
                finish: true,
                result: this.resultModalMsg,
                winings: this.reward - this.bet,
            });

            // Modal
            this.bet = 2;
            this.resultModal = true;
            this.openModal = true;
        }
    },
    mounted() {
        this.getNewDeck();
    },
    watch: {
        dealersTurn(val) {
            // console.log(val);
            if(val && !this.gameOver) this.dealersGame();
            if(this.players[1].score >= 17) this.gameOver = true;
        },
        players(val) {
            if(!this.gameOver) {
                // console.log("score: " + val[1].score)
                // console.log("turn: " + this.dealersTurn)
                if(val[0].score > 21) {
                    this.gameOver = true;
                };
                if(val[1].score >= 17 && this.dealersTurn) {
                    clearInterval(this.interval);
                    this.gameOver = true;
                };
            };
        },
        gameOver(val) {
            if(val === true) {
                clearInterval(this.interval);
                this.results()
            };
        },
        userData(val) {
            if(val.credit < 2) this.noCreditModal = true;
            else this.noCreditModal = false;
        },
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
    font-size: 1.2rem;
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

.game-info {
    position: fixed;
    top: 30px;
    left: 30px;
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

.casino-btn-disabled,
.casino-btn-disabled:hover,
.casino-btn-disabled:active {
    pointer-events: none;
    background: turquoise !important;
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

    .play-btn {
        font-size: 1.1rem;
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
    

    .game-info {
        top: 15px;
        left: 15px;
    }
}
</style>
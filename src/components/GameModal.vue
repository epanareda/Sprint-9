<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" id="modal-btn" class="none-display" data-bs-toggle="modal" data-bs-target="#gameModal"></button>
        <!-- Modal -->
        <div class="modal fade" id="gameModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-position">
                <div class="modal-content modal-container">
                    <button id="modal-close-btn" type="button" class="btn-close btn-close-white none-display" data-bs-dismiss="modal" aria-label="Close" @click="$emit('modalClosed')"></button>
                    
                    <div v-if="setBet">
                        <!-- Bet modal -->
                        <div v-if="!noCreditModal">
                            <div class="modal-header">
                                <div class="modal-title-container">
                                    <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                    <h1 class="modal-title modal-title-style fs-5" id="gameModalLabel">
                                        Set your bet
                                    </h1>
                                </div>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="$emit('modalClosed')" v-if="!isRegame"></button>
                            </div>
                            <div class="modal-body">
                                <p class="modal-p modal-info">
                                    Chose the bet you will put for the blackjack game you are about to play (2-500€ or your max credit).
                                </p>
                                <div class="bet-input-container modal-input">
                                    <increase-decrease-btn action="decrease" :isActive="credit > 2 ? false : true" @decrease="credit--"/>
                                    <input type="text" v-model="credit">
                                    <increase-decrease-btn action="increase" :isActive="Number(credit) < Number(maxCredit) ? false : true" @increase="credit++"/>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn casino-btn" @click="() => {
                                    $emit('setBet', credit);
                                    $emit('startGame');
                                }">Start game</button>
                            </div>
                        </div>

                        <!-- No credit modal -->
                        <div v-else>
                            <div class="modal-body result-container">
                                <p class="modal-p">
                                    Your current credit is less than 2€, please add some on your profile to continue playing.
                                </p>
                            </div>
                            <div class="modal-footer result-footer-btn-container">
                                <button type="button" class="btn casino-btn" @click="$emit('goBack')">Go back</button>
                            </div>
                        </div>
                    </div>

                    <!-- Result modal -->
                    <div  v-if="resultModal">
                        <div class="modal-body result-container">
                            <p class="modal-p">
                                {{ resultMsg }}.
                            </p>
                            <p class="modal-p" v-if="resultMsg.includes('win')">
                                You won {{ reward }}€.
                            </p>
                            <p class="modal-p" v-else-if="resultMsg.includes('lose')">
                                You lost your bet.
                            </p>
                            <p class="modal-p" v-else>
                                Your bet of {{ reward }}€ is returned to you.
                            </p>
                        </div>
                        <div class="modal-footer result-footer-btn-container">
                            <button type="button" class="btn casino-btn" @click="$emit('goBack')">Go back</button>
                            <button type="button" class="btn casino-btn" @click="$emit('playAgain')">Play again</button>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IncreaseDecreaseBtn from '@/components/IncreaseDecreaseBtn.vue';

export default {
    name: "GameModal",
    components: {
        IncreaseDecreaseBtn,
    },
    props: ["openModal", "closeModal", "maxCredit", "setBet", "bet", "isRegame", "resultModal", "resultMsg", "reward", "noCreditModal"],
    data() {
        return {
            credit: this.bet,
        }
    },
    watch: {
        openModal(val) {
            if(val === true) {
                const btn = document.querySelector("#modal-btn");
                btn.classList.remove("none-display");
                btn.click();
                btn.classList.add("none-display");
                this.$emit("modalOpened");
            }
        },
        closeModal(val) {
            if(val === true) {
                const btn = document.querySelector("#modal-close-btn");
                btn.classList.remove("none-display");
                btn.click();
                btn.classList.add("none-display");
                this.$emit("modalClosed");
            }
        },
        credit(val) {
            let credit = String(val).replace(/[^\d]|^0[^\d]|^0/, "");
            if(Number(credit) > Number(this.maxCredit)) credit = String(this.maxCredit);
            if(Number(credit) > 500) credit = String(500);
            if(credit === "" || credit < 2) credit = "2";
            this.credit = credit;
        },
        bet(val) {
            this.credit = val;
        },
    }
}
</script>

<style scoped>
.none-display {
    display: none;
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

.modal-position {
    margin-top: 50px;
}

.modal-container {
    background-image: linear-gradient(rgba(0, 25, 0) 10%, rgb(0, 60, 0) 60%);
    border: 1px solid white;
    box-shadow: 0 10px 2rem 0.5rem rgba(255, 255, 255, 0.5);
}

.modal-title-container {
    display: flex;
    align-items: center;
}

.modal-title-container > img {
    width: 35px;
    margin-right: 10px;
}

.modal-border-eraser {
    border: none;
}

.modal-p {
    margin: 0;
    margin-bottom: 0.25rem;
}

.modal-info {
    font-size: 1rem;
    opacity: 90%;
}

.modal-input {
    margin-bottom: 1.5rem;
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
    background: turquoise !important;
    opacity: 50%;
}

.bet-input-container {
    margin-top: 1.5rem;
    display: flex;
}

.bet-input-container > input {
    margin: 0 5px;
    width: 175px;
}

.result-container {
    text-align: center;
    padding: 1.5rem;
}

@media screen and (max-width: 450px) {
    .half-top-border-left {
        width: 10px;
    }

    .modal-title-style {
        font-size: 1rem !important;
    }

    .modal-p,
    input {
        font-size: 0.85rem;
    }

    .modal-info {
        font-size: 0.8rem;
        opacity: 90%;
    }
}
</style>
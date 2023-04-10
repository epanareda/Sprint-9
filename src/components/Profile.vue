<template>
    <div>
        <div class="title-container mb-3">
            <div class="diamond-container">
                <div class="diamond-tr"></div>
                <div class="diamond-br"></div>
                <div class="diamond-bl"></div>
                <div class="diamond-tl"></div>
            </div>
            <h3>profile</h3>
        </div>

        <div v-if="userData !== ''">
            
            <div class="whole-data-container">
                <div class="section-container personal-user-container">
                    <div class="half-top-border-right"></div>
                    <div class="half-top-border-left"></div>
                    <div class="section-title-container">
                        <p>
                            information
                        </p>
                    </div>
                    <div class="info-element-container">
                        <p>
                            <span>name:</span><br>{{ userData.name }}
                        </p>
                    </div>
                    <div class="info-element-container">
                        <p>
                            <span>lastname:</span><br>{{ userData.lastname }}
                        </p>
                    </div>
                    <div class="info-element-container">
                        <p>
                            <span>username:</span><br>{{ userData.username }}
                        </p>
                    </div>
                    <!-- User personal data -->
                    <button  type="button" class="btn casino-btn" data-bs-toggle="modal" data-bs-target="#userDataModal" @click="setEditingValues">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Edit_Notepad_Icon.svg/2048px-Edit_Notepad_Icon.svg.png" alt="">
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="userDataModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userDataModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-position">
                            <div class="modal-content modal-container">
                                <div class="modal-header">
                                    <div class="modal-title-container">
                                        <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                        <h1 class="modal-title modal-title-style fs-5" id="userDataModalLabel">
                                            Edit user's information
                                        </h1>
                                    </div>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form class="modal-body" @submit.prevent>
                                    <p class="modal-p">
                                        name
                                    </p>
                                    <input class="modal-input" type="text" placeholder="JOHN" v-model="name">
                                    <p class="modal-p">
                                        lastname
                                    </p>
                                    <input class="modal-input" type="text" placeholder="SMITH" v-model="lastname">
                                    <p class="modal-p">
                                        username
                                    </p>
                                    <input class="modal-input" type="text" placeholder="johnny85" v-model="username">
                                </form>
                                <div class="modal-footer">
                                    <button type="button" class="btn casino-btn" @click="updatePersonalData">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Cards data -->
                <div class="section-container cards-user-container">
                    <div class="half-top-border-right half-top-border-right-size-small"></div>
                    <div class="half-top-border-left"></div>
                    <div class="section-title-container">
                        <p>
                            cards
                        </p>
                    </div>
                    <div class="no-cards-container" v-if="userData.cards.length === 0">
                        There are no cards yet
                    </div>
                    <div class="card-list-container">
                        <card-info v-for="(card, index) in userData.cards" :key="index" :cardData="card" :noRemovable="userData.cards.length === 1" @removeCard="removeCardToUserData(card)" />
                    </div>
                    <button v-if="userData.cards.length < 5" type="button" class="btn casino-btn" data-bs-toggle="modal" data-bs-target="#addCardModal" @click="resetCardFormValues">
                        <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="">
                        Add card
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="addCardModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCardModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-position">
                            <div class="modal-content modal-container">
                                <div class="modal-header">
                                    <div class="modal-title-container">
                                        <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                        <h1 class="modal-title modal-title-style fs-5" id="addCardModalLabel">
                                            Add credit/debit card
                                        </h1>
                                    </div>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <p class="modal-p">
                                            card number
                                        </p>
                                        <input class="modal-input" type="text" placeholder="0000-0000-0000-0000" v-model="cardNumber">
                                        <p class="modal-p">
                                            card holder
                                        </p>
                                        <input class="modal-input" type="text" placeholder="JOHN SMITH" v-model="cardHolder">
                                        <div>
                                            <p class="modal-p">
                                                expiration date
                                            </p>
                                            <input class="modal-input" type="text" placeholder="mm/yy" v-model="cardExpirationDate">
                                            <p class="modal-p">
                                                cvv
                                            </p>
                                            <input class="modal-input" type="text" placeholder="000" v-model="cardCVV">                    
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn casino-btn" @click="addCardToUserData">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Credit data -->
                <div class="section-container credit-user-container">
                    <div class="half-top-border-right half-top-border-right-size-small"></div>
                    <div class="half-top-border-left"></div>
                    <div class="section-title-container">
                        <p>
                            credit
                        </p>
                    </div>
                    <p>
                        {{ userData.credit }} €
                    </p>
                    <div class="credit-btns-container">
                        <button type="button" class="btn casino-btn" data-bs-toggle="modal" data-bs-target="#addCreditModal" @click="resetCreditFromValues" :disabled="userData.cards.length === 0">
                            <img src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="">
                            Add credit
                        </button>
                        <button type="button" class="btn casino-btn" data-bs-toggle="modal" data-bs-target="#extractCreditModal" @click="resetCreditFromValues" :disabled="userData.credit === 0">
                            <img src="https://icons-for-free.com/iconfiles/png/512/money+icon-1320184267002448371.png" alt="">
                            Extract credit
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="addCreditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addCreditModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-position">
                                <div class="modal-content modal-container">
                                    <div class="modal-header">
                                        <div class="modal-title-container">
                                            <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                            <h1 class="modal-title modal-title-style fs-5" id="addCreditModalLabel">
                                                Add credit to account
                                            </h1>
                                        </div>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p class="modal-p">
                                            Credit:
                                        </p>
                                        <div class="credit-input-container modal-input">
                                            <increase-decrease-btn action="decrease" :isActive="creditFromCard > 0 ? false : true" @decrease="creditFromCard--" disable/>
                                            <input type="text" v-model="creditFromCard">
                                            <increase-decrease-btn action="increase" :isActive="creditFromCard < 500 ? false : true" @increase="creditFromCard++"/>
                                        </div>
                                        <p class="modal-p">
                                            From which card:
                                        </p>
                                        <select class="modal-select modal-input" name="card" :disabled="userData.cards.length === 0 ? true : false" v-model="cardToTakeCreditFrom">
                                            <option value="" disabled hidden v-if="this.userData.cards.length === 0">
                                                 -- there are no cards yet --
                                            </option>
                                            <option value="" disabled hidden v-else>
                                                 -- select the card --
                                            </option>
                                            <option v-for="(card, index) in userData.cards" :value="card" :key="index">
                                                {{
                                                    card.cardNumber
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn casino-btn" @click="addCredit">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="extractCreditModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="extractCreditModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-position">
                                <div class="modal-content modal-container">
                                    <div class="modal-header">
                                        <div class="modal-title-container">
                                            <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                            <h1 class="modal-title modal-title-style fs-5" id="extractCreditModalLabel">
                                                Extract credit
                                            </h1>
                                        </div>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p class="modal-p">
                                            Credit:
                                        </p>
                                        <div class="credit-input-container modal-input">
                                            <increase-decrease-btn action="decrease" :isActive="creditToCard > 0 ? false : true" @decrease="creditToCard--" disable/>
                                            <input type="text" v-model="creditToCard">
                                            <increase-decrease-btn action="increase" :isActive="creditToCard < userData.credit ? false : true" @increase="creditToCard++"/>
                                        </div>
                                        <p class="modal-p">
                                            To which card:
                                        </p>
                                        <select class="modal-select modal-input" name="card" :disabled="userData.cards.length === 0 ? true : false" v-model="cardToGiveCreditTo">
                                            <option value="" disabled hidden v-if="this.userData.cards.length === 0">
                                                 -- there are no cards yet --
                                            </option>
                                            <option value="" disabled hidden v-else>
                                                 -- select the card --
                                            </option>
                                            <option v-for="(card, index) in userData.cards" :value="card" :key="index">
                                                {{
                                                    card.cardNumber
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn casino-btn" @click="extractCredit">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Premium data -->
                <div class="section-container premium-user-container">
                    <div class="half-top-border-right half-top-border-right-size-medium"></div>
                    <div class="half-top-border-left"></div>
                    <div class="section-title-container">
                        <p>
                            account
                        </p>
                    </div>
                    <p :class="[userData.premium ? 'premium-style' : '']">
                        {{ userData.premium ? "premium" : "normal" }} privilages
                    </p>
                    <div class="premium-btns-container">
                        <button type="button" class="btn casino-btn" data-bs-toggle="modal" data-bs-target="#getPremiumModal" @click="resetPremiumValues" :disabled="userData.cards.length === 0" v-if="!userData.premium">
                            <img src="https://cdn-icons-png.flaticon.com/512/14/14165.png" alt="">
                            Become premium
                        </button>
                        <button type="button" class="btn casino-btn" data-bs-toggle="modal" data-bs-target="#removePremiumModal" @click="resetPremiumValues" v-else>
                            <img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/cross-24-512.png" alt="">
                            Remove privilages
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="getPremiumModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="getPremiumModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-position">
                                <div class="modal-content modal-container">
                                    <div class="modal-header">
                                        <div class="modal-title-container">
                                            <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                            <h1 class="modal-title modal-title-style fs-5" id="getPremiumModalLabel">
                                                Get premium privilages
                                            </h1>
                                        </div>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p class="modal-p modal-info-premium">
                                            Become premium for 15€ per month and get acces to the historic of your played blackjack games. For that, select the option and the card from which will be taken the monthly fee.
                                        </p>
                                        <div class="premium-input-container modal-input">
                                            <input type="checkbox" name="" id="bePremium" v-model="bePremium">
                                            <label for="bePremium">Become premium</label>
                                        </div>
                                        <p class="modal-p">
                                            From which card:
                                        </p>
                                        <select class="modal-select modal-input" name="card" :disabled="userData.cards.length === 0 ? true : false" v-model="premiumSubscriptionCard">
                                            <option value="" disabled hidden v-if="this.userData.cards.length === 0">
                                                 -- there are no cards yet --
                                            </option>
                                            <option value="" disabled hidden v-else>
                                                 -- select the card --
                                            </option>
                                            <option v-for="(card, index) in userData.cards" :value="card" :key="index">
                                                {{
                                                    card.cardNumber
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn casino-btn" @click="addPremium">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="removePremiumModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="removePremiumModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-position">
                                <div class="modal-content modal-container">
                                    <div class="modal-header">
                                        <div class="modal-title-container">
                                            <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                            <h1 class="modal-title modal-title-style fs-5" id="removePremiumModalLabel">
                                                Remove premium subscription
                                            </h1>
                                        </div>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p class="modal-p modal-info-premium">
                                            To remove the subscription select the option and save the changes. Next month will be the first without fee. The current month fee won't be returned.
                                        </p>
                                        <div class="premium-input-container  modal-input">
                                            <input type="checkbox" name="" id="removePremium" v-model="removePremium">
                                            <label for="removePremium">Remove premium privilages</label>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn casino-btn" @click="removePremiumSubscription">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex";
    import CardInfo from "@/components/CardInfo.vue";
    import IncreaseDecreaseBtn from "@/components/IncreaseDecreaseBtn.vue";
    import { db } from "@/firebase/index.js";
    import { doc, collection, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

    export default {
        name: "Profile",
        components: {
            CardInfo,
            IncreaseDecreaseBtn,
        },
        data() {
            return {
                // Gotten data
                userData: "",

                // User personal data
                name: "",
                lastname: "",
                username: "",

                // Cards data
                cardNumber: "",
                cardHolder: "",
                cardExpirationDate: "",
                cardCVV: "",

                // Credit data
                creditFromCard: "0",
                cardToTakeCreditFrom: "aa",
                creditToCard: "0",
                cardToGiveCreditTo: "",

                // Premium data
                bePremium: "",
                premiumSubscriptionCard: "",
                removePremium: "",
            }
        },
        computed: {
            ...mapGetters(["uid"]),
        },
        methods: {
            // Gotten data
            async setUserData() {
                if(this.uid !== "") {
                    await getDoc(doc(collection(db, "users"), this.uid))
                        .then(data => this.userData = data.data());
                }
            },

            // User personal data
            setEditingValues() {
                if(this.userData.state === "completed") {
                    this.name = this.userData.name;
                    this.lastname = this.userData.lastname;
                    this.username = this.userData.username;
                } else {
                    this.name = "";
                    this.lastname = "";
                    this.username = "";
                }
            },
            checkInput(value, min=0, max=Infinity) {
                if(value.trim() === value && value.length >= min && value.length <= max) return true;
                return false;
            },
            updatePersonalData() {
                let checker = true;
                if(!this.checkInput(this.name, 2, 15)) {
                    checker = false;
                }
                if(!this.checkInput(this.lastname, 2, 25)) {
                    checker = false;
                }
                if(!this.checkInput(this.username, 6, 15)) {
                    checker = false;
                }
                if(checker) {
                    document.querySelector("#userDataModal").firstChild.firstChild.firstChild.childNodes[1].click();
                    updateDoc(doc(collection(db, "users"), this.uid), {
                        name: this.name,
                        lastname: this.lastname,
                        username: this.username,
                        state: "completed"
                    })
                        .then(_ => {
                            this.setUserData();
                        })
                }
            },

            // Cards data
            resetCardFormValues() {
                this.cardNumber = "";
                this.cardHolder = "";
                this.cardExpirationDate = "";
                this.cardCVV = "";
            },
            addCardToUserData() {
                let checker = true;
                if(!this.checkInput(this.cardNumber, 19, 19)) {
                    checker = false;
                }
                if(!this.checkInput(this.cardHolder, 5, 20)) {
                    checker = false;
                }
                if(!this.checkInput(this.cardExpirationDate, 5, 5)) {
                    checker = false;
                }
                if(!this.checkInput(this.cardCVV, 3, 3)) {
                    checker = false;
                }
                if(this.userData.cards.map(c => c.cardNumber).includes(this.cardNumber)) {
                    checker = false;
                }
                if(checker) {
                    document.querySelector("#addCardModal").firstChild.firstChild.firstChild.childNodes[1].click();
                    updateDoc(doc(collection(db, "users"), this.uid), {
                        cards: arrayUnion({
                            cardNumber: this.cardNumber,
                            cardHolder: this.cardHolder,
                            cardExpirationDate: this.cardExpirationDate,
                            cardCVV: this.cardCVV
                        })
                    })
                        .then(_ => {
                            this.setUserData();
                        });
                }
            },
            removeCardToUserData(card) {
                updateDoc(doc(collection(db, "users"), this.uid), {
                    cards: arrayRemove(card)
                })
                    .then(_ => {
                        this.setUserData();
                    });
            },

            // Credit data
            resetCreditFromValues() {
                this.creditFromCard = "0";
                this.cardToTakeCreditFrom = "";
                this.creditToCard = "0";
                this.cardToGiveCreditTo = "";
            },
            addCredit() {
                let checker = true;
                if(this.creditFromCard <= 0) checker = false;
                if(this.cardToTakeCreditFrom === "") checker = false;
                if(checker) {
                    document.querySelector("#addCreditModal").firstChild.firstChild.firstChild.childNodes[1].click();
                    updateDoc(doc(collection(db, "users"), this.uid), {
                        credit: Number(this.creditFromCard) + Number(this.userData.credit)
                    })
                        .then(_ => {
                            this.setUserData();
                        });
                }
            },
            extractCredit() {
                let checker = true;
                if(this.creditToCard <= 0) checker = false;
                if(this.cardToGiveCreditTo === "") checker = false;
                if(checker) {
                    document.querySelector("#extractCreditModal").firstChild.firstChild.firstChild.childNodes[1].click();
                    updateDoc(doc(collection(db, "users"), this.uid), {
                        credit: Number(this.userData.credit) - Number(this.creditToCard)
                    })
                        .then(_ => {
                            this.setUserData();
                        });
                }
            },

            // Premium data
            resetPremiumValues() {
                this.bePremium = "";
                this.premiumSubscriptionCard = "";
                this.removePremium = "";
            },
            addPremium() {
                if(this.bePremium === true && this.premiumSubscriptionCard !== "") {
                    document.querySelector("#getPremiumModal").firstChild.firstChild.firstChild.childNodes[1].click();
                    updateDoc(doc(collection(db, "users"), this.uid), {
                        premium: true
                    })
                        .then(_ => {
                            this.setUserData();
                        });
                }
            },
            removePremiumSubscription() {
                if(this.removePremium === true) {
                    document.querySelector("#removePremiumModal").firstChild.firstChild.firstChild.childNodes[1].click();
                    updateDoc(doc(collection(db, "users"), this.uid), {
                        premium: false
                    })
                        .then(_ => {
                            this.setUserData();
                        });
                }
            },
            
            log() {
                console.log("test");
            }
        },
        mounted() {
            this.setUserData();
        },
        watch: {
            // Gotten data
            uid() {
                // console.log(this.uid);
                this.setUserData();
            },

            // User personal data
            name(v) {
                let name = v.replace(/[^\w\s]|\d|^\s$/, "").replace(/\s\s$/, " ");
                if(name.length > 15) name = name.slice(0,15);
                this.name = name.toUpperCase();
            },
            lastname(v) {
                let name = v.replace(/[^\w\s]|\d|^\s$/, "").replace(/\s\s$/, " ");
                if(name.length > 25) name = name.slice(0,25);
                this.lastname = name.toUpperCase();
            },
            username(v) {
                let name = v.replace(/[^\w\d]/, "");
                if(name.length > 15) name = name.slice(0,15);
                this.username = name;
            },

            // Cards data
            cardNumber(v) {
                let numbers = v.replace(/[^\d-]/, "").split("-").join("");
                if(numbers.length >= 4) numbers = numbers.slice(0,4) + "-" + numbers.slice(4);
                if(numbers.length >= 9) numbers = numbers.slice(0,9) + "-" + numbers.slice(9);
                if(numbers.length >= 14) numbers = numbers.slice(0,14) + "-" + numbers.slice(14);
                if(numbers.length > 19) numbers = numbers.slice(0,19);
                this.cardNumber = numbers;
            },
            cardHolder(v) {
                let holder = v.replace(/[^\w\s]|\d|^\s$/, "").replace(/\s\s$/, " ");
                if(holder.length > 20) holder = holder.slice(0,20);
                this.cardHolder = holder.toUpperCase();
            },
            cardExpirationDate(v) {
                let expirationDate = v.replace(/[^\d/]/, "").split("/").join("");
                if(expirationDate.length >= 2) expirationDate = expirationDate.slice(0,2) + "/" + expirationDate.slice(2);
                if(expirationDate.length > 5) expirationDate = expirationDate.slice(0,5);
                this.cardExpirationDate = expirationDate;
            },
            cardCVV(v) {
                let cvv = v.replace(/[^\d]/, "");
                if(cvv.length > 3) cvv = cvv.slice(0,3);
                this.cardCVV = cvv;
            },

            // Credit data
            creditFromCard(v) {
                let credit = String(v).replace(/[^\d]|^0/, "");
                if(credit > 500) credit = "500";
                if(credit === "" || credit < 0) credit = "0";
                this.creditFromCard = credit;
            },
            creditToCard(v) {
                let credit = String(v).split(".").filter((_, i) => i < 2).map((n, i) => {
                    if(i == 0) return n.replace(/[^\d]|^0/, "");
                    return n.replace(/[^\d]/, "").slice(0,2);
                });
                if(credit.length === 1) credit = credit.join("");
                else credit = credit.join(".");
                if(credit > this.userData.credit) credit = String(this.userData.credit);
                // if(credit > 500) credit = String(500);
                if(credit === "" || credit < 0) credit = "0";
                if(credit.match(/^\./)) credit = "0" + credit;
                this.creditToCard = credit;
            },
        }
    }
</script>

<style scoped>
.section-container {
    position: relative;
    border: 1px solid var(--main-color);
    border-top: none;
    border-radius: 15px;
    padding: 2rem 4rem;
    margin-bottom: 3rem;
}

.half-top-border-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5%;
    height: 100px;
    border-top: 1px solid var(--main-color);
    border-top-left-radius: 15px;
}

.half-top-border-right {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - 195px);
    height: 15px;
    border-top: 1px solid var(--main-color);
    border-top-right-radius: 15px;
}

.half-top-border-right-size-small {
    width: calc(100% - 120px);
}

.half-top-border-right-size-medium {
    width: calc(100% - 145px);
}

.section-title-container {
    position: absolute;
    top: -1rem;
    left: 40px;
}

.section-title-container > p {
    text-transform: uppercase;
    font-weight: bold;
    color: rgba(0, 255, 255, 0.5);
}

.personal-user-container > button {
    position: absolute;
    top: 25px;
    right: 25px;
    padding: 5px 5px 9px 9px;
}

.personal-user-container > button > img {
    width: 25px;
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

.info-element-container {
    padding: 0.5rem 0;
}

.info-element-container > p {
    margin: 0;
    font-weight: bold;
}

.info-element-container > p > span {
    margin-right: 1rem;
    opacity: 75%;
    font-weight: normal;
}

.cards-user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.cards-user-container > button {
    width: 150px;
    font-weight: 650;
}

.cards-user-container > button > img {
    width: 1rem;
    margin-top: -2.5px;
    margin-right: 5px;
}

.no-cards-container {
    opacity: 75%;
    margin-top: 2rem;
}

.card-list-container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: space-around;
}

.credit-user-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
}

.credit-user-container > p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
}

.credit-btns-container {
    display: flex;
    gap: 2rem;
}

.credit-btns-container > button {
    width: 150px;
}

.credit-btns-container > button > img,
.premium-btns-container > button > img {
    width: 1rem;
    margin-top: -2.5px;
    margin-right: 5px;
}

.credit-input-container {
    display: flex;
}

.credit-input-container > input {
    margin: 0 5px;
    width: 175px;
}

.premium-user-container {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    gap: 2rem;
}

.premium-user-container > p {
    margin: 0;
    font-weight: bold;
    text-transform: capitalize;
}

.premium-style {
    color: gold;
    position: relative;
}

.premium-style::after {
    position: absolute;
    content: "";
    top: calc(50% - 60px);
    width: 200px;
    height: 20px;
    left: calc(50% - 100px);
    box-shadow: 0 50px 2rem 0 gold;
}

.premium-btns-container > button {
    width: 200px;
}

.premium-input-container {
    display: flex;
    align-items: center;
    margin-top: 2rem;
}

.premium-input-container > label {
    margin: 0;
    margin-bottom: 2px;
    margin-left: 0.5rem;
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

.modal-info-premium {
    font-size: 1rem;
    opacity: 90%;
}

.modal-input {
    margin-bottom: 1.5rem;
}

br {
    display: none;
}

@media screen and (max-width: 1200px) {
    
}

@media screen and (max-width: 992px) {
    .half-top-border-left {
        width: 20px;
    }
}

@media screen and (max-width: 768px) {
    .premium-user-container {
        flex-direction: column;
    }

    .info-element-container > p {
        word-break: break-word;
    }

    br {
        display: inline;
    }
}

@media screen and (max-width: 576px) {
    .credit-user-container {
        align-items: center;
    }
    
    .credit-btns-container {
        flex-direction: column;
    }
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

    .modal-info-premium {
        font-size: 0.8rem;
        opacity: 90%;
    }
}
</style>
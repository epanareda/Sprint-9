<template>
    <div>
        <button id="hidden-login-btn" data-bs-toggle="modal" data-bs-target="#loginModal" @click="resetUserData"></button>
        <button id="hidden-register-btn" data-bs-toggle="modal" data-bs-target="#registerModal" @click="resetUserData"></button>
        <div class="title-container">
            <div class="diamond-container">
                <div class="diamond-tr"></div>
                <div class="diamond-br"></div>
                <div class="diamond-bl"></div>
                <div class="diamond-tl"></div>
            </div>
            <h3>home</h3>
        </div>
        <div>
            <p>
                Welcome to the <strong>BLACKJACK CASINO!</strong> In this web app you can play a 1 vs 1 blackjack against the computer, which will be the croupier.
            </p>
            <p>
                If you are new, to play blackjack here you will have to create an account first. Click in the login button placed at the top right corner of the screen, and then select 
                <button class="link" @click="openRegisterModal" v-if="!logedin">
                    register
                </button>
                <span v-else>register</span>.
                 Once the account is created, before being able to play, you will need to write down some information first in the
                <router-link class="link" to="/profile" v-if="logedin">
                    profile
                </router-link>
                <button class="link" @click="openLoginModal" v-else>
                    profile
                </button>
                section, that you will find in the login button as well. And finally, in the same
                <router-link class="link" to="/profile" v-if="logedin">
                    profile
                </router-link>
                <button class="link" @click="openLoginModal" v-else>
                    profile
                </button>
                section as well, you will have to add some credit into your account so you will be able to start the first bet, but first you will need a credit/debit card from where to take that money.
            </p>
            <p>
                Once the setup of your account is done, you will be prepared to start playing blackjack here in the Blackjack Casino!
            </p>
            <p>
                To know the rules used here to play blackjack, please check the <router-link class="link" to="/guide">
                guide
                </router-link> section.
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Home",
    computed: {
        ...mapGetters(["logedin"]),
    },
    methods: {
        openLoginModal() {
            document.querySelector("#hidden-login-btn").click();
        },
        openRegisterModal() {
            document.querySelector("#hidden-register-btn").click();
        }
    },
}
</script>

<style scoped>
    #hidden-login-btn,
    #hidden-register-btn {
        display: none;
    }
</style>
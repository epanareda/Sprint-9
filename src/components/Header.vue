<template>
    <header class="navbar navbar-dark navbar-expand-sm header-container">
          <div class="container-fluid navbar-conteiner" style="align-self: end">
            <div class="logo-container">
                <!-- <img src="https://oneidacasino.net/wp-content/uploads/2020/03/Blackjack.png" alt=""> -->
                <img src="https://i.pinimg.com/originals/8f/47/a8/8f47a88f474fb79ad00a3c46e7eee040.png" alt="">
                <div class="logo-text-container">
                    <div class="background-tr-border"></div>
                    <div class="background-br-border"></div>
                    <div class="background-bl-border"></div>
                    <div class="background-tl-border"></div>
                    <div class="background-tr"></div>
                    <div class="background-br"></div>
                    <div class="background-bl"></div>
                    <div class="background-tl"></div>
                    <router-link class="icon-button" to="/">
                        blackjack casino
                    </router-link>
                </div>
            </div>

            <div :class="[windowWidth <= 576 ? 'dropstart' : 'dropdown-center',
             'dropdown-container']">
                <button class="login-container" type="button" data-bs-toggle="dropdown" aria-expanded="false" @click="setWindowWidth">
                    <img src="https://static-mh.content.disney.io/matterhorn/assets/starwars/navigation/SW_Oneid_User-85043c6786ab.svg" alt="">
                    <p>
                        {{ loginText2 }}
                    </p>
                </button>
                <ul class="dropdown-menu dropdown-menu-container">
                    <div v-if="!logedin">
                        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#loginModal" @click="resetUserData">Login</button></li>
                        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#registerModal" @click="resetUserData">Register</button></li>
                    </div>
                    <div v-else>
                        <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                        <li><button class="dropdown-item" @click="logout">Logout</button></li>
                    </div>
                </ul>
            </div>
            <div class="modal fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-position">
                    <div class="modal-content modal-container">
                        <div class="modal-header modal-border-eraser">
                            <div class="modal-title-container">
                                <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                <h1 class="modal-title fs-5" id="loginModalLabel">
                                    Access an account
                                </h1>
                            </div>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="() => {
                                this.resetUserData();
                                this.resetErrorText();
                            }"></button>
                        </div>
                        <form @submit.prevent="() => {
                            this.resetErrorText();
                            this.verify('login');
                        }" novalidate>
                            <p>email</p>
                            <input v-model="email" type="email">
                            <p class="email-error-text hidden-text">{{ emailErrorTxt }}</p>
                            <p>password</p>
                            <input v-model="password" type="password">
                            <p class="password-error-text hidden-text">{{ passwordErrorTxt }}</p>
                            <br><br>
                            <input class="btn casino-btn mt-4" type="submit" value="Login">
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="registerModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-position">
                    <div class="modal-content modal-container">
                        <div class="modal-header modal-border-eraser">
                            <div class="modal-title-container">
                                <img src="https://cdn-icons-png.flaticon.com/512/167/167969.png" alt="">
                                <h1 class="modal-title fs-5" id="registerModalLabel">
                                    Create an account
                                </h1>
                            </div>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="() => {
                                this.resetUserData();
                                this.resetErrorText();
                            }"></button>
                        </div>
                        <form @submit.prevent="() => {
                            this.resetErrorText();
                            verify('register')
                        }" novalidate>
                            <p>email</p>
                            <input v-model="email" type="email">
                            <p class="email-error-text hidden-text">{{ emailErrorTxt }}</p>
                            <p>password</p>
                            <input v-model="password" type="password">
                            <p class="password-error-text hidden-text">{{ passwordErrorTxt }}</p>
                            <br><br>
                            <input class="btn casino-btn mt-4" type="submit" value="Register">
                        </form>
                    </div>
                </div>
            </div>

            <button class="navbar-toggler navbar-toggler-style" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="navbar-nav navbar-nav-style">
                    <nav class="navbar-container">
                        <router-link :class="['nav-element',
                        $route.name === 'home' ? 'nav-element-active' : '']" to="/">
                            <p>
                                Home
                            </p>
                        </router-link>
                        <router-link :class="['nav-element',
                        $route.name === 'guide' ? 'nav-element-active' : '']" to="/guide">
                            <p>
                                Guide
                            </p>
                        </router-link>
                        <router-link class="nav-element" to="/game" :class="[logedin ? '' : 'inactive-link',
                        $route.name === 'game' ? 'nav-element-active' : '']">
                            <p>
                                Game
                            </p>
                        </router-link>
                        <router-link class="nav-element" to="/historic" :class="[logedin ? '' : 'inactive-link',
                        $route.name === 'historic' ? 'nav-element-active' : '']" v-if="userData.premium">
                            <p>
                                Historic
                            </p>
                        </router-link>
                    </nav>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
    import { mapGetters, mapMutations } from "vuex";
    import { auth, db } from "@/firebase/index.js";
    import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut } from "firebase/auth";
    import { doc, collection, setDoc, getDoc } from "firebase/firestore";


    export default {
        name: "Header",
        data() {
            return {
                email: "",
                emailErrorTxt: "",
                password: "",
                passwordErrorTxt: "",
                // otherErrorTxt: "",
                loginText: "",
                windowWidth: "",
            }
        },
        computed: {
            ...mapGetters(["logedin", "uid", "userData"]),
            loginText2() {
                if(this.uid !== "") {
                    if(this.userData.state === "completed") {
                        return this.userData.username;
                    } else if(this.userData.state === "uncompleted") {
                        return "unknown";
                    }
                } else return "offline";
            },
        },
        methods: {
            ...mapMutations(["loginLogout", "setUserId", "setUserData"]),
            verifyEmail(str) {
                if(!str || str === "") this.emailErrorTxt = "Email can not be empty";
                else if(str.trim() !== str) this.emailErrorTxt = "Email can not have white spaces";
                else if(str.length > 30) this.emailErrorTxt = "Email can not have more than 30 characters";
                else if(str.match(/^[A-z0-9]{3,}@[a-z]+\.[a-z]+$/)) return "correct";
                else this.emailErrorTxt = "Invalid email adress";
            },
            verifyPassword(str) {
                if(!str || str === "") this.passwordErrorTxt = "Password can not be empty";
                else if(str.trim() !== str) this.passwordErrorTxt = "Password can only have spaces between words";
                else if(str.length > 20 || str.length < 8) this.passwordErrorTxt = "Password has to have more than 8 or less than 20 characters";
                else if(str.match(/[!\?¡¿\*\^]/) &&
                    str.match(/[0-9]/) &&
                    str.match(/[a-z]/) &&
                    str.match(/[A-Z]/)
                ) return "correct";
                else this.passwordErrorTxt = "Password has to have lowercase and uppercase letters, numbers and special characters";
            },
            verify(type) {
                const valid_email = this.verifyEmail(this.email);
                const valid_password = this.verifyPassword(this.password);
                // if(valid_password === "error") console.log("Incorrect password");
                if(valid_email === "correct" && valid_password === "correct") {
                    if(type === "login") this.accessAccount();
                    else if(type === "register") this.createAccount();
                }
            },
            resetErrorText() {
                this.emailErrorTxt = "";
                this.passwordErrorTxt = "";
                // this.otherErrorTxt = "";
            },
            createAccount() {
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        // console.log(Object.entries(user));
                        document.querySelector("#registerModal").firstChild.firstChild.firstChild.childNodes[1].click();
                        setDoc(doc(collection(db, "users"), user.uid), {
                            state: "uncompleted",
                            name: "",
                            lastname: "",
                            username: "",
                            cards: [],
                            credit: 0,
                            premium: false,
                        });
                        this.logout();
                        this.resetUserData();
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        // const errorMessage = error.message;
                        if(errorCode === "auth/email-already-in-use") {
                            this.emailErrorTxt = "This email has already an account";
                        } else if(errorCode === "auth/invalid-email") {
                            this.emailErrorTxt = "This email is not valid";
                        } else {
                            // this.otherErrorTxt = "Something strange happend, please try again";
                            console.log("Something strange happend, please try again");
                        }
                    });
            },
            accessAccount() {
                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        // console.log(Object.entries(user));
                        document.querySelector("#loginModal").firstChild.firstChild.firstChild.childNodes[1].click();
                        this.resetUserData();
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        // const errorMessage = error.message;
                        if(errorCode === "auth/user-not-found") {
                            this.emailErrorTxt = "This email doesn't exist";
                        } else if(errorCode === "auth/invalid-email") {
                            this.emailErrorTxt = "This email is not valid";
                        } else if(errorCode === "auth/wrong-password") {
                            this.passwordErrorTxt = "Incorrect password";
                        } else {
                            // this.otherErrorTxt = "Something strange happend, please try again";
                            console.log("Something strange happend, please try again");
                        }
                    });
            },
            logout() {
                signOut(auth).then(() => {
                console.log("Sign-out successful");
                }).catch((error) => {
                console.log("An error happened: " + error);
                });
                this.$router.push({name: "home"})
            },
            resetUserData() {
                this.email = "";
                this.password = "";
            },

            
            setWindowWidth() {
                this.windowWidth = window.innerWidth;
            }
        },
        mounted() {
            // getDoc(doc(db, "users", "test")).then(x => console.log(x.data().status));
            onAuthStateChanged(auth, async (user) => {
                this.loginLogout(user);
                if(user) {
                    // console.log(user)
                    this.setUserId(user.uid);
                    getDoc(doc(collection(db, "users"), this.uid))
                        .then(data => this.setUserData(data.data()));
                } else {
                    this.setUserId("");
                    this.setUserData("");
                    if(this.$route.name === "profile") this.$router.push({name: "home"})
                }
            });
        },
        watch: {
            emailErrorTxt(val) {
                const elements = document.querySelectorAll(".email-error-text");
                if(val !== "") {
                    elements.forEach(e => e.classList.remove("hidden-text"));
                } else {
                    elements.forEach(e => e.classList.add("hidden-text"));
                }
            },
            passwordErrorTxt(val) {
                const elements = document.querySelectorAll(".password-error-text");
                if(val !== "") {
                    elements.forEach(e => e.classList.remove("hidden-text"));
                } else {
                    elements.forEach(e => e.classList.add("hidden-text"));
                }
            },
        }
    }
</script>

<style scoped>
.header-container {
    color: var(--main-color);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
    min-height: 130px;
    background-color: rgb(0, 40, 0);
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-items: end;
    border-bottom: 1px solid var(--main-color);
    padding: 0;
}

.logo-container {
    width: 250px;
    margin: 0rem 0;
    position: absolute;
    top: -20px;
    left: 75px;
}

.logo-container > img {
    width: 100%;
}

.logo-text-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.background-tr {
    position: absolute;
    top: calc(50% - 50px);
    left: 49.5%;
    border-left: 75px solid rgba(255, 255, 255, 1);
    border-top: 25px solid transparent;
    border-right: 75px solid transparent;
    border-bottom: 25px solid rgba(255, 255, 255, 1);
}

.background-br {
    position: absolute;
    top: 49.5%;
    left: 49.5%;
    border-left: 75px solid rgba(255, 255, 255, 1);
    border-top: 25px solid rgba(255, 255, 255, 1);
    border-right: 75px solid transparent;
    border-bottom: 25px solid transparent;
}

.background-bl {
    position: absolute;
    top: 49.5%;
    left: calc((250px / 2) - 150px);
    border-left: 75px solid transparent;
    border-top: 25px solid rgba(255, 255, 255, 1);
    border-right: 75px solid rgba(255, 255, 255, 1);
    border-bottom: 25px solid transparent;
}

.background-tl {
    position: absolute;
    top: calc(50% - 50px);
    left: calc((250px / 2) - 150px);
    border-left: 75px solid transparent;
    border-top: 25px solid transparent;
    border-right: 75px solid rgba(255, 255, 255, 1);
    border-bottom: 25px solid rgba(255, 255, 255, 1);
}

.background-tr-border {
    position: absolute;
    top: calc(50% - 52px);
    left: 49.75%;
    border-left: 77px solid rgba(180, 0, 0, 1);
    border-top: 26px solid transparent;
    border-right: 77px solid transparent;
    border-bottom: 26px solid rgba(180, 0, 0, 1);
}

.background-br-border {
    position: absolute;
    top: 49.75%;
    left: 49.75%;
    border-left: 77px solid rgba(180, 0, 0, 1);
    border-top: 26px solid rgba(180, 0, 0, 1);
    border-right: 77px solid transparent;
    border-bottom: 26px solid transparent;
}

.background-bl-border {
    position: absolute;
    top: 49.75%;
    left: calc((250px / 2) - 154px);
    border-left: 77px solid transparent;
    border-top: 26px solid rgba(180, 0, 0, 1);
    border-right: 77px solid rgba(180, 0, 0, 1);
    border-bottom: 26px solid transparent;
}

.background-tl-border {
    position: absolute;
    top: calc(50% - 52px);
    left: calc((250px / 2) - 154px);
    border-left: 77px solid transparent;
    border-top: 26px solid transparent;
    border-right: 77px solid rgba(180, 0, 0, 1);
    border-bottom: 26px solid rgba(180, 0, 0, 1);
}

.icon-button {
    text-decoration: none;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    color: black;
    z-index: 1;
    border-radius: 100%;
    width: 100%;
    padding: 30px 0;
    /* margin-top: 15px; */
    cursor: pointer;
    user-select: none;
}

.dropdown-container {
    position: absolute;
    top: calc(65px - 1rem);
    right: 100px;
}

.dropdown-container > ul {
    min-width: 100%;
    text-align: center;
    font-size: 1.2rem;
    background: rgba(0, 50, 0, 1);
    border: 1px solid white;
    padding: 0;
}

.dropdown-item {
    color: var(--main-color);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    transition: 0.5s;
}

.dropdown-item:hover {
    color: var(--second-color);
    background: inherit;
    border-radius: 5px;
    padding: 0.5rem 1rem;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    color: var(--main-color);
    background: none;
    border: none;
}

.login-container > img {
    position: relative;
    width: 25px;
    z-index: 1;
}

.login-container::after {
    position: absolute;
    content: "";
    top: -29px;
    left: -15.5px;
    width: 5px;
    height: 15px;
    box-shadow: 25px 35px 10px 5px rgba(180, 0, 0, 0);
    border-radius: 500px;
    transition: 0.5s;
}

.login-container:hover::after {
    box-shadow: 25px 35px 10px 5px rgba(180, 0, 0, 0.75);
}

.login-container > p {
    font-size: 1.25rem;
    padding: 0;
    margin: 0;
    margin-left: 0.35rem;
    z-index: 1;
    transition: 0.5s;
}

.login-container:hover > p {
    color: rgba(180, 0, 0, 1);
}

.navbar-toggler-style {
    position: absolute;
    top: calc(65px - 20px);
}

.navbar-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    padding: 0;
    /* border-bottom: 1px solid var(--main-color); */
}

.navbar-nav-style {
    width: 100%;
}

.nav-element {
    cursor: pointer;
    color: inherit;
    padding: 5px 2rem;
    transition: 0.5s;
    background: transparent;
    box-shadow: 0rem 2px 0px -1px rgb(180, 0, 0, 0);
    text-decoration: none;
}

.nav-element:hover {
    background: none;
    border: none;
    color: rgb(180, 0, 0);
    box-shadow: 0rem 2px 0px -1px rgb(180, 0, 0);
}

.nav-element > p {
    margin: 0;
    font-size: 1.25rem;
    text-transform: uppercase;
}

.nav-element-active,
.nav-element-active:hover {
    cursor: default;
    position: relative;
    background: none;
    color: var(--main-color);
    box-shadow: 0rem 2px 0px -1px var(--main-color);
}

.nav-element-active::after {
    position: absolute;
    content: "";
    width: 50px;
    left: calc(50% - 25px);
    bottom: 100%;
    background: none;
    color: var(--main-color);
    box-shadow: 0rem 20px 2rem 10px var(--main-color);
}

.inactive-link {
    cursor: not-allowed;
    pointer-events: none;
    text-decoration: none;
    opacity: 50%;
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
    font-size: 1.2rem;
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
    margin-bottom: 1rem;
}

.modal-p {
    margin: 0;
    margin-bottom: 0.25rem;
}

.modal-input {
    margin-bottom: 1.5rem;
}

form {
    display: flex;
    flex-direction: column;
    margin: 0 4rem;
    margin-bottom: 2rem;
}

form > p {
    margin: 0;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
}

/* form > input {
    margin-bottom: 1rem;
} */

.email-error-text,
.password-error-text {
    font-size: 0.8rem;
    color: var(--second-color);
    margin: 0;
    margin-bottom: 1rem;
    text-transform: initial;
}

.hidden-text {
    visibility: hidden;
}

.casino-btn {
    background: turquoise;
    transition: 0.5s;
    border: none;
    z-index: 1;
    font-weight: 650;
    color: black !important;
    user-select: none;
    font-size: 1.2rem;
}

.casino-btn:hover {
    background: var(--second-color);
}

.casino-btn:active {
    background: var(--second-color) !important;
    opacity: 50%;
}

@media screen and (max-width: 1200px) {
    .header-container {
        padding-top: 130px;
    }
}

@media screen and (max-width: 768px) {
    .header-container {
        padding-top: 200px;
    }

    .logo-container {
        left: calc(50% - 125px);
        top: 25px;
    }

    .dropdown-container {
        right: 25px;
        top: 15px;
    }

    .navbar-toggler-style {
        top: 135px;
    }

    .nav-element > p {
        margin: 0;
        font-size: 1.25rem;
        text-transform: uppercase;
    }
}

@media screen and (max-width: 575.5px) {
    .logo-container {
        top: -20px;
    }

    .dropdown-container {
        top: 140px;
    }

    .navbar-container {
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .nav-element:hover {
        box-shadow: 0rem 2px 0px -1px transparent;
    }

    .nav-element-active,
    .nav-element-active:hover {
        box-shadow: 0rem 2px 0px -1px transparent;
        font-weight: bold;
    }

    .nav-element-active::after {
        position: absolute;
        content: "";
        width: 50px;
        left: calc(50% - 25px);
        bottom: 75%;
        background: none;
        color: var(--main-color);
        box-shadow: 0rem 10px 0.75rem 5px var(--main-color);
    }

    .header-container::after {
        content: "";
        width: 100%;
        box-shadow: 0px 0px 20rem 7rem black;
        z-index: -1;
    }

    .dropdown-container > ul {
        min-width: 50%;
    }
}

@media screen and (max-width: 475px) {
    .dropdown-container > button > p {
        display: none;
    }

    form {
        margin: 20px 10px;
        margin-top: 0;
    }
}
</style>
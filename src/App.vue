<template>
  <Header />
  <router-view :class="['content-container',
  $route.name === 'profile' ? 'content-container-profile' : '']"/>
  <div class="background-gradient"></div>
</template>

<script>
import Header from "@/components/Header.vue"

export default {
  components: {
    Header,
  },
}
</script>

<style>
:root {
    --main-color: rgb(227, 227, 227);
    --second-color: rgb(180, 0, 0);
}

.content-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--main-color);
    margin: 50px 300px;
    font-size: 1.2rem;
    text-align: justify;
}

.background-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0) 200px, rgb(0, 40, 0) 400px);
    z-index: -2;
}

.title-container {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 40px;
}

.title-container > h3 {
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
}

.diamond-container {
    position: relative;
    margin-left: 15px;
    margin-right: 25px;
    margin-bottom: 7.5px;
}

.diamond-tr {
    position: absolute;
    top: calc(50% - 19px);
    content: "";
    border-top: 10px solid transparent;
    border-right: 7.5px solid transparent;
    border-bottom: 10px solid rgb(180, 0, 0);
    border-left: 7.5px solid rgb(180, 0, 0);
}

.diamond-br {
    position: absolute;
    top: 50%;
    content: "";
    border-top: 10px solid rgb(180, 0, 0);
    border-right: 7.5px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 7.5px solid rgb(180, 0, 0);
}

.diamond-bl {
    position: absolute;
    top: 50%;
    left: -14px;
    content: "";
    border-top: 10px solid rgb(180, 0, 0);
    border-right: 7.5px solid rgb(180, 0, 0);
    border-bottom: 10px solid transparent;
    border-left: 7.5px solid transparent;
}

.diamond-tl {
    position: absolute;
    top: calc(50% - 19px);
    left: -14px;
    content: "";
    border-top: 10px solid transparent;
    border-right: 7.5px solid rgb(180, 0, 0);
    border-bottom: 10px solid rgb(180, 0, 0);
    border-left: 7.5px solid transparent;
}

.link {
    text-decoration: none;
    border: none;
    background: none;
    color: turquoise;
    transition: 0.5s;
}

.link:hover {
    text-decoration: none;
    color: var(--second-color);
}

.link:active {
    opacity: 75%;
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

@media screen and (max-width: 1200px) {
    .content-container {
        margin: 50px 150px;
        font-size: 1.2rem;
    }
}

@media screen and (max-width: 992px) {
    .content-container {
        margin: 50px 50px;
        font-size: 1.2rem;
    }
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 576px) {
    .content-container {
        margin: 50px 25px;
        font-size: 1.2rem;
    }
}

@media screen and (max-width: 450px) {
    .content-container {
        margin: 50px 25px;
        font-size: 1rem;
    }

    .content-container-profile {
        margin: 50px 10px;
    }
}
</style>
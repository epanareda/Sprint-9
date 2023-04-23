<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" id="modal-btn" class="none-display" data-bs-toggle="modal" data-bs-target="#gameModal"></button>
        <!-- Modal -->
        <div class="modal fade" id="gameModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-position">
                <div class="modal-content modal-container">
                    <div class="modal-header modal-border-eraser">
                        <button id="modal-close-btn" type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="$emit('modalClosed')"></button>
                    </div>
                     <div>
                        <div class="modal-body">
                            <div class="element-info-container">
                                <div>
                                    <p class="data-title">
                                        Username:
                                    </p>
                                    <p>
                                        {{ matchData.username }}
                                    </p>
                                </div>
                                <div>
                                    <p class="data-title">
                                        Finished:
                                    </p>
                                    <p>
                                        {{ matchData.finish ? "Yes" : "No" }}
                                    </p>
                                </div>
                                <div>
                                    <p class="data-title">
                                        Bet:
                                    </p>
                                    <p>
                                        {{ matchData.bet }} €
                                    </p>
                                </div>
                                <div>
                                    <p class="data-title">
                                        Result:
                                    </p>
                                    <p>
                                        {{ matchData.result }}
                                    </p>
                                </div>
                                <div>
                                    <p class="data-title">
                                        Outcome:
                                    </p>
                                    <p>
                                        {{ matchData.winings }}{{ matchData.winings === "-" ? "" : " €" }}
                                    </p>
                                </div>
                                <div>
                                    <p class="data-title">
                                        Date:
                                    </p>
                                    <p>
                                        {{ matchData.dateString ? matchData.dateString.match(/\d\d \w{3} \d{4} \d\d:\d\d/)[0] : '' }}
                                    </p>
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

export default {
    name: "HistoricModal",
    props: ["openModal", "matchData"],
    data() {
        return {
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
    }
}
</script>

<style scoped>
.none-display {
    display: none;
}

.element-info-container {
    margin: 0.5rem;
    margin-top: -15px;
    padding: 1rem 2rem;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 0 1rem 1px var(--main-color);
}

.element-info-container > div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    row-gap: 0px;
}

.element-info-container > div > p {
    margin: 0;
}

.data-title {
    text-transform: uppercase;
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
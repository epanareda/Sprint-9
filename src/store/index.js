import { createStore } from 'vuex';

export default createStore({
  state: {
    // General stuff
    union: "*UNION*",

    // Game
    gameOn: "false",
    url: "https://deckofcardsapi.com/api/deck/",
    deckId: "",
    players: "",

    // Login
    logedin: "false",
    uid: "",
    userData: "",
  },

  getters: {
    // General stuff
    union(state) {
      return state.union;
    },

    // Game
    gameOn(state) {
      return state.gameOn === "true" ? true : false;
    },
    getPlayers(state) {
      return state.players;
    },

    // Login
    logedin(state) {
      return state.logedin === "true";
    },
    uid(state) {
      return state.uid;
    },
    userData(state) {
      if(state.userData === "") return state.userData;
      return JSON.parse(state.userData);
    },
  },

  mutations: {
    // Game
    setGameOn(state, value) {
      state.gameOn = value === true ? "true" : "false";
    },
    addPlayer(state, [name, dealer=false]) {
      const player = JSON.stringify({
        name: name,
        cards: [],
        score: 0,
        dealer: dealer
      });
      if(state.players === "") state.players = player;
      else {
        state.players = [
          ...state.players.split(state.union),
          player
        ].join(state.union);
      }
      // console.log(state.players)
    },
    resetPlayers(state) {
      state.players = "";
    },
    setDeckId(state, id) {
      state.deckId = id;
    },
    getCards(state, [player, cards]) {
      let data = state.players.split(state.union).map(p => JSON.parse(p));
      data[player].cards = [
        ...data[player].cards,
        ...cards
      ];
      const scoreData = data[player].cards.reduce((obj, card) => {
        if([2,3,4,5,6,7,8,9].includes(Number(card.value))) return {
          value: obj.value + Number(card.value),
          as: obj.as
        };
        if(["10", "JACK", "QUEEN", "KING"].includes(card.value)) return {
          value: obj.value + 10,
          as: obj.as
        };
        return {
          value: obj.value + 11,
          as: obj.as + 1
        };
      }, {value: 0, as: 0});
      while(scoreData.value > 21 && scoreData.as > 0) {
        scoreData.value -= 10;
        scoreData.as -= 1;
      }
      data[player].score = scoreData.value;
      state.players = data.map(d => JSON.stringify(d)).join(state.union);
    },

    // Login
    loginLogout(state, isLogedin) {
      state.logedin = isLogedin ? "true" : "false";
    },
    setUserId(state, id) {
      state.uid = id;
    },
    setUserData(state, userData) {
      if(userData === undefined) state.userData = "";
      else state.userData = JSON.stringify(userData);
    },
  },

  actions: {
    // Game
    getNewDeck({state, commit}, ) {
      fetch(`${state.url}new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(json => commit("setDeckId", json.deck_id))
        .catch(e => console.log(e));
    },
    shuffleDeck({state}, ) {
      fetch(`${state.url}${state.deckId}/shuffle/`)
        .catch(e => console.log(e));
    },
    drawCards({state, commit}, [player, qtty]) {
      fetch(`${state.url}${state.deckId}/draw/?count=${qtty}`)
        .then(response => response.json())
        // .then(json => console.log(json.cards))
        .then(json => commit("getCards", [player, json.cards]))
        .catch(e => console.log(e));
    },
  },
})

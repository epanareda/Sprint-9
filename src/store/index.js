import { createStore } from 'vuex'

export default createStore({
  state: {
    union: "*UNION*",
    url: "https://deckofcardsapi.com/api/deck/",
    deckId: "ujhv6iu1lgiv",
    players: "",

    logedin: "false",
    uid: "",
    userDataCompleted: "false",
    username: "",
    userPremium: "false",
  },

  getters: {
    union(state) {
      return state.union;
    },
    getPlayers(state) {
      return state.players;
    },

    logedin(state) {
      return state.logedin === "true";
    },
    uid(state) {
      return state.uid;
    },
    userDataCompleted(state) {
      return state.userDataCompleted === "true";
    },
    username(state) {
      return state.username;
    },
    userPremium(state) {
      return state.userPremium === "true";
    },
  },

  mutations: {
    addPlayer(state, [name, bot=false]) {
      const player = JSON.stringify({
        name: name,
        cards: [],
        score: 0,
        bot: bot
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

    loginLogout(state, isLogedin) {
      state.logedin = isLogedin ? "true" : "false";
    },
    setUserId(state, id) {
      state.uid = id;
    },
    setUserDataCompleted(state, isCompleted) {
      state.userDataCompleted = String(isCompleted);
    },
    setUsername(state, username) {
      state.username = username;
    },
    setUserPremium(state, isPremium) {
      state.userPremium = String(isPremium);
    },
  },

  actions: {
    getNewDeck({state, commit}, ) {
      fetch(`${state.url}new/shuffle/?deck_count=6`)
        .then(response => response.json())
        .then(json => commit("setDeckId", json.deck_id))
        .catch(e => console.log(e));
    },
    drawCards({state, commit}, [player, qtty]) {
      fetch(`${state.url}${state.deckId}/draw/?count=${qtty}`)
        .then(response => response.json())
        // .then(json => console.log(json.cards))
        .then(json => commit("getCards", [player, json.cards]))
        .catch(e => console.log(e));
    }
  },

  modules: {
  }
})

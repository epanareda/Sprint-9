<template>
    <div>
        <div class="title-container">
            <div class="diamond-container">
                <div class="diamond-tr"></div>
                <div class="diamond-br"></div>
                <div class="diamond-bl"></div>
                <div class="diamond-tl"></div>
            </div>
            <h3>guide</h3>
        </div>
        <div>
            <p>
                The blackjack here is played at a table of just 1 player and uses six 52-card decks, once the number of cards remaining in the deck are less than 70, it will be shuffled and start again. All number cards (2-10) score the value indicated on them. The face cards (Jack, Queen, King) score 10 points and Ace can either be treated as 1 or 11.
            </p>
            <p>
                At the beginning of each round, the player place his/her bet. After the bet has been placed, the player is dealt two cards face-up in front of him/her. Then, the dealer receives two cards, one face-up and another face-down.
            </p>
            <p>
                After that, the player is given a chance to draw more cards. The player can either "hit" or "stand". If the player calls "hit", he/she is given an extra card. The player can then either call out "hit" again, or "stand" if he/she do not wish to draw any more cards. The player can "hit" as many times as he/she wishes, but the goal is to aim not to "bust" (exceed a total of 21).
            </p>
            <p>
                If the player busts, he/she immediately loses the bet.
            </p>
            <p>
                After the player has played and either stood or busted, the dealer takes their turn. The dealer can, again, either "hit" or "stand". If the dealer's hand exceeds 21, and the player didn't bust, he/she wins immediately, and his/her bet is returned along with a matching amount from the dealer's bank. So, the player receives twice hat he/she has bet.
            </p>
            <p>
                If the dealer reaches a valid hand, the cards are totalled and the player's hand is compared to the dealer's. If the player scored higher than the dealer, he/she wins. If the player ties with the dealer, the original bet is returned to the player. Otherwise, the player loses their bet.
            </p>
            <p>
                A perfect hand combines an ace with a 10, Jack, Queen or King and is known as a "Blackjack". If that's the case, the player will receive 2.5 times what he/she has bet (1 from the original bet that will be returned, and 1.5 from the dealer's bank by wining with a blackjack). If both player and dealer have a "Blackjack", then it's a tie and the bets are returned. If the dealer gets a "Blackjack" and the player don't, the player loses immediately.
            </p>
            <p>
                Here at Blackjack Casino, the minimum bet will be of 2€ and the maximum will be of 500€.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Guide"
}
</script>

<style scoped>
    
</style>
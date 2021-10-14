// Part 2

async function get(url) {
    return await $.getJSON(url);
}

// 1.

get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => get(`http://deckofcardsapi.com/api/deck/${res["deck_id"]}/draw/?count=1`))
    .then(res => {
        const card = res['cards'][0];
        $('#part2-1').attr('src', card['image'])
        console.log(card)
        console.log(card['value'], 'of', card['suit']);
    })
    .catch(err => console.log(err));

// 2.
let deckId;
const $p2_2 = $('#part2-2');

get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckId = res['deck_id'];
        return get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })
    .then(res => {
        const card = res['cards'][0];
        $p2_2.append($('<img>').attr('src', card['image']));
        console.log(card['value'], 'of', card['suit']);
        return get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    })
    .then(res => {
        const card = res['cards'][0];
        $p2_2.append($('<img>').attr('src', card['image']));
        console.log(card['value'], 'of', card['suit']);
    })
    .catch(err => console.log(err));

// 3.

const $drawBtn = $('#draw');
const $drawnCard = $('#drawn-card');
const $remainingCards = $('#remaining');
const $p2_3 = $('#p2-3');

get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckId = res['deck_id'];
        $remainingCards.text(res['remaining']);
    })
    .catch(err => console.log(err));

$drawBtn.click(() => {
    get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            if (res['remaining'] > 0) {
                $drawnCard.attr('src', res['cards'][0]['image']);
                $remainingCards.text(res['remaining']);
            }
        })
        .catch(err => console.log(err));
});

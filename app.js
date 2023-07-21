// let favNumber = 16;
// let baseUrl = 'http://numbersapi.com'
// let favNumbers = [3, 16, 24]

// async function part1(){
//     let res = await $.getJSON(`${baseUrl}/${favNumber}?json`)
//     console.log(res);
// }

// async function part2(){
//     let res = await $.getJSON(`${baseUrl}/${favNumbers}`)
//     console.log(res);
// }

// async function part3(){
//     await Promise.all(
//     Array.from({ length: 4 }, () => {
//       return $.getJSON(`${baseUrl}/${favNumber}?json`);
//     })
//   ).then(facts => {
//     facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
//   });
// }

//CARD QUESTIONS---------------------------------------------------------------------------------

let baseUrl = 'https://deckofcardsapi.com/api/deck'

async function part1(){
    let res = await $.getJSON(`${baseUrl}/new/draw/`)
    console.log(res)
    let {suit, value} = res.cards[0]
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}

async function part2(){
    let firstCardData = await $.getJSON(`${baseUrl}/new/draw/`);
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseUrl}/${deckId}/draw`);
    [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
}

async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseUrl}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${baseUrl}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
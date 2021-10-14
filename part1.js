// Part 1

async function get(url) {
    return await $.getJSON(url);
}

// 1.

const URL = 'http://numbersapi.com/5?json'
let data;

get(URL).then(resp => $('#part1-1').text(resp.text));

// 2.

const nums = [1, 2, 3];
const $p1_2 = $('#part1-2');

get(`http://numbersapi.com/${nums}?json`)
    .then(resp => $.each(resp, (_, val) => $p1_2.append($('<p>').text(val))))
    .catch(err => console.log(err));

// 3.

const $p1_3 = $('#part1-3');

const promises = [get(URL), get(URL), get(URL), get(URL)];

Promise.all(promises)
    .then(resp => $.each(resp, (_, val) => $p1_3.append($('<p>').text(val.text))))
    .catch(err => console.log(err));
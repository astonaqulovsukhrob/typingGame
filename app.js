const bars = document.getElementById('bars');
const times = document.getElementById('times');
const navRes = document.querySelector('.nav-res ');
const word = document.getElementById('word');
const input = document.getElementById('input-text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const lastScoreEl = document.getElementById('lastScore')
const difficultyEl = document.getElementById('difficulty')

let randomWord

let score = 0;

let time = 10

let difficulty

difficultyEl.value = localStorage.getItem('difficulty') == null ? 'medium' : localStorage.getItem('difficulty')

bars.addEventListener('click', function () {
  navRes.classList.toggle('activ')
});

times.addEventListener('click', function () {
  navRes.classList.remove('activ')
});

function getResult() {
  fetch('https://random-words-api.vercel.app/word').then(function (data) {
    return data.json()
  }).then(showResult)
};

getResult();

function showResult(data) {
  randomWord = data[0].word.toLowerCase()
  word.textContent = randomWord
  lastScoreEl.textContent = score
};

input.addEventListener('input', function (e) {
  if (e.target.value == randomWord) {
    getResult()
    score++
    scoreEl.textContent = score
    input.value = ''

    if (difficulty == 'easy') {
      time += 5
    } else if (difficulty == 'medium') {
      time += 3
    } else {
      time += 2
    }
  }
});

const timeScore = setInterval(timeChanger, 1000)

function timeChanger() {
  time--
  timeEl.textContent = `${time}s`

  if (time <= 0) {
    clearInterval(timeScore)
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
  }
}

difficultyEl.addEventListener('change', function () {
  difficulty = difficultyEl.value
  localStorage.setItem('difficulty', difficulty)
})
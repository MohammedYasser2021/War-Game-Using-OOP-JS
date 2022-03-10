function Character(name, strength, health) {
  this.name = name
  this.strength = strength
  this.health = health
}
Character.prototype.attack = function (opponent) {
  opponent.health -= this.strength
  console.log(opponent.health)
}
Character.prototype.status = function () {
  console.log(`Name: ${this.name}`)
  console.log(`Strength: ${this.strength}`)
  console.log(`Health: ${this.health}`)
}
Character.prototype.makeHealth = function () {
  if (this.health < 100) {
    this.health += 10
  }

  if (this.health > 100) {
    this.health = 100
  }
  console.log(`Health: ${this.health}`)
}
let Narutoo = new Character('Naroutto', 10, 100)
let Sassaki = new Character('Sassaki', 5, 100)

Sassaki.status()
Narutoo.attack(Sassaki)
Sassaki.status()
Sassaki.makeHealth()

let NaruttoAttack = document.getElementById('Narutto-attack')
let SassakiAttack = document.getElementById('Sassaki-attack')
let SassakiHealthBtn = document.getElementById('Sassaki-health')
let NaruttoHealthBtn = document.getElementById('Narutto-health')
let NaruttoHealthSpan = document.querySelector('.Narutto span')
let SassakiHealthSpan = document.querySelector('.Sassaki span')

function styleHealth(Char, charSpan) {
  if (Char.health < 75 && Char.health >= 50) {
    charSpan.style.backgroundColor = '#90EE90'
  } else if (Char.health < 50 && Char.health >= 25) {
    charSpan.style.backgroundColor = '#FFA500'
  } else if (Char.health < 25) {
    charSpan.style.backgroundColor = '#F00'
  }
}

function healthBtn(char, charSpan) {
  char.makeHealth()
  charSpan.style.width = `${char.health}%`
  charSpan.style.backgroundColor = '#080'
}
NaruttoAttack.addEventListener('click', () => {
  Narutoo.attack(Sassaki)
  SassakiHealthSpan.style.width = `${Sassaki.health}%`
  styleHealth(Sassaki, SassakiHealthSpan)

  if (Sassaki.health <= 0) {
    SassakiAttack.remove()
    SassakiHealthBtn.remove()
    document.querySelector('.die-Sassaki').style.display = 'block'
    setTimeout(() => {
      document.querySelector('.result-overlay').style.display = 'block'
      document.querySelector('.result').innerHTML = `
      <span class="text-success p-2">Narutto</span> defeat <span class="text-danger p-2">Sassaki</span> 
      `
    }, 2000)
  }
})

SassakiAttack.addEventListener('click', () => {
  Sassaki.attack(Narutoo)
  NaruttoHealthSpan.style.width = `${Narutoo.health}%`
  styleHealth(Narutoo, NaruttoHealthSpan)

  if (Narutoo.health <= 0) {
    NaruttoAttack.remove()
    NaruttoHealthBtn.remove()
    document.querySelector('.die-Narutto').style.display = 'block'
    setTimeout(() => {
      document.querySelector('.result-overlay').style.display = 'block'
      document.querySelector('.result').innerHTML = `
      <span class="text-success p-2">Sassaki</span> defeat <span class="text-danger p-2">Narutoo</span> 
      `
    }, 2000)
  }
})

SassakiHealthBtn.addEventListener('click', () => {
  healthBtn(Sassaki, SassakiHealthSpan)
})
NaruttoHealthBtn.addEventListener('click', () => {
  healthBtn(Narutoo, NaruttoHealthSpan)
})

let StartBtn = document.querySelector('.start')
let overlay = document.querySelector('.overlay')
let userName = document.querySelector('.username span')

StartBtn.addEventListener('click', function () {
  let yourName = prompt('What is Your Name ?')
  // if your name is empty, change your name to Unknown
  if (yourName == null || yourName == '') {
    userName.innerHTML = 'Unknown'
  } else {
    // if your name is not empty, change your name to your name value
    userName.innerHTML = yourName
  }
  overlay.style.transform = 'scale(0)'
  // count down
  let countDown = setInterval(() => {
    // trigger function countdown timer
    secondPass()
  }, 1000)

  //  function countdown timer
  let count = document.querySelector('.count')
  let seconds = 120

  function secondPass() {
    let minutes = Math.floor(seconds / 60)
    let remSeconds = seconds % 60
    if (remSeconds < 10) {
      remSeconds = `0${remSeconds}`
    }

    count.innerHTML = `${minutes} : ${remSeconds}`
    if (seconds > 0) {
      seconds = seconds - 1
    } else {
      clearInterval(countDown)
      count.innerHTML = 'Finish'
      count.style.color = 'crimson'
      document.querySelector('.result-overlay').style.display = 'block'
      if (Narutoo.health > Sassaki.health) {
        document.querySelector('.result').innerHTML = `
        <span class="text-success p-2">Narutto</span> defeat <span class="text-danger p-2">Sassaki</span> 
        `
      } else if (Narutoo.health < Sassaki.health) {
        document.querySelector('.result').innerHTML = `
        <span class="text-success p-2">Sassaki</span> defeat <span class="text-danger p-2">Narutoo</span> 
        `
      } else {
        document.querySelector('.result').innerHTML = 'Draw'
      }
    }
  }
})

let startAgainBtn = document.querySelector('.start-again')

startAgainBtn.addEventListener('click', () => {
  document.querySelector('.result-overlay').style.display = 'none'
  location.reload()
})

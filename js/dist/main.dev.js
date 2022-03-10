"use strict";

function Character(name, strength, health) {
  this.name = name;
  this.strength = strength;
  this.health = health;
}

Character.prototype.attack = function (opponent) {
  opponent.health -= this.strength;
  console.log(opponent.health);
};

Character.prototype.status = function () {
  console.log("Name: ".concat(this.name));
  console.log("Strength: ".concat(this.strength));
  console.log("Health: ".concat(this.health));
};

Character.prototype.makeHealth = function () {
  if (this.health < 100) {
    this.health += 10;
  }

  if (this.health > 100) {
    this.health = 100;
  }

  console.log("Health: ".concat(this.health));
};

var Narutoo = new Character('Naroutto', 10, 100);
var Sassaki = new Character('Sassaki', 5, 100);
Sassaki.status();
Narutoo.attack(Sassaki);
Sassaki.status();
Sassaki.makeHealth();
var NaruttoAttack = document.getElementById('Narutto-attack');
var SassakiAttack = document.getElementById('Sassaki-attack');
var SassakiHealthBtn = document.getElementById('Sassaki-health');
var NaruttoHealthBtn = document.getElementById('Narutto-health');
var NaruttoHealthSpan = document.querySelector('.Narutto span');
var SassakiHealthSpan = document.querySelector('.Sassaki span');

function styleHealth(Char, charSpan) {
  if (Char.health < 75 && Char.health >= 50) {
    charSpan.style.backgroundColor = '#90EE90';
  } else if (Char.health < 50 && Char.health >= 25) {
    charSpan.style.backgroundColor = '#FFA500';
  } else if (Char.health < 25) {
    charSpan.style.backgroundColor = '#F00';
  }
}

function healthBtn(_char, charSpan) {
  _char.makeHealth();

  charSpan.style.width = "".concat(_char.health, "%");
  charSpan.style.backgroundColor = '#080';
}

NaruttoAttack.addEventListener('click', function () {
  Narutoo.attack(Sassaki);
  SassakiHealthSpan.style.width = "".concat(Sassaki.health, "%");
  styleHealth(Sassaki, SassakiHealthSpan);

  if (Sassaki.health <= 0) {
    SassakiAttack.remove();
    SassakiHealthBtn.remove();
    document.querySelector('.die-Sassaki').style.display = 'block';
    setTimeout(function () {
      document.querySelector('.result-overlay').style.display = 'block';
      document.querySelector('.result').innerHTML = "\n      <span class=\"text-success p-2\">Narutto</span> defeat <span class=\"text-danger p-2\">Sassaki</span> \n      ";
    }, 2000);
  }
});
SassakiAttack.addEventListener('click', function () {
  Sassaki.attack(Narutoo);
  NaruttoHealthSpan.style.width = "".concat(Narutoo.health, "%");
  styleHealth(Narutoo, NaruttoHealthSpan);

  if (Narutoo.health <= 0) {
    NaruttoAttack.remove();
    NaruttoHealthBtn.remove();
    document.querySelector('.die-Narutto').style.display = 'block';
    setTimeout(function () {
      document.querySelector('.result-overlay').style.display = 'block';
      document.querySelector('.result').innerHTML = "\n      <span class=\"text-success p-2\">Sassaki</span> defeat <span class=\"text-danger p-2\">Narutoo</span> \n      ";
    }, 2000);
  }
});
SassakiHealthBtn.addEventListener('click', function () {
  healthBtn(Sassaki, SassakiHealthSpan);
});
NaruttoHealthBtn.addEventListener('click', function () {
  healthBtn(Narutoo, NaruttoHealthSpan);
});
var StartBtn = document.querySelector('.start');
var overlay = document.querySelector('.overlay');
var userName = document.querySelector('.username span');
StartBtn.addEventListener('click', function () {
  var yourName = prompt('What is Your Name ?'); // if your name is empty, change your name to Unknown

  if (yourName == null || yourName == '') {
    userName.innerHTML = 'Unknown';
  } else {
    // if your name is not empty, change your name to your name value
    userName.innerHTML = yourName;
  }

  overlay.style.transform = 'scale(0)'; // count down

  var countDown = setInterval(function () {
    // trigger function countdown timer
    secondPass();
  }, 1000); //  function countdown timer

  var count = document.querySelector('.count');
  var seconds = 120;

  function secondPass() {
    var minutes = Math.floor(seconds / 60);
    var remSeconds = seconds % 60;

    if (remSeconds < 10) {
      remSeconds = "0".concat(remSeconds);
    }

    count.innerHTML = "".concat(minutes, " : ").concat(remSeconds);

    if (seconds > 0) {
      seconds = seconds - 1;
    } else {
      clearInterval(countDown);
      count.innerHTML = 'Finish';
      count.style.color = 'crimson';
      document.querySelector('.result-overlay').style.display = 'block';

      if (Narutoo.health > Sassaki.health) {
        document.querySelector('.result').innerHTML = "\n        <span class=\"text-success p-2\">Narutto</span> defeat <span class=\"text-danger p-2\">Sassaki</span> \n        ";
      } else if (Narutoo.health < Sassaki.health) {
        document.querySelector('.result').innerHTML = "\n        <span class=\"text-success p-2\">Sassaki</span> defeat <span class=\"text-danger p-2\">Narutoo</span> \n        ";
      } else {
        document.querySelector('.result').innerHTML = 'Draw';
      }
    }
  }
});
var startAgainBtn = document.querySelector('.start-again');
startAgainBtn.addEventListener('click', function () {
  document.querySelector('.result-overlay').style.display = 'none';
  location.reload();
});
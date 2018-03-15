var inJail;
var cycle = 0;
var scriptStartTimer;
var stopforBullets = 0;
var buyBullets;

function idler() {
  if (cycle == 30) {
    console.log("30 Cycles done. Checking how long we've been online.");
    setTimeout(function() {
      $('#header-stats > div.character.indented > div.inner > p:nth-child(1) > a')[0].click();
      setTimeout(function() {
        if (parseInt($('gn-modal-view > div > div > div > div > div > div > div.main > div.right > div > div:nth-child(1) > div.stat.status.online > p:nth-child(2)').text().substring(0, 2)) >= 16) {
          clearInterval(scriptStartTimer);
          console.log("Been online for 16 hours or above, halting script for a few hours.");
          $('#container > gn-left > div > div.menu > section:nth-child(9) > button')[0].click();
        } else {
          clearInterval(scriptStartTimer);
          console.log("Been online for less then 16 hours, taking a small break and will continue scripting.");
          setTimeout(function() {
            cycle = 0;
            scriptStart();
          }, Math.floor(Math.random() * 900000) + 600000);
        }
      }, 3000);
    }, Math.floor(Math.random() * 60000) + 30000);
  }
}

function jailCheck() {
  if ($('#header-stats > div.character.indented > div.prison').css('display') == "none") {
    return inJail = 0;
  } else {
    return inJail = 1;
  }
}

function pickDir() {
  Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
  }

  var directionElements = [
    $('#page-chase-attempt > div.controls > div > button.forward'),
    $('#page-chase-attempt > div.controls > div > button.right'),
    $('#page-chase-attempt > div.controls > div > button.uturn'),
    $('#page-chase-attempt > div.controls > div > button.left')
  ];

  var pickDirection = directionElements.randomElement();

  //if ($("#page-chase-attempt").attr('class') != "page-content area-chase disabled") {
  setTimeout(function() {
    if ($("#page-chase-attempt").attr('class') != "page-content area-chase disabled") {
      pickDirection.trigger("click");
    }
  }, 350); // small timeout to make sure dom is updated
}

function doAction() {
  jailCheck();
  if (inJail == 0) {
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.small.highlight').length == 1) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a.small.highlight')[0].click();
      return;
    }
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.vehicle_theft.highlight').length == 2) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a:nth-child(3)')[0].click();
      return;
    }
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.extortion.highlight').length == 1) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a.extortion.highlight')[0].click();
      return;
    }
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.chase.highlight').length == 1) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a.chase.highlight')[0].click();
      return;
    }
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.bomb.highlight').length == 1) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a.bomb.highlight')[0].click();
      return;
    }
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.fraud.highlight').length == 1) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a.fraud.highlight')[0].click();
      return;
    }
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.armed.highlight').length == 1) {
      $('#container > gn-left > div > div.menu > section:nth-child(2) > a.armed.highlight')[0].click();
      return;
    }
  }
}

function howManyTimes() {
  f = 0;
  if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.small.highlight').length == 1) {
    f++;
  }
  if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.vehicle_theft.highlight').length == 2) {
    f++;
  }
  if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.extortion.highlight').length == 1) {
    f++;
  }
  if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.chase.highlight').length == 1) {
    f++;
  }
  if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.bomb.highlight').length == 1) {
    f++;
  }
  var myMoney = $('#header-stats > a.money.indented > div.inner > table > tbody > tr:nth-child(1) > td:nth-child(2)').attr('title').substring(1);
  myMoney = myMoney.replace(/,/g, "");
  if (parseInt(myMoney) > 1000000) { // dont rely need this here, but triple checking is helpful.
    if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.armed.highlight').length == 1) {
      f++;
    }
  }
  if ($('#container > gn-left > div > div.menu > section:nth-child(2) > a.fraud.highlight').length == 1) {
    f++;
  }
  return f;
}

function scriptStart() {
  scriptStartTimer = setInterval(function() {
    triggerActionLoop();
  }, Math.floor(Math.random() * 180000) + 60000);
}

function bulletCheck() {
  var myMoney = $('#header-stats > a.money.indented > div.inner > table > tbody > tr:nth-child(1) > td:nth-child(2)').attr('title').substring(1);
  myMoney = myMoney.replace(/,/g, "");
  var time = $('#header-stats > div.clock.indented > div > p:nth-child(2)').text();
  if ((parseInt(time.substring(3, 5)) >= 56) && (parseInt(myMoney) > 50000)) {
    stopforBullets = 1;
    $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
  }
}

bulletCheck();


actions = howManyTimes() + 5;

function triggerActionLoop() {
  if (stopforBullets == 0) {
    bulletCheck();
    actions--;
    if (cycle == 30) {
      idler();
      console.log("Calling Idle()");
      actions = howManyTimes() + 5;
    } else if ((0 < actions) && (cycle != 30) && (stopforBullets == 0)) {
      console.log(actions);
      setTimeout(triggerActionLoop, Math.floor(Math.random() * 7000) + 4000);
      doAction();
    } else {
      console.log("Current Cycle : " + cycle);
      cycle++;
    }
  }
}

scriptStart();

if (typeof firstRun === 'undefined') {
  var firstRun = 1;
  setTimeout(triggerActionLoop, Math.floor(Math.random() * 10000) + 1000);
}

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a.small.highlight', function() {
  setTimeout(function() {
    if ($("#page-small-attempt").attr('class') != "page-content area-small disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Small Crimes") {
        for (var i = 10; i > 0; i--) {
          if (!$('#page-small-attempt > div.content-general > div > button:nth-child(' + i + ')').prop('disabled')) {
            $('#page-small-attempt > div.content-general > div > button:nth-child(' + i + ') > div.lockable-unlocked').trigger("click");
            break;
          }
        }
      }
    }
  }, Math.floor(Math.random() * 1000) + 100);
});

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a:nth-child(3)', function() {
  setTimeout(function() {
    if ($("#page-vehicletheft-attempt").attr('class') != "page-content area-vehicletheft disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Vehicle Theft") {
        for (var i = 6; i > 0; i--) {
          if (!$('#page-vehicletheft-attempt > div.content-general > div > button:nth-child(' + i + ')').prop('disabled')) {
            $('#page-vehicletheft-attempt > div.content-general > div > button:nth-child(' + i + ')').trigger("click");
            break;
          }
        }
      }
    }
  }, Math.floor(Math.random() * 1000) + 100);
});

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a.extortion.highlight', function() {
  setTimeout(function() {
    if ($("#page-extortion-attempt").attr('class') != "page-content area-extortion disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Extortion") {
        $('#page-extortion-attempt > div.content-general > form > div.attempt > button').trigger("click");
      }
    }
  }, Math.floor(Math.random() * 1000) + 100);
});

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a.chase.highlight', function() {
  setTimeout(function() {
    if ($("#page-chase-attempt").attr('class') != "page-content area-chase disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Police Chase") {
        setInterval(pickDir, Math.floor(Math.random() * 800) + 600);
      }
    }
  }, Math.floor(Math.random() * 1000) + 100);
});

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a.bomb.highlight', function() {
  setTimeout(function() {
    if ($("#page-bomb-attempt").attr('class') != "page-content area-bomb disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Bomb Defusal") {
        var bombClick = setInterval(function() {
          if (window.location.pathname == "/main/bomb") {
            var whichBomb = Math.floor(Math.random() * 4) + 1;
            if ($("#page-bomb-attempt").attr('class') != "page-content area-bomb disabled") {
              if ($('#page-bomb-attempt > div.bomb > button:nth-child(' + whichBomb + ')').attr("class") != "snipped") {
                $('#page-bomb-attempt > div.bomb > button:nth-child(' + whichBomb + ')')[0].click();
                setTimeout(function() {
                  clearInterval(bombClick);
                }, Math.floor(Math.random() * 3000) + 25020);
              }
            }
          }
        }, Math.floor(Math.random() * 1200) + 820);
      }
    }
  }, Math.floor(Math.random() * 1000) + 100);
});

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a.armed.highlight', function() {
  setTimeout(function() {
    $('#page-armed-attempt > div:nth-child(2) > div > button:nth-child(1) > div.details > p:nth-child(2)').trigger("click");
    if ($("#page-armed-attempt").attr('class') != "page-content area-armed disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Armed Robbery") {
        for (var i = 6; i > 0; i--) {
          if (!$('#page-armed-attempt > div:nth-child(3) > div > button:nth-child(' + i + ')').prop('disabled')) {
            $('#page-armed-attempt > div:nth-child(3) > div > button:nth-child(' + i + ') > div.lockable-unlocked').trigger("click");
            break;
          }
        }
      }
    }
  }, Math.floor(Math.random() * 1000) + 100);
});

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(2) > a.fraud.highlight', function() {
  setTimeout(function() {
    if ($("#page-fraud-attempt").attr('class') != "page-content area-fraud disabled") {
      if ($.trim($('#content > gn-page > div > header > h1').text()) == "Fraud") {
        if ($.trim($('#page-fraud-attempt > div.content-general > header > h1').text()) == "Which type of fraud are you planning?") {
          for (var i = 4; i > 0; i--) {
            if (!$('#page-fraud-attempt > div.content-general > div > button:nth-child(' + i + ')').prop('disabled')) {
              $('#page-fraud-attempt > div.content-general > div > button:nth-child(' + i + ') > div.lockable-unlocked')[0].click();
              break;
            }
          }
        }
        if ($.trim($('#page-fraud-attempt > div.content-general > div > button.primary.attempt > div').text()) != 0) {
          if ($.trim($('#page-fraud-attempt > div.content-general > div > button.primary.attempt > div').text()) < "79% Chance") {
            $('#page-fraud-attempt > div.content-general > div > button.secondary.plan')[0].click();
          } else if ($.trim($('#page-fraud-attempt > div.content-general > div > button.primary.attempt > div').text()) >= "79% Chance") {
            $('#page-fraud-attempt > div.content-general > div > button.primary.attempt')[0].click();
          }
        }
      }
    }
  }, Math.floor(Math.random() * 3000) + 1500);
});

function triggerBuyBullets() {
  var check = parseInt($('#page-bullets-purchase > div.content-general > div.box-outline.store > div.stock > div').attr('title').replace(/,/g, ''));
  if ($("page-bullets-purchase").attr('class') != "page-content area-bullets disabled") {
    stopforBullets = 1;
    $('#page-bullets-purchase > div.content-general > div.purchase > div.box-outline.purchase-form > form > button').trigger("click");
  }
}

$(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets', function() {
  setTimeout(function() {
    if ($('#content > gn-page > div > div > div.page-timer > div > div.countdown').length == 1) {
      console.log("Waiting for buy timer");
      var autoReloadBullets = setTimeout(function() {
        if ($('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets.highlight').length == 1) {
          $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
        }
        clearInterval(autoReloadBullets);
      }, Math.floor(Math.random() * 1000) + 500);
    } else {
      var myMoney = $('#header-stats > a.money.indented > div.inner > table > tbody > tr:nth-child(1) > td:nth-child(2)').attr('title').substring(1);
      myMoney = myMoney.replace(/,/g, "");
      var time = $('#header-stats > div.clock.indented > div > p:nth-child(2)').text();
      var check = parseInt($('#page-bullets-purchase > div.content-general > div.box-outline.store > div.stock > div').attr('title').replace(/,/g, ''));
      if ((parseInt(time.substring(3, 5)) >= 56) && (parseInt(myMoney) > 50000)) {
        console.log("Refreshing until bullets in stock.");
        stopforBullets = 1;
        setTimeout(function() {
          $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
        }, Math.floor(Math.random() * 25000) + 15000);
      } else if ((check > 50) && (parseInt(myMoney) > 50000)) {
        console.log("Buying bullets & Refreshing.");
        stopforBullets = 1;
        setTimeout(function() {
          $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
        }, Math.floor(Math.random() * 30000) + 15000);
        triggerBuyBullets();
      } else if ((parseInt(time.substring(3, 5)) <= 02) && (parseInt(myMoney) > 50000)) {
        stopforBullets = 1;
        etTimeout(function() {
          $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
        }, Math.floor(Math.random() * 20000) + 10000);
      } else {
        console.log("Can't buy bullets, either no stock or no money.");
        stopforBullets = 0;
      }
    }
  }, Math.floor(Math.random() * 2000) + 700);
});

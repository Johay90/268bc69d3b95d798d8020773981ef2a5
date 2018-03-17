var flyState = "Don't fly";
var inJail;
var cycle = 0;
var stopforBullets = 0;
var buyBullets;

setTimeout(function() {
  if ($('#page-index > div > div.external').length == 1) {
    if ($('#page-index > div > div.tabs > div.tabs-content.active > form > input:nth-child(1)').val() != "" && $('#page-index > div > div.tabs > div.tabs-content.active > form > input:nth-child(2)').val() != "") {
      console.log("Delaying for 10-15 mins!");
      setTimeout(function() {
        $('#page-index > div > div.tabs > div.tabs-content.active > form > button')[0].click();
      }, Math.floor(Math.random() * 900000) + 600000);
    } else {
      console.log("Cannot login as you don't have auto filler on.");
    }
  } else {

    // Since javascript gets blocked on dialog/alert/confirm boxes, we have to do dirty things here (also we cant alter cross-domain cookies, so fuck it, ugly code!)

    (function() {
      var confirm = window.confirm;
      unsafeWindow.confirm = function(question) {
        if (question == "Are you sure you would like to logout?") {
          return true;
        } else {
          return confirm(question);
        }
      };
    })()

    function bank() {

    }

    function idler() {
      if ($('#header-stats > div.character.indented > div.inner > p:nth-child(1) > a').length == 1) {
        if (cycle >= 20) {
          setTimeout(function() {
            $('#header-stats > div.character.indented > div.inner > p:nth-child(1) > a')[0].click();
            setTimeout(function() {
              var str = $('gn-modal-view > div > div > div > div > div > div > div.main > div.right > div > div:nth-child(1) > div.stat.status.online > p:nth-child(2)').text();
              if (str.search("Hours") != -1) {
                if (parseInt(str.substring(0, 2)) >= 5) {
                  console.log("Been online for 16 hours or above, halting script for a few hours.");
                  $('#container > gn-left > div > div.menu > section:nth-child(9) > button').trigger("click");
                } else {
                  console.log("Been online for less then 16 hours, will continue scripting.");
                  cycle = 0;
                  return;
                }
              } else {
                console.log("Can't find word hours, exiting this round of the Idler function.");
                cycle = 0;
                return;
              }
            }, 3400);
          }, Math.floor(Math.random() * 5000) + 1000);
        } else {
          return;
        }
      } else {
        cycle = 0;
        console.log("Something went wrong with the idler function. Aborting Idler check this run!");
        return;
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

      setTimeout(function() {
        if ($("#page-chase-attempt").attr('class') != "page-content area-chase disabled") {
          pickDirection.trigger("click");
        } else {
          if (typeof bombDefuseInt != "undefined") {
            console.log("Clearing Bomb defuse Interval");
            clearInterval(bombDefuseInt);
          }
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
        if ($('#container > gn-left > div > div.menu > section:nth-child(3) > a.prison.highlight').length == 1) {
          $('#container > gn-left > div > div.menu > section:nth-child(3) > a.prison.highlight')[0].click();
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
      if ($('#container > gn-left > div > div.menu > section:nth-child(3) > a.prison.highlight').length == 1) {
        f++;
      }
      return f;
    }

    function bulletCheck() {
      var myMoney = $('#header-stats > a.money.indented > div.inner > table > tbody > tr:nth-child(1) > td:nth-child(2)').attr('title').substring(1);
      myMoney = myMoney.replace(/,/g, "");
      var time = $('#header-stats > div.clock.indented > div > p:nth-child(2)').text();
      if ((parseInt(time.substring(3, 5)) >= 56) && (parseInt(myMoney) > 50000)) {
        stopforBullets = 1;
        setTimeout(function() {
          $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
        }, Math.floor(Math.random() * 1000) + 400);
      }
    }

    actions = howManyTimes() + 5;

    var i = 1;

    function myLoop() {
      setTimeout(function() {
        if (stopforBullets == 0) {
          if (cycle < 20) {
            doAction();
            actions--;
            bulletCheck();
            if (i < actions && stopforBullets == 0) {
              myLoop();
            } else if (stopforBullets == 0) {
              actions = howManyTimes() + 5;
              cycle++;
              console.log("Next Cycle: " + cycle);
              setTimeout(myLoop, Math.floor(Math.random() * 60000) + 30000);
            }
          } else {
            idler();
            setTimeout(myLoop, Math.floor(Math.random() * 60000) + 30000);
          }
        }
      }, Math.floor(Math.random() * 7000) + 4000);
    }

    bulletCheck();
    myLoop();

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
            bombDefuseInt = setInterval(pickDir, Math.floor(Math.random() * 800) + 600);
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
                    }, Math.floor(Math.random() * 3100) + 1000);
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
      }, Math.floor(Math.random() * 3100) + 1500);
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
          var autoReloadBullets = setInterval(function() {
            if ($('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets.highlight').length == 1) {
              $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
              clearInterval(autoReloadBullets);
            }
          }, Math.floor(Math.random() * 1000) + 500);
        } else {
          var myMoney = $('#header-stats > a.money.indented > div.inner > table > tbody > tr:nth-child(1) > td:nth-child(2)').attr('title').substring(1);
          myMoney = myMoney.replace(/,/g, "");
          var time = $('#header-stats > div.clock.indented > div > p:nth-child(2)').text();
          var check = parseInt($('#page-bullets-purchase > div.content-general > div.box-outline.store > div.stock > div').attr('title').replace(/,/g, ''));
          if ((parseInt(time.substring(3, 5)) >= 56) && (parseInt(myMoney) > 50000)) {
            console.log("Waiting until the hour mark.");
            stopforBullets = 1;
            var newBullets = setInterval(function() {
              var time2 = $('#header-stats > div.clock.indented > div > p:nth-child(2)').text();
              if (parseInt(time2.substring(3, 5)) < 56) {
                $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
                clearInterval(newBullets);
              }
            }, Math.floor(Math.random() * 1500) + 700);
          } else if ((check > 50) && (parseInt(myMoney) > 50000)) {
            console.log("Buying bullets & Waiting for timer.");
            stopforBullets = 1;
            triggerBuyBullets();
            var autoReloadBullets = setInterval(function() {
              if ($('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets.highlight').length == 1) {
                $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
                clearInterval(autoReloadBullets);
              }
            }, Math.floor(Math.random() * 1000) + 500);
          } else if ((parseInt(time.substring(3, 5)) <= 02) && (parseInt(myMoney) > 50000)) { //in very specific circumstances it could bugout, so here we just make sure it checks for new bullets
            stopforBullets = 1;
            setTimeout(function() {
              $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets')[0].click();
            }, Math.floor(Math.random() * 20000) + 10000);
          } else if (($('#container > gn-left > div > div.menu > section:nth-child(3) > a.airport.highlight').length == 1) && (parseInt(myMoney) > 50000)) {
            stopforBullets = 1;
            $('#content > gn-page > div > header > nav > a:nth-child(4)')[0].click();
            setTimeout(function() {
              for (c = 2; c < 12; c++) {
                if ($('#page-bullets-statistics > div.content-general.page-top-spacer-raised > div > div:nth-child(' + c + ') > div:nth-child(1) > a').length != 1) {
                  console.log("We're currently in " + $('#page-bullets-statistics > div.content-general.page-top-spacer-raised > div > div:nth-child(' + c + ') > div:nth-child(1)').text()); //TODO REORGANIZE THIS UGLY ASS CODE
                } else if ( parseInt( $('#page-bullets-statistics > div.content-general.page-top-spacer-raised > div > div:nth-child(' + c + ') > div.listview-cell.stock').text().replace(/,/g, "") ) > 1400 ) {
                  console.log("We should fly to " + $('#page-bullets-statistics > div.content-general.page-top-spacer-raised > div > div:nth-child(' + c + ') > div:nth-child(1) > a').text());
                  flyState = $('#page-bullets-statistics > div.content-general.page-top-spacer-raised > div > div:nth-child(' + c + ') > div:nth-child(1) > a').text();
                  $('#container > gn-left > div > div.menu > section:nth-child(3) > a.airport.highlight')[0].click();
                  break;
                }
              }
            }, Math.floor(Math.random() * 1000) + 100);
          } else {
            console.log("Can't buy bullets, either no stock, no money or we can't fly.");
            stopforBullets = 0;
            myLoop();
          }
        }
      }, Math.floor(Math.random() * 2000) + 700);
    });

    $(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(3) > a.prison.highlight', function() {
      setTimeout(function() {
        if ($("#page-prison-busting").attr('class') != "page-content area-prison disabled") {
          if ($.trim($('#content > gn-page > div > header > h1').text()) == "The Prison") {
            for (i = 1; i < 10; i++) {
              if ($('#page-prison-busting > div.content-general > div > button:nth-child(' + i + ')').attr('disabled') != "disabled") {
                $('#page-prison-busting > div.content-general > div > button:nth-child(' + i + ')').trigger("click");
                break;
              }
            }
          }
        }
      }, Math.floor(Math.random() * 1000) + 100);
    });

    $(document).on("click", '#container > gn-left > div > div.menu > section:nth-child(3) > a.airport.highlight', function() {
      setTimeout(function() {
        if ($("#page-airport-travel").attr('class') != "page-content area-airport disabled") {
          if (flyState != "Don't fly") {
            for (z = 0; z < 12; z++) {
              if ($('#page-airport-travel > div.content-general > div > div > div:nth-child(' + z + ') > div > p:nth-child(1)').text() == flyState) {
                $('#page-airport-travel > div.content-general > div > div > div:nth-child(' + z + ') > button')[0].click();
                setTimeout(function() {
                  $('#page-airport-travel > div.content-general > div > div > button:nth-child(3)')[0].click();
                }, Math.floor(Math.random() * 1000) + 100);
                setTimeout(function() {
                  $('#container > gn-left > div > div.menu > section:nth-child(3) > a.bullets.highlight')[0].click();
                }, Math.floor(Math.random() * 1000) + 100);
                flyState = "Don't fly";
                break;
              }
            }
          }
        }
      }, Math.floor(Math.random() * 1000) + 100);
    });

  }
}, Math.floor(Math.random() * 2500) + 1500);

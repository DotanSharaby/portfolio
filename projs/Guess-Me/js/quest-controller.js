'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // hide the game-start section
    var $startSec = $('.game-start');
    $startSec.hide();

    renderQuest();

    // show the quest section
    var $questSec = $('.quest');
    $questSec.show();
}

function renderQuest() {
    // select the <h2> inside quest and update its text by the currQuest text
    var $questTxt = $('.quest h2');
    var currQuest = getCurrQuest();
    $questTxt.text(currQuest.txt);
}

function onUserResponse(res) {

    // If this node has no children
    var currQuest = getCurrQuest();
    if (isChildless(currQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            $('.quest').hide();
            onRestartGame();
        } else {
            alert('I dont know...teach me!')
            // hide and show new-quest section
            $('.new-quest').show();
            $('.quest').hide();
            $('.pika-gif').show();
        }
    } else {
        // update the lastRes global var
        gLastRes = res;
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    // Call the service addGuess
    var $newGuessTxt = $('input[name="newGuess"]');
    var $newQuestTxt = $('input[name="newQuest"]');

    var newGuessTxt = $newGuessTxt.val();
    var newQuestTxt = $newQuestTxt.val();

    addGuess(newQuestTxt, newGuessTxt, gLastRes);
    onRestartGame();

    $newGuessTxt.val('');
    $newQuestTxt.val('');
}

function onRestartGame() {
    $('.pika-gif').hide();
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    restartGame();
}
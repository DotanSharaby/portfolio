'use strict';

const QUESTS_KEY = 'quests';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    var quests = loadQuestsFromStorage();
    if (!quests || quests.length === 0) {
        gQuestsTree = createQuest('Lightning type?');
        gQuestsTree.yes = createQuest('pikachu!');
        gQuestsTree.no = createQuest('Ash Ketchum');
    } else gQuestsTree = quests;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveQuestsToStorage();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree

    var currQuest = gCurrQuest;
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].no = currQuest;
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    saveQuestsToStorage();
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function getCurrQuest() {
    return gCurrQuest;
}

function saveQuestsToStorage() {
    saveToStorage(QUESTS_KEY, gQuestsTree);
}
function loadQuestsFromStorage() {
    return loadFromStorage(QUESTS_KEY);
}
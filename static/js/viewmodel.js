// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI

function AppViewModel() {
    botText = ko.observable("Hi!");//Los observables se modifican con el cambio
    userText = ko.observable("");
    numConcepts = ko.observable("");
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());


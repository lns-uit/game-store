var Split = require('split-grid')
Split({
    minSize: 75,
    columnGutters: [{
        track: 1,
        element: document.querySelector('.divide-gameview'),
    }],
})
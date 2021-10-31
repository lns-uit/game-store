var Split = require('split-grid')
Split({
    minSize: 200,
    columnGutters: [{
        track: 1,
        element: document.querySelector('.divide-gameview'),
    }],
})
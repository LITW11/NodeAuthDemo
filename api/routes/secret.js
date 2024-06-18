const router = require('express').Router();
const { ensureAuthenticated } = require('../auth');

function getRandomArbitrary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
}

// router.get('/getdata', ensureAuthenticated, (req, res) => { //this is like doing it at the Action level
//     res.json({ number: getRandomArbitrary(1, 1000) });
// });

router.get('/getdata', (req, res) => {
    res.json({ number: getRandomArbitrary(1, 1000) });
});

module.exports = router;
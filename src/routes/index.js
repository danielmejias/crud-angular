const router = require('express').Router()
router.get('/', (_req, res, _next) => {
    res.render('index.html')
})
module.exports = router
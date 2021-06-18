const router = require('express').Router();


router.get('*',(req, res) => {
    res.status(400).json({
        error: true,
        msg: 'END POINT DOES NOT EXIST'
    })
})

router.post('*',(req, res) => {
    res.status(400).json({
        error: true,
        msg: 'END POINT DOES NOT EXIST'
    })
})


router.put('*',(req, res) => {
    res.status(400).json({
        error: true,
        msg: 'END POINT DOES NOT EXIST'
    })
})


router.delete('*',(req, res) => {
    res.status(400).json({
        error: true,
        msg: 'END POINT DOES NOT EXIST'
    })
})




module.exports = router;
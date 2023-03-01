const router = require('express').Router()
const mongojs = require('mongojs')
const db = 'mongodb+srv://dbDanielMejias:Blackheart16@cluster0.rdt3z.mongodb.net/test' //mongojs(process.env.DB_CONNECTION, ['notas'])

router.get('/notas', (_req, res, next) => {
    db.tasks.find((err, tasks) => {
        if (err) return next(err);
        res.json(tasks)
    })
})
router.get('/notas:id', (req, res, next) => {
    db.tasks.findOne({ _id: mongojs.ObjectID(req.params.id) }, (err, task) => {
        if (err) return next(err);
        res.json(task)
    })
})
router.post('/notas', (req, res, next) => {
    const task = req.body
    if (!task.title || !(task.isDone + '')) {
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        db.tasks.save(task, (err, task) => {
            if (err) return next(err);
            res.json(task)
        })
    }
})
router.delete('/notas/:id', (req, res, _next) => {
    db.tasks.remove({ _id: mongojs.ObjectID(req.params.id.toString()) }, (err, result) => {
        if (err) return _next(err)
        res.json(result)
    })
})
router.put('/notas/:id', (req, res, next) => {
    const nota = req.body
    const updateNota = {}

    if (nota.isDone) {
        updateNota.isDone = nota.isDone
    }

    if (nota.title) {
        updateNota.title = nota.title
    }

    // console.log('updateNota -->', updateNota)

    if (!updateNota) {
        res.status(400).json({
            error: 'Bad Data'
        })
    } else {
        // db.tasks.update({ _id: mongojs.ObjectID(req.params.id.toString()) },
        //     updateNota, (err, nota) => {
        //         if (err) return next(err);
        //         res.json(nota)
        //     })

        db.tasks.updateOne({ _id: mongojs.ObjectID(req.params.id.toString()) },
            { $set: { title: updateNota.title, isDone: updateNota.isDone } },
            { upsert: true }
        ), (err, result) => {
            if (err) return next(err);
            res.json(result)
        }
    }
})
module.exports = router
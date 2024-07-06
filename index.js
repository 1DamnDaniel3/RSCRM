const express = require('express')
const userRouter = require('./routes/user.routes')
const leadRouter = require('./routes/lead.routes')
const studentRouter = require('./routes/student.routes')
const abonementsRouter = require('./routes/abonement.router')
const groupRouter = require('./routes/group.router')
const WKDgroupsRouter = require('./routes/wkd_groups.router')
const studentsAbonementsRouter = require('./routes/stud.abon.router')


const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json()); 

app.use('/api', userRouter)
app.use('/api', leadRouter)
app.use('/api', studentRouter)
app.use('/api', abonementsRouter)
app.use('/api', groupRouter)
app.use('/api', WKDgroupsRouter)
app.use('/api', studentsAbonementsRouter)



app.listen(PORT, ()=> console.log(`server startet on post${PORT}`))
const express = require('express')
const userRouter = require('./routes/user.routes')
const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json()); 

app.use('/api', userRouter)

app.listen(PORT, ()=> console.log(`server startet on post${PORT}`))
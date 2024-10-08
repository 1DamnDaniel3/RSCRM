const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const userRouter = require('./routes/user.routes');
const leadRouter = require('./routes/lead.routes');
const studentRouter = require('./routes/student.routes');
const abonementsRouter = require('./routes/abonement.router');
const groupRouter = require('./routes/group.router');
const WKDgroupsRouter = require('./routes/wkd_groups.router');
const studentsAbonementsRouter = require('./routes/stud.abon.router');
const clientsRouter = require('./routes/client.routes');
const paymentRouter = require('./routes/payment.routes');
const entityGroupRouter = require('./routes/entityGrops.routes');

const uploadRouter = require('./routes/other/upload.router');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: 'http://localhost:2999', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Если вам нужно передавать куки или авторизационные данные
  }));

app.use(express.json());
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads'));

app.use('/api', userRouter);
app.use('/api', leadRouter);
app.use('/api', studentRouter);
app.use('/api', abonementsRouter);
app.use('/api', groupRouter);
app.use('/api', WKDgroupsRouter);
app.use('/api', studentsAbonementsRouter);
app.use('/api', clientsRouter);
app.use('/api', paymentRouter);
app.use('/api', entityGroupRouter);

app.use('/api', uploadRouter);



app.listen(PORT, ()=> console.log(`server startet on post${PORT}`));
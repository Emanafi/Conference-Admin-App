import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import generalRoutes from './routes/general.js';
import speechesRoutes from './routes/speeches.js';
import attendeesRoutes from './routes/attendees.js';
import conferenceRoutes from './routes/conference.js';
import usersRoutes from './routes/users.js';

// Configurations
dotenv.config();
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/general', generalRoutes)
app.use('/speeches', speechesRoutes)
app.use('/attendees', attendeesRoutes)
app.use('/conference', conferenceRoutes)
app.use('/users', usersRoutes)

// Mongoose
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res) => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})
.catch( error => {
    console.log(`Error connecting to MongoDB: ${error}`)
})
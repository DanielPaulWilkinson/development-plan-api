import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import Logging from './Logging';
import { config } from './config/config';
import categoryRoutes from './routes/Category';
import skillRoutes from './routes/Skills';
import seedRoutes from './routes/Seed';
import userRoutes from './routes/User'

const router = express();

router.set('port', process.env.PORT || 3001);

mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.success('Mongo Connected!');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect');
        Logging.error(error);
    });

const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
        });

        next();
    });

    /** API Rules */
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    router.use('/seed', seedRoutes);
    router.use('/user',userRoutes)
    router.use('/categories', categoryRoutes);
    router.use('/skills', skillRoutes);

    /** Health check */
    router.get('/ping', (req, res, next) => {
        Logging.info('Called me');
        return res.status(200).json({ message: 'world' });
    });

    /** Error Handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        return res.status(404).json({
            message: error.message
        });
    });

    /** Create Server */
    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};

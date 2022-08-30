import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from '@src/config/config';
import Logging from '@src/library/Logging';
import { errorMiddleware, notFound } from '@src/middleware';
import { chatRoute, userRoute } from '@src/routes';

const app = express();

/**
 * connect to mongo
 */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB');
    startServer();
  })
  .catch(error => {
    Logging.error('Unable to connect');
    Logging.error(error);
  });

/**
 * Only start the server if mongoDB connects
 */
function startServer() {
  app.use((req, res, next) => {
    /** Log the request */
    Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /** Log the response */
      Logging.info(
        `Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  /** Middlewares */
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** API Rules */
  // eslint-disable-next-line consistent-return
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Method', 'PUT, PATCH, DELETE, POST, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use('/api/chat', chatRoute);
  app.use('/api/user', userRoute);

  /** Error Handling */
  // Middleware to handle errors and not found routes
  app.use(notFound);
  app.use(errorMiddleware);

  /** Create Server */
  http.createServer(app).listen(config.server.port, () => {
    Logging.info(`Server started on port ${config.server.port}`);
  });
}

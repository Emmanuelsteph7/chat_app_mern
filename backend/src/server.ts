import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import { config } from '@src/config/config';
import Logging from '@src/library/Logging';
import { errorMiddleware, notFound } from '@src/middleware';
import { chatRoute, messageRoute, userRoute } from '@src/routes';
import { EventsObj, SIXTY_SECONDS } from './constants';
import { MessageI, UserI } from './types';

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
  app.use(cors());

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
  app.use('/api/message', messageRoute);

  /** Error Handling */
  // Middleware to handle errors and not found routes
  app.use(notFound);
  app.use(errorMiddleware);

  /** Create Server */
  const server = http.createServer(app).listen(config.server.port, () => {
    Logging.info(`Server started on port ${config.server.port}`);
  });

  const io = new Server(server, {
    // pingTimeout is the amount of time it will wait while being inactive
    // it will close the connection to save the bandwidth
    pingTimeout: SIXTY_SECONDS,
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', socket => {
    console.log('connected to socket', socket.id);

    socket.on(EventsObj.Setup, (user: UserI) => {
      // eslint-disable-next-line no-underscore-dangle
      socket.join(user._id);
      socket.emit(EventsObj.Connected);
    });

    socket.on(EventsObj.JoinRoom, (roomId: string) => {
      socket.join(roomId);

      console.log('User joined room', roomId);
    });

    // eslint-disable-next-line consistent-return
    socket.on(EventsObj.NewMessage, (message: MessageI) => {
      const { chat } = message;

      if (!chat.users) return Logging.warn('chat.users not defined');

      chat.users.forEach(user => {
        // eslint-disable-next-line no-underscore-dangle
        if (user._id === message.sender._id) return;

        // eslint-disable-next-line no-underscore-dangle
        socket.in(user._id).emit(EventsObj.MessageReceived, message);
      });
    });

    socket.on(EventsObj.Typing, (room: string) => {
      socket.in(room).emit(EventsObj.Typing);
    });

    socket.on(EventsObj.StopTyping, (room: string) => {
      socket.in(room).emit(EventsObj.StopTyping);
    });

    socket.off(EventsObj.Setup, (user: UserI) => {
      console.log('user disconnected');
      // eslint-disable-next-line no-underscore-dangle
      socket.leave(user._id);
    });
  });
}

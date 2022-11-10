import { Server } from 'http';
import socketio, { Server as WebSocketServer, Socket as WebSocket } from 'socket.io';
import { CORS_ADDRESS } from './config';
import { v4 as uuidv4 } from 'uuid';

class SocketServer {
  private socketServer: WebSocketServer;

  init(server: Server) {
    this.socketServer = new socketio.Server(server, {
      cors: {
        origin: CORS_ADDRESS,
        credentials: true,
        methods: ['GET, POST, PUT, DELETE, OPTIONS'],
        allowedHeaders: [
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With,' + ' Content-Type, Accept,' + ' Authorization,' + ' Access-Control-Allow-Credentials',
        ],
      },
    });

    this.socketServer.on('connection', (socket: WebSocket) => {
      console.log('A session connected');
      socket.emit('session', { id: uuidv4() });

      //Whenever someone disconnects this piece of code executed
      socket.on('disconnect', () => {
        console.log('A session got disconnected');
      });
    });
  }

  emit(topic: string, data: any) {
    this.socketServer.emit(topic, data);
  }
}

export const socketServer = new SocketServer();

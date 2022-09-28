import { randomUUID } from 'crypto';
import { Server } from 'http';
import socketio, { Server as WebSocketServer, Socket as WebSocket } from 'socket.io';
import { CORS_ADDRESS } from './config';

class SocketServer {
  private serverSocket: WebSocketServer;

  init(server: Server) {
    this.serverSocket = new socketio.Server(server, {
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

    this.serverSocket.on('connection', (socket: WebSocket) => {
      console.log('A session connected');
      socket.emit('session', { id: randomUUID() });

      //Whenever someone disconnects this piece of code executed
      socket.on('disconnect', () => {
        console.log('A session got disconnected');
      });
    });
  }

  emit(topic: string, data: any) {
    this.serverSocket.emit(topic, data);
  }
}

export const socketServer = new SocketServer();

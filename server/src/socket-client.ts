import socketIOClient, { Socket } from 'socket.io-client';
import { SPHERON_API_HOST } from './config';

export class SocketClient {
  private client: Socket;

  async connect() {
    this.client = socketIOClient(SPHERON_API_HOST, {
      transports: ['websocket'],
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {
      this.client.on('connect', function () {
        console.log('Deployment client connected...');
        resolve({ message: 'Connection established' });
      });
    });
  }

  listen(topic: string, callback: (stream: any) => void) {
    this.client.on(topic, callback);
  }

  destroy() {
    this.client.disconnect();
  }
}

import { io } from 'socket.io-client';
let socket;
export const initSocket = (token) => {
socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000', { transports: ['websocket'] });
socket.on('connect', () => {
socket.emit('identify', { token });
});
return socket;
};


export const getSocket = () => socket;
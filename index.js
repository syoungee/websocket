/*

WebSocket은 ws 프로토콜을 기반으로 클라이언트와 서버 사이에 지속적인 완전 ✨양방향 연결 스트림✨을 만들어 주는 기술입니다. 
일반적인 웹소켓 클라이언트는 사용자의 브라우저일 것이지만, 그렇다고 해서 이 프로토콜이 플랫폼에 종속적이지는 않습니다.


WebSocket WebSocket(
    in DOMString url,
    in optional DOMString protocols
)

url - 필수 파라미터, WebSocket 서버가 응답할 URL이어야 함
protocols - 하나의 프로토콜 문자열, 또는 프로토콜 문자열의 배열
이 문자열들은 서브 프로토콜을 지정하는데 사용되어, 하나의 서버가 여러 개의 WebSocket 서브 프로토콜을 구현할 수 있도록 해줌

*/
// express, ws 객체 생성

const express = require('express');
const ws = require('ws');

const app = express();

const httpServer = app.listen(3001, () => {
	console.log('The server runs on port 3001.');
});

const webSocketServer = new ws.Server({
	server: httpServer,
});

webSocketServer.on('connection', (ws, request) => {
	// connected client ip
	const ip = request.socket.remoteAddress;
	console.log(`[${ip}] connected - client`);

	// connection successed
	if (ws.readyState === ws.OPEN) {
		console.log(`Client: IP[${ip}] connected`);
	}

	// Event Handling when a message is received
	ws.on('message', (msg) => {
		console.log(`${msg} [${ip}]`);
		ws.send(`Message: ${msg} I checked my message.`);
	});

	// Error Handling
	ws.on('error', (error) => {
		console.log(`Error: ${error} [${ip}]`);
	});

	// connection termination
	ws.on('close', () => {
		console.log(`End: [${ip}] End connection`);
	});
});

# [Valorant WebSocket Log Viewer](https://techchrism.github.io/valorant-websocket-log-viewer/)
Webapp designed to ease looking through Valorant WebSocket events.  
Log files can be generated from [https://github.com/techchrism/valorant-websocket-logger](https://github.com/techchrism/valorant-websocket-logger)

![Screenshot](https://i.imgur.com/yN4w05p.png)

## Features
 - Automatically decode "private" data (base64 json fields and string json fields)
 - Summary in listing for common events such as presence and chat
 - Time delta calculation (time between message received and data timestamp)
 - Fast searching

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

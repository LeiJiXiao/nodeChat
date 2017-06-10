/**
 * Created by xiaoleiji on 2017/5/22.
 */
const express = require( 'express' );
const app = express();
const server  = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( server );
const cookies = require( 'cookie-parser' );
const session = require( 'express-session' );
const router = require( './controller/routers' );

app.set('view engine', 'ejs');
app.use( express.static( './static' ) );
app.use( express.static( './avatar' ) );
app.use( cookies() );
app.use( session({
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 1800000 },
    rolling: true,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}) );
app.use( router );

io.on( 'connection', ( socket ) => {
    socket.on( 'msg', ( res ) => {
        io.emit( 'msg', res );
    } );
} );
server.listen( 3000, '127.16.100.194' );


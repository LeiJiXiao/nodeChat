/**
 * Created by xiaoleiji on 2017/6/2.
 */
var socket = io();
function emitMsg() {
    if ( $( '#msg' ).val() ) {
        socket.emit( 'msg', {content:$( '#msg' ).val(),name: $( '#userName' ).text()});
        $( '#msg' ).val( '' );
    }
}
$( '#sendMsg' ).on( 'click', function() {
    emitMsg();
} );
$(document).keydown( function( e ) {
    if ( e.keyCode === 13 ){
        emitMsg();
    }
} );
socket.on( 'msg', function ( res ) {
    $( '#chatroom' ).append( '<li><i id="name">'+  res.name+':</i><span>'+ res.content +'</span></li>' );
} );
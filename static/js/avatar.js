/**
 * Created by xiaoleiji on 2017/6/2.
 */
$(function($){
    var jcrop_api;
    $('#target').Jcrop({
        onChange:   showCoords,
        onSelect:   showCoords,
        onRelease:  clearCoords
    },function(){
        jcrop_api = this;
    });
    $('#coords').on('change','input',function(e){
        var x1 = $('#x1').val(),
            x2 = $('#x2').val(),
            y1 = $('#y1').val(),
            y2 = $('#y2').val();
        jcrop_api.setSelect([x1,y1,x2,y2]);
    });
});
function showCoords(c) {
    $('#x1').val(c.x);
    $('#y1').val(c.y);
    $('#x2').val(c.x2);
    $('#y2').val(c.y2);
    $('#w').val(c.w);
    $('#h').val(c.h);
}
function clearCoords() {
    $('#coords input').val('');
}
//头像上传
var options = {
    success: function( result ) {
        if ( result.success ) {
            location.reload();
        } else {
            $( '#layer' ).hide();
            $( '.alert-danger' ).show().text( result.msg );
        }
    } ,
    error: function( result ) {
        $( '#layer' ).hide();
    }
}
$( '#submitUpload' ).click( function() {
    console.log($( '#avatar' ).val());
    if ( $( '#avatar' ).val() === '' ) {
        return;
    }
    $( '#layer' ).show();
    $( '#uploadAvatarForm' ).ajaxSubmit( options );
} );
//头像剪裁
function corp() {
    $.get( 'doTailoringAvatar', {
        W: $('#w').val(),
        H: $('#h').val(),
        X: $('#x1').val(),
        Y: $('#y1').val()
    }, function( result ) {
        if ( result.success ) {
            location.href = '/index';
        } else {
            $( '.alert-danger' ).show().text( result.msg );
        }
    } );
}
$( '#submitCorp' ).on( 'click', function() {
    if ( $('#w').val() !== '' && $('#h').val() !== '' && $('#x1').val() !== '' && $('#y1').val() !== '' && $('#w').val() !== '' ) {
        corp();
    } else {
        $( '.alert-danger' ).show().text( '请先裁剪' );
    }
} );
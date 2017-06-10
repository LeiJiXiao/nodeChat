/**
 * Created by xiaoleiji on 2017/6/2.
 */
function submitRegister() {
    $.post( 'doRegister', {
        name: $( '#name' ).val(),
        phone: $( '#phone' ).val(),
        password: $( '#password' ).val(),
        avatarUrl: ''
    }, function( result ) {
        if ( result.success ) {
            $( '.alert-info' ).show().text( '注册成功2秒后跳转...' );
            setTimeout( function() {
                location.href = '/index';
            }, 2000 );
        } else {
            $( '.alert-danger' ).show().text( result.msg );
        }
    } );
}
function valid( el ) {
    return $( '#' + el ).val() !== '';
}
$( '.btn' ).on( 'click', function() {
    if ( valid( 'name' ) && valid( 'phone' ) && valid( 'password' )  ) {
        submitRegister();
    } else {
        alert( 'err!' )
    }
} );
$( '#phone' ).on( 'focus', function () {
    $( '.alert-danger' ).hide();
} )
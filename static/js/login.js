/**
 * Created by xiaoleiji on 2017/6/2.
 */
function submitLogin() {
    $.post( 'doLogin', {
        phone: $( '#phone' ).val(),
        password: $( '#password' ).val()
    }, function( result ) {
        if ( result.success ) {
            $( '.alert-info' ).show().text( '登录成功2秒后跳转...' );
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
    if ( valid( 'phone' ) && valid( 'password' )  ) {
        submitLogin();
    } else {
        alert( 'err!' )
    }
} );
$( '#phone, #password' ).on( 'focus', function() {
    $( '.alert-danger, .alert-info' ).hide();
} )

/**
 * Created by xiaoleiji on 2017/6/1.
 */
const formidable = require( 'formidable' );

const md5 = require( '../md5' );
const db = require( '../dbs' );

exports.doLogin = ( req, res ) => {
    const form = new formidable.IncomingForm();
    form.parse( req, function( err, fields, files ) {
        console.log( fields );
        db.UserInfo.repeatValid( fields.phone, ( err, doc ) => {
            if ( err ) {
                throw err;
            }
            if ( doc.length === 0 ) {
                //未注册
                res.send( { success: false, msg: '该手机号未注册' } );
            } else {
                //已注册继续登录
                const v = md5( md5( fields.password ).substr( 15 ) );
                if ( doc[ 0 ].password === v ) {
                    req.session.login = 1;
                    req.session.userName = fields.phone;
                    res.send( { success: true } );
                } else {
                    res.send( { success: false, msg: '密码错误，请重新输入。' } );
                }
            }
        } );
    } );
}

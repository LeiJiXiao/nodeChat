/**
 * Created by xiaoleiji on 2017/6/1.
 */
const formidable = require( 'formidable' );
const mongoose = require( 'mongoose' );

const md5 = require( '../md5' );
const db = require( '../dbs' );

exports.doRegister = ( req, res ) => {
    const form = new formidable.IncomingForm();
    form.parse( req, function( err, fields, files ) {
        console.log( fields );
        //查找注册用户是否已存在
        db.UserInfo.repeatValid( fields.phone, ( err, doc ) => {
            if ( err ) {
                throw err;
            }
            if ( doc.length !== 0 ) {
                res.send( { success: false, msg: '该手机号已经注册' } );
            } else {
                //未注册再加密完成注册
                fields.password = md5( md5( fields.password ).substr( 15 ) );
                db.UserInfo.create( fields, ( err, result ) => {
                    if ( err ) {
                        throw err;
                    }
                    //注册成功设置登录态
                    req.session.login = 1;
                    req.session.userName = fields.phone;
                    res.send( { success: true } );
                } );
            }
        } );
    } );
}
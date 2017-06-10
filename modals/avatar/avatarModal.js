/**
 * Created by xiaoleiji on 2017/6/1.
 */
const path = require( 'path' );
const fs = require( 'fs' );
const mongoose = require( 'mongoose' );
const formidable = require( 'formidable' );
const gm = require( 'gm' );

const findUser = require( '../common/findUser' );

exports.avatarShow = ( req, res ) => {
    if ( parseInt( req.session.login ) === 1 ) {
        findUser.findUserInfo( req.session.userName, ( user ) => {
            console.log( `===>${user.avatarUrl}` );
            res.render( 'avatar', {
                login: true,
                userName: user.name,
                avatar: user.avatarUrl
            } );
        } );
    } else {
        res.render( 'login', {
            active: 'login',
            login: false,
            userName: '',
        } );
    }
}

exports.uploadAvatar = ( req, res ) => {
    const form = new formidable.IncomingForm();
    const avatarUrl = path.resolve( __dirname, '../avatar' );
    form.uploadDir = avatarUrl;
    form.parse( req, function( err, fields, files ) {
        if ( err ) {
            console.log( err );
            res.send( { success: false, msg: '上传错误！' } );
        }
        //格式化旧的文件路径和name;
        const oldUrl = path.normalize( files.avatar.path );
        //判断文件类型，非img类型则删除
        const fileType = files.avatar.type.split( '/' )[ 0 ];
        if ( fileType !== 'image' ) {
            console.log( `delete: ${oldUrl}` );
            fs.unlinkSync( oldUrl );
            res.send( { success: false, msg: '请上传images类型文件！' } );
            return;
        }
        //console.log( files );
        //根据用户信息拼接新的文件name
        const userName = req.session.userName;
        const newName = userName + path.extname( files.avatar.name );
        const newUrl = `${avatarUrl}/` + newName;
        console.log( newUrl );
        //更新头像之前先查找，删除用户之前上传的头像
        db.UserInfo.find( { phone: userName }, ( err, doc ) => {
            if ( err ) {
                throw err;
            }
            const avatar = doc[ 0 ].avatarUrl;
            if ( !!avatar ) {
                fs.unlinkSync( `${avatarUrl}/${avatar}` );
            }
            //更改文件name
            fs.renameSync( oldUrl, newUrl );
            doc[ 0 ].avatarUrl = newName;
            doc[ 0 ].save( ( err ) => {
                if ( err ) {
                    throw err;
                }
                res.send( { success: true } );
            } )
        } );

        /*db.UserInfo.update( { phone: userName }, { $set: { avatarUrl: newName } }, ( err, result ) => {
         if ( err ) {
         throw err;
         }
         res.send( { success: true } );
         } );*/
    } );
}

exports.doTailoringAvatar = ( req, res ) => {
    const W = req.query.W;
    const H= req.query.H;
    const X = req.query.X;
    const Y = req.query.Y;
    console.log( `${W}+${H}+${X}+${Y}` );
    const avatarUrl = path.resolve( __dirname, '../avatar' );
    const userName = req.session.userName;
    db.UserInfo.find( { phone: userName }, ( err, doc ) => {
        if ( err ) {
            throw err;
        }
        const avatar = doc[ 0 ].avatarUrl;
        const cropAvatar = `${new Date().getTime()}.${avatar}`;
        if ( !!avatar ) {
            gm( `${avatarUrl}/${avatar}` )
                .crop( W, H, X, Y )
                .resize( 100, 100, '!' )
                .write( `${avatarUrl}/${cropAvatar}`, function( err ) {
                    if ( err ) {
                        console.log( err );
                        return;
                    }
                    fs.unlinkSync( `${avatarUrl}/${avatar}` );
                    doc[ 0 ].avatarUrl = cropAvatar;
                    doc[ 0 ].save( ( err ) => {
                        if ( err ) {
                            throw err;
                        }
                        res.send( { success: true } );
                    } );
                } );
        } else {
            res.send( { success: false, msg: '默认头像无需剪裁哦！' } );
        }
    } );
}

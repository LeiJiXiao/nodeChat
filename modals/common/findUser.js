/**
 * Created by xiaoleiji on 2017/6/1.
 */
const db = require( '../dbs' );

exports.findUserInfo = ( userName, callback ) => {
    db.UserInfo.repeatValid( userName, ( err, doc ) => {
        if ( err ) {
            throw err;
        }
        callback( doc[ 0 ] );
    } );
}
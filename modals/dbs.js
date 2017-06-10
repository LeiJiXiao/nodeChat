/**
 * Created by xiaoleiji on 2017/5/22.
 */
const mongoose = require( 'mongoose' );
const url = require( '../setting' ).MongoDBUrl;

mongoose.connect( url );
const db = mongoose.connection;

db.on( 'error', ( err ) => {
    console.log( `connection: ${err}` );
} );
db.once( 'open', ( err ) => {
    console.log( `connection: ${url}` );
} );

const userInfoSchema = new mongoose.Schema( {
    name      : String,
    phone     : String,
    password  : String,
    avatarUrl : String
} );
userInfoSchema.statics.repeatValid = function( phone, callback ) {
    this.find({ phone: phone }, callback );
}

const UserInfo = mongoose.model( 'UserInfo', userInfoSchema );
exports.UserInfo = UserInfo;

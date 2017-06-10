/**
 * Created by xiaoleiji on 2017/5/22.
 */
/*
    DAO封装
 */
const MongoClient = require( 'mongodb' ).MongoClient;
const url = require( '../setting' ).MongoDBUrl;

/**
 *  链接...
 * @param url
 * @param callback
 * @private
 */
 function _connectDB ( callback ) {
    MongoClient.connect( url, ( err, db ) => {
        if ( err ) {
            throw  `connect: ${err}`;
        }
        callback( db );
    } );
 }

/**
 * 增加
 * @param collectionName
 * @param json
 * @param callback
 */
 exports.insertMany = ( collectionName, json, callback ) => {
    _connectDB( ( db ) => {
        db.collection( collectionName ).insertMany( [ json ], ( err, result ) => {
            callback( err, result );
            db.close();
        } );
    } );
 }

/**
 * 删除
 * @param collectionName
 * @param json
 * @param callback
 */
 exports.deleteMany = ( collectionName, json, callback ) => {
    _connectDB( ( db ) => {
        db.collection( collectionName ).deleteMany( json, ( err, result ) => {
            callback( err, result );
            db.close();
        } );
    } );
 }

/**
 * 修改
 * @param collectionName
 * @param json1
 * @param json2
 * @param callback
 */
 exports.updateMany = ( collectionName, json1, json2, callback ) => {
    _connectDB( ( db ) => {
        db.collection( collectionName ).updateMany( json1, json2, ( err, result ) => {
            callback( err, result );
            db.close();
        } );
    } );
 }

/**
 * find
 * @param collectionName
 * @param json
 * @param arr
 */
 exports.find = ( collectionName, json, arr, callback ) => {
     const limit = arr[0] || 0;
     const skip = limit * ( arr[1] -1 ) || 0;
     _connectDB( ( db ) => {
        const list = db.collection( collectionName ).find( json ).limit( limit ).skip( skip );
        list.toArray( ( err, docs ) => {
            callback( err, docs );
            db.close();
        } );
     } );
 }
/**
 * Created by xiaoleiji on 2017/5/19.
 */
const crypto = require( 'crypto' );
module.exports = ( v ) => {
    const md5 = crypto.createHash( 'md5' );
    return md5.update( v ).digest( 'hex' );
}

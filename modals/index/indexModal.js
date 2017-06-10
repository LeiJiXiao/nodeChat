/**
 * Created by xiaoleiji on 2017/6/1.
 */
const findUser = require( '../common/findUser' );

exports.indexShow = ( req, res ) => {
    if ( parseInt( req.session.login ) === 1 ) {
        findUser.findUserInfo( req.session.userName, ( user ) => {
            res.render( 'index', {
                login: true,
                userName: user.name,
                avatar: user.avatarUrl
            } );
        } );
    } else {
        res.render( 'index', {
            login: false,
            active: 'index'
        } );
    }
}

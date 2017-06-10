/**
 * Created by xiaoleiji on 2017/5/23.
 */
const express = require('express');
const router = express.Router();

const index = require( '../modals/index/indexModal' );
const register = require( '../modals/register/registerModal' );
const login = require( '../modals/login/loginModal' );
const avatar = require( '../modals/avatar/avatarModal' );

//index
router.get( '/index', ( req, res ) => {
    index.indexShow( req, res );
} );

//register
router.get( '/register', ( req, res ) => {
    res.render( 'register', {
        active: 'register',
        login: false
    } );
} );

router.post( '/doRegister', ( req, res ) => {
    register.doRegister( req, res );
} );

//login
router.get( '/login', ( req, res ) => {
    res.render( 'login', {
        active: 'login',
        login: false,
        userName: '',
    } );
} );

router.post( '/doLogin', ( req, res ) => {
    login.doLogin( req, res );
} );

//logout
router.get( '/logout', ( req, res ) => {
    req.session.login = '';
    res.render( 'login', {
        active: 'login',
        login: false,
        userName: '',
    } );
} );

//avatar
router.get( '/avatar', ( req, res ) => {
    avatar.avatarShow( req, res );
} );

//avatar-upload
router.post( '/uploadAvatar', ( req, res ) => {
    avatar.uploadAvatar( req, res );
} );

router.get( '/doTailoringAvatar', ( req, res ) => {
    avatar.doTailoringAvatar( req, res );
} );

module.exports = router;

import Authentication from './controllers/authentication';
import passortService from './services/passport_service';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });

export default function ( app ) {

    app.get( '/', requireAuth, (req, res)=>{
        res.send({ hi: 'there'});
    });

    app.post( '/signup', Authentication.signup );
}
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
   serverTokenEndpoint: 'http://46.4.90.221:3321/sign-in'
});

import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService
  ) {
    super({
      // Put config in `.env` and dont forget configModule in appModule
      //to get google clientID goto google developer console and create from credentials
      clientID: configService.get('OAUTH_GOOGLE_ID'),
      clientSecret: configService.get('OAUTH_GOOGLE_SECRET'),
      callbackURL: configService.get('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile']
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      _accessToken
    }
    return user;
  }
}

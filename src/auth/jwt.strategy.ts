
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

//For the jwt-strategy, Passport first verifies the JWT's signature(token) and decodes the JSON.
//It then invokes our validate() method passing the decoded JSON(payload) as its single parameter.
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

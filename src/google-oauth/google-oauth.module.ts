import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy,ConfigService],
})
export class GoogleOauthModule {}

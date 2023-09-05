import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestBody } from './dto/auth.dto';
import { ContextIdStrategy } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const signin_dto = new SignInRequestBody();
    signin_dto.email = email;
    signin_dto.password = password;
    const account = await this.authService.signIn(signin_dto);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}

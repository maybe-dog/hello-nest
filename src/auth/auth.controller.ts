import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SignInRequestBody, SignUpRequestBody } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Account } from 'src/accounts/core/entity/account.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'サインアップ成功', type: Account })
  @ApiBadRequestResponse({ description: 'サインアップ失敗' })
  @ApiConflictResponse({
    description: 'サインアップ失敗(アカウントが既に存在する場合)',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signUp(@Body() body: SignUpRequestBody): Promise<Account> {
    return await this.authService.signUp(body);
  }

  @ApiOkResponse({ description: 'サインイン成功', type: Account })
  @ApiUnauthorizedResponse({ description: 'サインイン失敗' })
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signin')
  async signIn(
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() body: SignInRequestBody,
  ): Promise<Account> {
    return req.user;
  }
}

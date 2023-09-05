import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/core/entity/account.entity';
import { promisify } from 'util';
import { SignInRequestBody, SignUpRequestBody } from './dto/auth.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private accountService: AccountsService) {}

  async signUp(signup_dto: SignUpRequestBody): Promise<Account> {
    const { email, username, password } = signup_dto;

    // 同じメールアドレスのアカウントが存在しないことを確認
    const same_email_account = await this.accountService.findOneByEmail(email);
    if (same_email_account) {
      throw new HttpException('account already exists', HttpStatus.CONFLICT);
    }

    // アカウント作成
    const account = new Account();
    account.email = email;
    account.username = username;
    // パスワードをソルトを付けてハッシュ化して保存
    const salt = randomBytes(8).toString('hex');
    account.salt = salt;
    account.password = await this.hash_password(password, salt);
    return await this.accountService.saveAccount(account);
  }

  /**
   * Guardsで利用するための非同期関数
   * @param signin_dto
   * @returns
   */
  async signIn(signin_dto: SignInRequestBody): Promise<Account> {
    const account = (await this.accountService.findOneByEmail(
      signin_dto.email,
      true,
    )) as Account;

    // アカウントが存在しない場合
    if (!account) {
      throw new HttpException('account not found', HttpStatus.NOT_FOUND);
    }

    // パスワードが一致しない場合
    const hash_password = await this.hash_password(
      signin_dto.password,
      account.salt,
    );
    if (hash_password !== account.password) {
      throw new HttpException('password is wrong', HttpStatus.BAD_REQUEST);
    }

    // ログイン成功
    return account;
  }

  private async hash_password(password: string, salt: string): Promise<string> {
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return hash.toString('hex');
  }
}

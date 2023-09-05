import {
  IsEmail,
  IsNotEmpty,
  IsAscii,
  MinLength,
  MaxLength,
} from 'class-validator';
// FYI: https://github.com/typestack/class-validator
import { config } from 'src/config/configuration';

export class SignUpRequestBody {
  /**
   * メールアドレス
   * @example "example@example.com"
   */
  @IsEmail()
  email: string;

  /**
   * ユーザー名
   * @example "example_user123"
   */
  @IsNotEmpty()
  @IsAscii()
  @MinLength(config.accounts.min_username_length)
  @MaxLength(config.accounts.max_username_length)
  username: string;

  /**
   * パスワード
   * @example "example_password123"
   */
  @IsNotEmpty()
  @IsAscii()
  @MinLength(config.accounts.min_password_length)
  @MaxLength(config.accounts.max_password_length)
  password: string;
}

export type TypeAccountInfo = {
  id: number;
  username: string;
  created_at: Date;
  updated_at: Date;
};

export class AccountInfo implements TypeAccountInfo {
  id: number;
  username: string;
  created_at: Date;
  updated_at: Date;
}

export class SignInRequestBody {
  /**
   * メールアドレス
   * @example "example@example.com"
   */
  @IsEmail()
  email: string;

  /**
   * パスワード
   * @example "example_password123"
   */
  @IsNotEmpty()
  password: string;
}

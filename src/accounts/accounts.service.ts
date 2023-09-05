import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './core/entity/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async findAll(with_password = false) {
    const accounts = await this.accountRepository.find();
    if (with_password) {
      return accounts;
    }
    return accounts.map((account) => this.remove_password(account));
  }

  async findOneByEmail(email: string, with_password = false) {
    const account = await this.accountRepository.findOneBy({
      email: email,
    });
    if (!account) {
      return null;
    }
    if (with_password) {
      return account;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.remove_password(account);
  }

  async saveAccount(account: Account): Promise<Account> {
    return await this.accountRepository.save(account);
  }

  remove_password(account: Account) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, salt, ...result } = account;
    return result;
  }
}

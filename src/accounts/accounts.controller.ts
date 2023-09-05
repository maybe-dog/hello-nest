import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountsService) {}

  @Get()
  async getAllAccounts() {
    return await this.accountService.findAll();
  }
}

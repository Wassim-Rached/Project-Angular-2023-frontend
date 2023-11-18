import { Account } from './account';
import { Activity } from './activity';
import { Status } from './join-us';

export class Registration {
  constructor(
    public readonly id?: string,
    public status?: Status,
    public is_payed?: boolean,
    public readonly created_at?: string,
    public readonly updated_at?: string,
    public readonly account?: Account,
    public activity?: Activity
  ) {}
}

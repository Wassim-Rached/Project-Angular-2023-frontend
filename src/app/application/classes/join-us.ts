import { Account } from './account';

export type Status = 'pending' | 'accepted' | 'rejected';

export class JoinUs {
  constructor(
    public readonly id?: string,
    public readonly account?: Account,
    public status?: Status,
    public how_found_us?: string,
    public goals?: string,
    public reasons?: string,
    public receive_emails?: boolean
  ) {}
}

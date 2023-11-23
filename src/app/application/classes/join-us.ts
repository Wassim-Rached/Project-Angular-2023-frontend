import { Account } from './account';

export type Status = 'pending' | 'accepted' | 'rejected';

export class JoinUs {
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(
    public readonly id?: string,
    public readonly account?: Account,
    public status?: Status,
    public how_found_us?: string,
    public goals?: string,
    public reasons?: string,
    public receive_emails?: boolean,
    created_at?: string,
    updated_at?: string
  ) {
    if (created_at) this.created_at = new Date(created_at);
    if (updated_at) this.updated_at = new Date(updated_at);
  }
}

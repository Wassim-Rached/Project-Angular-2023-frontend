import { User } from './user';
export type Role = 'admin' | 'member' | 'user';
export class Account {
  public readonly created_at?: Date;
  public readonly updated_at?: Date;
  public isAdmin: boolean;

  constructor(
    public readonly id?: string,
    public user?: User,
    public readonly photo_url?: string,
    public photo?: File,
    public role?: Role,
    created_at?: string,
    updated_at?: string
  ) {
    if (created_at) this.created_at = new Date(created_at);
    if (updated_at) this.updated_at = new Date(updated_at);
    this.isAdmin = this.role == 'admin';
  }
}

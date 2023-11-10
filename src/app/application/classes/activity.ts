import { Account } from './account';
import { Categorie } from './categorie';

export class Activity {
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(
    public readonly id?: string,
    public readonly number_of_likes?: number,
    public categories?: Categorie[],
    public title?: string,
    public photo?: File,
    public readonly photo_url?: string,
    public isFree?: boolean,
    public price?: number,
    public description?: string,
    public maxParticipants?: number,
    public registred_accounts?: Account[],
    public date?: string,
    created_at?: string,
    updated_at?: string
  ) {
    if (created_at) this.created_at = new Date(created_at);
    if (updated_at) this.updated_at = new Date(updated_at);
  }
}

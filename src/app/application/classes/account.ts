import { User } from "./user"
export type Role = "admin" | "member" | "user"
export class Account {
    constructor(
        public readonly id?: string,
        public user?: User,
        public readonly photo_url?: string,
        public photo?: File,
        public role?: Role,
        public readonly created_at?: string,
        public readonly updated_at?: string
    ) { }
}

export type Gender = 'M' | 'F'

export class User {
    constructor(
        public readonly id?: string,
        public username?: string,
        public email?: string,
        public password?: string,
        public first_name?: string,
        public last_name?: string,
        public phone_number?: string,
        public gender?: Gender) { }
}

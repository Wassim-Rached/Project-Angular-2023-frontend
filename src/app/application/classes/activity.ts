import { Categorie } from "./categorie";

export class Activity {
    constructor(
        public readonly id?: string,
        public readonly numberOfLikes?: number,
        public categories?: Categorie[],
        public title?: string,
        public photo?: File,
        public readonly photo_url?: string,
        public isFree?: boolean,
        public price?: number,
        public description?: string,
        public maxParticipants?: number,
        public date?: string,
        public readonly created_at?: string,
        public readonly updated_at?: string
    ) { }
}

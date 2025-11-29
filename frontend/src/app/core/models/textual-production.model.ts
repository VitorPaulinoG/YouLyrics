import { User } from "./user.model";

export interface TextualProduction {
    id: string;
    title: string;
    author: User;
    content: string[][];
    literaryGenre: string;
}
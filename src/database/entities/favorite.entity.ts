import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {User} from "./user.entity";
import {Venue} from "./venue.entity";

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.favorites)
    user: User;

    @ManyToOne(() => Venue, (venue) => venue.favorites)
    venue: Venue;
}

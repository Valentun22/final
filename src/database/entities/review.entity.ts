import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {User} from "./user.entity";
import {Venue} from "./venue.entity";


@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    text: string;

    @Column({ type: 'float', default: 0 })
    rating: number;

    @Column({ type: 'float', nullable: true })
    check: number;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Venue, (venue) => venue.reviews)
    venue: Venue;
}


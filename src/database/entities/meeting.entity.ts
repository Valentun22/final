import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {User} from "./user.entity";
import {Venue} from "./venue.entity";


@Entity('meetings')
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.meetings)
    user: User;

    @ManyToOne(() => Venue, (venue) => venue.id)
    venue: Venue;

    @Column('date')
    date: Date;

    @Column('time')
    time: string;

    @Column('text')
    description: string;

    @Column('json')
    preferences: {
        gender: string;
        groupSize: number;
        budget: number;
    };
}

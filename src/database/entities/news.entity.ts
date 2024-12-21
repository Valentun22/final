import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {NewsType} from "../enums/newsType.enum";
import {Venue} from "./venue.entity";


@Entity('news')
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({ type: 'enum', enum: NewsType })
    type: NewsType;

    @Column()
    image: string;

    @ManyToOne(() => Venue, (venue) => venue.news)
    venue: Venue;
}

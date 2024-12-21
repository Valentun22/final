import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {User} from "./user.entity";
import {Review} from "./review.entity";
import {News} from "./news.entity";
import {Favorite} from "./favorite.entity";


@Entity('venues')
export class Venue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column({ type: 'float' })
    averageCheck: number;

    @Column()
    workingHours: string;

    @Column()
    contactInfo: string;

    @Column('simple-array')
    tags: string[];

    @ManyToOne(() => User, (user) => user.venues)
    owner: User;

    @OneToMany(() => Review, (review) => review.venue)
    reviews: Review[];

    @OneToMany(() => News, (news) => news.venue)
    news: News[];

    @OneToMany(() => Favorite, (favorite) => favorite.venue)
    favorites: Favorite[];
}

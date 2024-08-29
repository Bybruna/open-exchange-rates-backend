import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rindegastino } from "./rindegastino.entity";

@Entity("rindegastino_birthday")
export class RindegastinosBirthday {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Rindegastino, rindegastino => rindegastino.birthdays, { onDelete: 'CASCADE' })
    rindegastino: Rindegastino;

    @Column({ type: 'int', name: 'days_until_birthday' })
    daysUntilBirthday: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
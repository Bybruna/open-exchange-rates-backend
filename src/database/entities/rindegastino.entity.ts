import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RindegastinosBirthday } from "./rindegastino-birthday.entity";

@Entity("rindegastino")
export class Rindegastino {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50, name: 'last_name' })
    lastName: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => RindegastinosBirthday, birthday => birthday.rindegastino)
    birthdays: RindegastinosBirthday[];
}

import { Column, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryColumn({type: 'uuid'})
    id!: string;

    @Column({name: 'username'})
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({name: 'time_created'})
    timeCreated!: Date;

    @UpdateDateColumn({name: 'time_updated'})
    timeUpdated!: Date;

    @OneToMany(() => TaskEntity, (task) => task.user)
    task?: TaskEntity[]
}
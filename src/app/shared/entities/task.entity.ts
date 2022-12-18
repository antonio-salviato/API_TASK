import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name: 'task'})
export class TaskEntity{
    @PrimaryColumn({type: 'uuid'})
    id!: string;

    @Column()
    task!: string;

    @Column()
    completed!: boolean;

    @Column({name: 'id_user'})
    userId!: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
    user?: UserEntity;
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Apartment {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public street: string;

  @Column({ type: 'varchar', length: 120 })
  public zipCode: string;

  @Column({ type: 'varchar', length: 120 })
  public city: string;

  @OneToMany((type) => Room, (room) => room.fkApartment)
  public room: Room[];
}

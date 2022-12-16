import { Apartment } from './apartment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public number: string;

  @Column({ type: 'varchar', length: 120 })
  public area: string;

  @Column({ type: 'varchar', length: 120 })
  public price: string;

  @ManyToOne((type) => Apartment)
  @JoinColumn({ name: 'fkApartment', referencedColumnName: 'id' })
  public fkApartment: Apartment;
}

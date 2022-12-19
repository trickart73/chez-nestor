import { Apartment } from './apartment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public number: number;

  @Column({ type: 'float' })
  public area: number;

  @Column({ type: 'integer' })
  public price: number;

  @ManyToOne((type) => Apartment)
  @JoinColumn({ name: 'fkApartment', referencedColumnName: 'id' })
  public fkApartment: Apartment;

  @OneToOne((type) => Client)
  @JoinColumn({ name: 'fkClient', referencedColumnName: 'id' })
  public fkClient: Client;
}

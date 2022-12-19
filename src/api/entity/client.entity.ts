import { Room } from './room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public firstName: string;

  @Column({ type: 'varchar', length: 120 })
  public lastName: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public phone: string;

  @Column({ type: 'varchar', length: 120 })
  public birthDate: string;

  @Column({ type: 'boolean', default: false })
  public nationality: string;

  @OneToOne((type) => Room)
  @JoinColumn({ name: 'fkRoom', referencedColumnName: 'id' })
  public fkRoom: Room;
}

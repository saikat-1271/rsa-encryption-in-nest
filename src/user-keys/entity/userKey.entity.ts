import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    length: 2000,
  })
  publicKey: string;

  @Column({
    length: 2000,
  })
  privateKey: string;
}

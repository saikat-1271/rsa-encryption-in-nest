import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserAesKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    length: 2000,
  })
  Key: string;
}

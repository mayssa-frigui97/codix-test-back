import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CountryEnum } from '../enum/country.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 40 })
  nickname: string;

  @Column({ select: false, type: 'varchar', length: 40 })
  password: string;

  @Column({ select: false, type: 'varchar', length: 40 })
  confirmPassword: string;

  @Column({ unique: true, type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int', precision: 15 })
  phone: number;

  @Column({
    type: 'enum',
    enum: CountryEnum,
    default: CountryEnum.BULGARIA,
  })
  country: CountryEnum;
}

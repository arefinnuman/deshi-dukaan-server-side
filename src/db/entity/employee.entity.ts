import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';
@Entity('Employees')
export class Employee {
  @PrimaryGeneratedColumn()
  E_Id: number;

  @Column()
  @Generated('uuid')
  E_Uuid: string;

  @Column({ nullable: true })
  E_Photo: string;

  @Column()
  E_Name: string;

  @Column()
  E_Email: string;

  @Column()
  E_Phone: string;

  @Column({ nullable: true })
  E_Address: string;

  @Column()
  E_Dob: Date;

  @Column()
  E_Gender: string;

  @Column()
  E_Password: string;

  @Column()
  E_CreatedAt: Date;

  @Column()
  E_ModifiedAt: Date;

  // Employee has one Admin
  @ManyToOne(() => Admin, (admin) => admin.employees)
  @JoinColumn({ name: 'FK_AdminId' })
  admin: Admin;
}

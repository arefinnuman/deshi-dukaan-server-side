import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerPayment } from './customerPayment.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
@Entity('Customers')
export class Customer {
  @PrimaryGeneratedColumn()
  C_Id: number;

  @Column()
  @Generated('uuid')
  C_Uuid: string;

  @Column({ nullable: true })
  C_Photo: string;

  @Column()
  C_Name: string;

  @Column()
  C_Email: string;

  @Column()
  C_Phone: string;

  @Column({ nullable: true })
  C_Address: string;

  @Column()
  C_Dob: Date;

  @Column()
  C_Gender: string;

  @Column()
  C_Password: string;

  @Column({ nullable: true })
  Role: string;

  @Column({ nullable: true })
  C_Verified: boolean;

  @Column()
  C_CreatedAt: Date;

  @Column()
  C_ModifiedAt: Date;

  // Customer has many Orders
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  // Customer has many Reviews
  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];

  // Customer has many CustomerPayments
  @OneToMany(
    () => CustomerPayment,
    (customerPayment) => customerPayment.customer,
  )
  customerPayments: CustomerPayment[];
}

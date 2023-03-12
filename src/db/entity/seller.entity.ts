import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity('Sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  S_Id: number;

  @Column()
  @Generated('uuid')
  S_Uuid: string;

  @Column({ nullable: true })
  S_Photo: string;

  @Column()
  S_Name: string;

  @Column()
  S_Email: string;

  @Column()
  S_Phone: string;

  @Column({ nullable: true })
  S_Address: string;

  @Column()
  S_Dob: Date;

  @Column()
  S_Gender: string;

  @Column()
  S_Password: string;

  @Column()
  S_CompanyName: string;

  @Column({ nullable: true })
  S_CompanyLogo: string;

  @Column()
  S_Status: string;
  
  @Column()
  Role: string;

  @Column()
  S_Verified: boolean;

  @Column()
  S_CreatedAt: Date;

  @Column()
  S_ModifiedAt: Date;

  // Seller has many Products
  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}

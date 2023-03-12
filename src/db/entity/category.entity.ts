import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  CategoryId: number;

  @Column()
  CategoryName: string;

  // Category has many Products
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

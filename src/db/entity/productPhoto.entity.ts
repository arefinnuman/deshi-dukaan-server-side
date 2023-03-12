import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
@Entity('ProductPhotos')
export class ProductPhoto {
  @PrimaryGeneratedColumn()
  P_PhotoId: number;

  @Column({ nullable: true })
  P_Photo: string;

  // ProductPhoto has one Product
  @ManyToOne(() => Product, (product) => product.productPhotos)
  @JoinColumn({ name: 'FK_ProductId' })
  product: Product;
}

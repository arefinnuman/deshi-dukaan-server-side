import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from './orderDetail.entity';
import { ProductPhoto } from './productPhoto.entity';
import { Review } from './review.entity';
import { Seller } from './seller.entity';
@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  P_Id: number;

  @Column()
  @Generated('uuid')
  P_Uuid: string;

  @Column()
  P_Name: string;

  @Column()
  P_Desc: string;

  @Column()
  P_Qty: number;

  @Column()
  P_Waranty: string;

  @Column()
  P_Price: number;

  @Column()
  P_CreatedAt: Date;

  @Column()
  P_ModifiedAt: Date;

  // Product has one Category
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'FK_CategoryId' })
  category: Category;

  // Product has one Seller
  @ManyToOne(() => Seller, (seller) => seller.products)
  @JoinColumn({ name: 'FK_SellerId' })
  seller: Seller;

  // Product has one OrderDetail
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  // Product has one Review
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  // Product has many ProductPhotos
  @OneToMany(() => ProductPhoto, (productPhoto) => productPhoto.product)
  productPhotos: ProductPhoto[];
}

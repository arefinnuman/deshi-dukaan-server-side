import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/db/entity/order.entity';
import { Payment } from 'src/db/entity/payment.entity';
import { Seller } from 'src/db/entity/seller.entity';
import { Repository } from 'typeorm';
import { Admin } from './../db/entity/admin.entity';
import { Category } from './../db/entity/category.entity';
import { Customer } from './../db/entity/customer.entity';
import { Product } from './../db/entity/product.entity';
import { Review } from './../db/entity/review.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private mailerService: MailerService,
  ) {}

  // Admin Can Sign-up and Sign in
  // Sign-up can be dome using createAdmin method

  // Sign-in
  async signIn(adminSignInDto) {
    const { A_Email, A_Password } = adminSignInDto;
    const user = await this.adminRepository.findOneBy({ A_Email });
    if (user && (await bcrypt.compare(A_Password, user.A_Password))) {
      return user;
    } else {
      throw new UnauthorizedException('Enter Valid Credentials');
    }
  }

  // ------------------ Admin------------------//

  //   Admin Can Create another Admin
  async createAdmin(createAdminDto) {
    const existAdmin = await this.adminRepository.findOneBy({
      A_Email: createAdminDto.A_Email,
    });
    if (existAdmin) {
      throw new NotFoundException('Admin Already Exist');
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createAdminDto.A_Password, salt);
      createAdminDto.A_Password = hashedPassword;
      createAdminDto.Role = 'Admin';
      createAdminDto.A_CreatedAt = new Date();
      createAdminDto.A_ModifiedAt = new Date();
      const admin = await this.adminRepository.save(createAdminDto);
      this.mailerService.sendMail({
        to: createAdminDto.A_Email,
        subject: 'Welcome to DesiDukaan',
        text: `Hi, ${createAdminDto.A_Name}. Welcome to DesiDukaan.
Please verify your email address by clicking on the link below.
http://localhost:3333/admin/verify-email/?uid=${createAdminDto.A_Uuid}`,
      });
      return admin;
    }
  }
  // Admin verify email
  async verifyEmail(uuid) {
    await this.adminRepository.update({ A_Uuid: uuid }, { A_Verified: true });
    const verifiedUser = await this.adminRepository.findOneBy({ A_Uuid: uuid });
    if (verifiedUser) {
      return { message: 'Email verified successfully' };
    } else {
      return { message: 'Email verification failed' };
    }
  }

  // Get admin by UUId
  async getAdminById(uuid) {
    const found = await this.adminRepository.findOneBy({ A_Uuid: uuid });
    if (!found) {
      throw new NotFoundException(`Admin with UUId ${uuid} not found`);
    }
    return found;
  }
  // Gell All Admins
  async getAllAdmins() {
    return await this.adminRepository.find();
  }
  // Customer Update Profile
  async updateProfile(id, adminUpdateDto) {
    adminUpdateDto.A_ModifiedAt = new Date();
    return await this.adminRepository.update(id, adminUpdateDto);
  }

  //   Change Password
  async changePassword(id, adminChangePassDto) {
    const dbPassword = await (
      await this.adminRepository.findOneBy({ A_Id: id })
    ).A_Password;
    const isMatch = await bcrypt.compare(
      adminChangePassDto.A_CurrentPassword,
      dbPassword,
    );
    if (isMatch) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        adminChangePassDto.A_NewPassword,
        salt,
      );
      adminChangePassDto.A_NewPassword = hashedPassword;
      return await this.adminRepository.update(
        { A_Id: id },
        { A_Password: adminChangePassDto.A_NewPassword },
      );
    } else {
      return 'Password not match';
    }
  }
  //   Admin can delete admin
  async deleteAdmin(id) {
    return await this.adminRepository.delete(id);
  }

  // ------------------ Admin have some seller functionality------------------//

  // Admin can create a seller
  async createSeller(id, createSellerDto) {
    const existSeller = await this.sellerRepository.findOneBy({
      S_Email: createSellerDto.S_Email,
    });
    if (existSeller) {
      throw new NotFoundException('Seller Already Exist');
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        createSellerDto.S_Password,
        salt,
      );
      createSellerDto.S_Password = hashedPassword;
      createSellerDto.Role = 'Seller';
      createSellerDto.S_CreatedAt = new Date();
      createSellerDto.S_ModifiedAt = new Date();
      createSellerDto.admin = id;
      return await this.sellerRepository.save(createSellerDto);
    }
  }

  // Admin can view All Sellers Information
  async getAllSellers() {
    return await this.sellerRepository.find({
      relations: { products: true },
    });
  }
  //   Admin can view Seller Information by id
  async getSellerById(uuid) {
    const found = await this.sellerRepository.findOneBy({ S_Uuid: uuid });
    if (!found) {
      throw new NotFoundException(`Seller with UUId ${uuid} not found`);
    }
    return found;
  }
  //   Admin can delete seller
  async deleteSeller(id) {
    return await this.sellerRepository.delete(id);
  }

  // ------------------ Admin have some customer functionality------------------//

  //  Admin can view All Customers Information
  async getAllCustomers() {
    return await this.customerRepository.find();
  }
  //   Admin can view Customer Information by id
  async getCustomerById(uuid) {
    const found = await this.customerRepository.findOneBy({ C_Uuid: uuid });
    if (!found) {
      throw new NotFoundException(`Customer with UUId ${uuid} not found`);
    }
    return found;
  }
  //   Admin can delete customer
  async deleteCustomer(id) {
    return await this.customerRepository.delete(id);
  }

  async createCategory(createCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  // ------------------ Admin have some Payment functionality------------------//
  //   Admin can create payment type
  async createPaymentType(createPaymentDto) {
    return await this.paymentRepository.save(createPaymentDto);
  }
  //   Admin can view All Payment Types
  async getAllPaymentTypes() {
    return await this.paymentRepository.find();
  }
  //   Admin can view Delelte Payment Type by id
  async deletePaymentType(id) {
    return await this.paymentRepository.delete(id);
  }

  // ------------------ Admin have some order functionality------------------//
  //   View All orders
  async getAllOrders() {
    return await this.orderRepository.find({
      relations: { customer: true, payment: true },
    });
  }
  //  View order by id
  async getOrderById(id) {
    return await this.orderRepository.findOne(id);
  }
  //  View order by customer id
  // async getOrderByCustomerId(id) {
  //   return await this.orderRepository.find({ where: { O_CustomerId: id } });
  // }

  // ------------------ Admin have some product functionality------------------//
  //   View All Products
  async getAllProducts() {
    return await this.productRepository.find({
      relations: { seller: true, category: true },
    });
  }

  // ------------------ Admin have some review functionality------------------//
  // View All Reviews
  async getAllReviews() {
    return await this.reviewRepository.find({
      relations: { customer: true, product: true },
    });
  }

  // Forgot Password
}

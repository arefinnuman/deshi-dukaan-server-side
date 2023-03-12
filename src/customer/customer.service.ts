import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/db/entity/customer.entity';
import { CustomerPayment } from 'src/db/entity/customerPayment.entity';
import { Order } from 'src/db/entity/order.entity';
import { OrderDetail } from 'src/db/entity/orderDetail.entity';
import { Payment } from 'src/db/entity/payment.entity';
import { Product } from 'src/db/entity/product.entity';
import { Review } from 'src/db/entity/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail) private orderDetailRepo: Repository<OrderDetail>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(CustomerPayment) private customerPaymentRepo: Repository<CustomerPayment>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    private mailerService: MailerService,
  ) {}
  // Customer Register
  async registerAccount(customerRegisterDto) {
    const dbCustomer = await this.customerRepo.findOneBy({ C_Email: customerRegisterDto.C_Email });
    if (dbCustomer) {
      return { message: 'Email already exists' };
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(customerRegisterDto.C_Password, salt);
      customerRegisterDto.C_Password = hashedPassword;
      customerRegisterDto.C_CreatedAt = new Date();
      customerRegisterDto.C_ModifiedAt = new Date();
      const customer = await this.customerRepo.save(customerRegisterDto);
      this.mailerService.sendMail({
        to: customerRegisterDto.C_Email,
        subject: 'Welcome to DesiDukaan',
        text: `Hi, ${customerRegisterDto.C_Name}. Welcome to DesiDukaan.
Please verify your email address by clicking on the link below.
http://localhost:3000/customer/verify-email/?uid=${customerRegisterDto.C_Uuid}`,
      });
      return customer;
    }
  }
  // Customer verify email
  async verifyEmail(uuid) {
    await this.customerRepo.update({ C_Uuid: uuid }, { C_Verified: true });
    const verifiedUser = await this.customerRepo.findOneBy({ C_Uuid: uuid });
    if (verifiedUser) {
      return { message: 'Email verified successfully' };
    } else {
      return { message: 'Email verification failed' };
    }
  }
  // Customer Profile
  async viewProfile(uuid) {
    return await this.customerRepo.findOneBy({ C_Uuid: uuid });
  }
  // Customer Update Profile
  async updateProfile(id, customerUpdateDto) {
    customerUpdateDto.C_ModifiedAt = new Date();
    return await this.customerRepo.update(id, customerUpdateDto);
  }
  // Customer Delete Account
  async deleteAccount(id) {
    return await this.customerRepo.delete(id);
  }
  // Customer Change Password
  async changePassword(id, customerChangePassDto) {
    const dbPassword = (await this.customerRepo.findOneBy({ C_Id: id })).C_Password;
    const isMatch = await bcrypt.compare(customerChangePassDto.C_CurrentPassword, dbPassword);
    if (isMatch) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(customerChangePassDto.C_NewPassword, salt);
      customerChangePassDto.C_NewPassword = hashedPassword;
      return await this.customerRepo.update({ C_Id: id }, { C_Password: customerChangePassDto.C_NewPassword });
    } else {
      return { message: 'Invalid Password' };
    }
  }
  // Customer Forgot Password
  async forgotPassword(customerForgotPassDto) {
    const validCustomer = await this.customerRepo.findOneBy({ C_Email: customerForgotPassDto.C_Email });
    if (validCustomer) {
      const otp = Math.round(100000 + Math.random() * 900000);
      await this.mailerService.sendMail({
        to: customerForgotPassDto.C_Email,
        subject: 'OTP for Forgot Password',
        text: `Hi, ${validCustomer.C_Name}. Your OTP is ${otp}`,
      });
      return otp;
    } else {
      return { message: 'Invalid Email' };
    }
  }

  viewAllProduct() {
    return this.productRepo.find();
  }
  // Customer View Product Detail
  viewProductDetail(id) {
    return this.productRepo.findOneBy({ P_Id: id });
  }
  // Customer Search Product
  searchProduct(query) {
    return this.productRepo.findBy({ P_Name: query.k });
  }

  // Customer Add to Cart
  async addToCart(query) {
    const validProduct = await this.productRepo.findOneBy({ P_Id: query.id });
    if (validProduct) {
      return 1;
    } else {
      return 0;
    }
  }
  // Customer View Cart
  async viewCart(session) {
    return await this.productRepo.findBy({ P_Id: session.pid });
  }

  // Customer can create order
  async createOrder(id, createOrderDto) {
    createOrderDto.OrderCode =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    createOrderDto.OrderStatus = 'Pending';
    createOrderDto.OrderPlacedDate = new Date();
    createOrderDto.OrderDeliveredDate = new Date();
    createOrderDto.OrderAmount = 0;
    createOrderDto.customer = id;
    const order = await this.orderRepo.save(createOrderDto);
    for (let i = 0; i < createOrderDto.orderDetails.length; i++) {
      createOrderDto.orderDetails[i].order = order;
      const orderDetailAmount = createOrderDto.orderDetails[i].P_OrderQty * createOrderDto.orderDetails[i].P_OrderPrice;
      createOrderDto.OrderAmount += orderDetailAmount;
      await this.orderDetailRepo.save(createOrderDto.orderDetails[i]);
    }
    await this.orderRepo.update(order.OrderId, { OrderAmount: createOrderDto.OrderAmount });
    return order;
  }

  // Customer can view all own order
  async viewAllOrder(id) {
    return await this.orderRepo.findBy({ customer: id });
  }

  // Customer can view own order details
  async viewOrderDetail(orderCode) {
    const orderId: any = (await this.orderRepo.findOneBy({ OrderCode: orderCode })).OrderId;
    return await this.orderDetailRepo.findOneBy({ order: orderId });
  }
  // Customer can view payment options
  async viewPayment() {
    return await this.paymentRepo.find();
  }

  // Customer can a post review
  async postReview(id, query, createReviewDto) {
    createReviewDto.customer = id;
    createReviewDto.product = query.productId;
    return await this.reviewRepo.save(createReviewDto);
  }

  // Customer can view all own reviews
  // async viewMyReviews(id: any) {

  // }

  addPayment(id, customerAddPaymentDto) {
    customerAddPaymentDto.CP_ExpiryDate = new Date();
    customerAddPaymentDto.customer = id;
    return this.customerPaymentRepo.save(customerAddPaymentDto);
  }
  viewMyPayment(id) {
    return this.customerPaymentRepo.findBy({ customer: id });
  }

  async login(customerLoginDto) {
    const isValidCustomer = await await this.customerRepo.findOneBy({ C_Email: customerLoginDto.C_Email });
    if (isValidCustomer && (await bcrypt.compare(customerLoginDto.C_Password, isValidCustomer.C_Password))) {
      return 1;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}

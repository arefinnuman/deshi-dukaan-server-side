import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserEntity } from './entity/users.entity';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Create User
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email } = createUserDto;

    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.role = UserRole.CUSTOMER;
    await user.save();

    return user;
  }
  // get all Users
  getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // get an user by id
  async getUserById(id: number): Promise<UserEntity> {
    const found = await this.userRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`User with Id '${id}' not found`);
    }

    return found;
  }

  // Get Users
  async getUsers(filterDto: GetUserFilterDto): Promise<UserEntity[]> {
    const { search, role } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      query.andWhere('(user.name LIKE :search OR user.email LIKE :search)', {
        search: `%${search}%`,
      });
    }
    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    const users = await query.getMany();
    return users;
  }

  // get only admin
  getAllAdmin(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: { role: UserRole.ADMIN },
    });
  }

  // get only employee
  getAllEmployee(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: { role: UserRole.EMPLOYEE },
    });
  }
  // get only seller
  getAllSeller(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: { role: UserRole.SELLER },
    });
  }
  // get only customer
  getAllCustomer(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: { role: UserRole.CUSTOMER },
    });
  }

  // Update user to Admin
  async updateToAdmin(id: number): Promise<any> {
    const user = await this.getUserById(id);
    user.role = UserRole.ADMIN;
    await user.save();
    return user;
  }
  // Update user to Employee
  async updateToEmployee(id: number): Promise<any> {
    const user = await this.getUserById(id);
    user.role = UserRole.EMPLOYEE;
    await user.save();
    return user;
  }
  // Update user to Seller
  async updateToSeller(id: number): Promise<any> {
    const user = await this.getUserById(id);
    user.role = UserRole.SELLER;
    await user.save();
    return user;
  }
  // Update user to Customer
  async updateToCustomer(id: number): Promise<any> {
    const user = await this.getUserById(id);
    user.role = UserRole.CUSTOMER;
    await user.save();
    return user;
  }
  // update user role manually
  async updateUserRole(id: number, role: UserRole): Promise<any> {
    const user = await this.getUserById(id);
    user.role = role;
    await user.save();
    return user;
  }

  // delete user
  async deleteUser(id: number): Promise<any> {
    const user = await this.getUserById(id);
    await user.remove();
    return user;
  }
}

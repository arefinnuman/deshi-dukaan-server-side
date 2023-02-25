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
    user.role = UserRole.ADMIN;
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
  updateToAdmin(id: number): Promise<any> {
    return this.userRepository.update({ id }, { role: UserRole.ADMIN });
  }

  // Update user to Employee
  updateToEmployee(id: number): Promise<any> {
    return this.userRepository.update({ id }, { role: UserRole.EMPLOYEE });
  }
  // Update user to Seller
  updateToSeller(id: number): Promise<any> {
    return this.userRepository.update({ id }, { role: UserRole.SELLER });
  }
  // Update user to Customer
  updateToCustomer(id: number): Promise<any> {
    return this.userRepository.update({ id }, { role: UserRole.CUSTOMER });
  }
  // update user role manually
  updateUserRole(id: number, role: UserRole): Promise<any> {
    return this.userRepository.update({ id }, { role: role });
  }

  // delete user
  deleteUser(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}

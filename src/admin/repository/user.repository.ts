import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/users.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {}

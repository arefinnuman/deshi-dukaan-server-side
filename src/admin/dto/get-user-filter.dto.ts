import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from './../enum/user-role.enum';

export class GetUserFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.SELLER, UserRole.CUSTOMER])
  role: UserRole;
}

import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from './../model/user.model';
export class GetUserFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.SELLER, UserRole.CUSTOMER])
  role: UserRole;
}

import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRole } from './../enum/user-role.enum';

export class RoleValidationPipe implements PipeTransform {
  readonly allowedRoles = [
    UserRole.ADMIN,
    UserRole.EMPLOYEE,
    UserRole.SELLER,
    UserRole.CUSTOMER,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isRoleValid(value)) {
      throw new BadRequestException(
        `'${value}' is an invalid role, Please give a valid role`,
      );
    }
    return value;
  }

  private isRoleValid(role: any) {
    const index = this.allowedRoles.indexOf(role);
    return index !== -1;
  }
}

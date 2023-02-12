import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  create() {
    return {
      id: 1234,
      uname: 'cccc',
      password: 122342525,
    };
  }
  Login() {
    return {
      email: 'abc@gmail.com',
      pasword: 12131313,
    };
  }
}

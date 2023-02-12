import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomer } from './dto/register-customer.dto';

const customers = [];
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/register')
  register(@Body() registerCustomer: RegisterCustomer) {
    customers.push(registerCustomer);
    return registerCustomer;
  }
  @Get()
  getAllUser() {
    return customers;
  }
  @Get(':id')
  getUser(@Param('id') id: number) {
    return customers.find((customers) => customers.id == id);
  }
  @Post('/login')
  login(@Body() loginCustomer: RegisterCustomer) {
    return loginCustomer;
  }
  @Put('/update/:id')
  update(@Param('id') id: number, @Body() customerUpdate: RegisterCustomer) {}
}

import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AdminGuard } from '../common/admin.guard';

@Controller()
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  /** Cart pricing: { items: [{ id, qty }] } → lines, subtotal, shipping, tax, total, problems. */
  @Post('cart/quote')
  @HttpCode(200)
  quote(@Body('items') items: unknown) {
    return this.orders.quote(items);
  }

  @Post('orders/validate')
  @HttpCode(200)
  validate(@Body() body: Record<string, unknown>) {
    return { errors: this.orders.check(body).e };
  }

  /** Place an order. Payment is collected by the shop (no payment provider is connected). */
  @Post('orders')
  @HttpCode(201)
  create(@Body() body: Record<string, unknown>) {
    const o = this.orders.create(body);
    return { ref: o.ref, email: o.email, first: o.first, totalCents: o.totalCents, paymentStatus: o.paymentStatus };
  }

  @Get('admin/orders')
  @UseGuards(AdminGuard)
  list(@Query('status') status?: string, @Query('q') q?: string, @Query('payment') payment?: string) {
    return this.orders.list(status, q, payment);
  }

  @Patch('admin/orders/:id')
  @UseGuards(AdminGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Record<string, unknown>) {
    return this.orders.update(id, body);
  }

  @Delete('admin/orders/:id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orders.remove(id);
  }
}

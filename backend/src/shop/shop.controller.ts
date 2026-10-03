import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { AdminGuard } from '../common/admin.guard';

@Controller()
export class ShopController {
  constructor(private readonly shop: ShopService) {}

  @Get('site') site() { return this.shop.site(); }
  /** ?q=&cat=&col=&avail=&sort=&collection= */
  @Get('products') search(@Query() q: Record<string, string>) { return this.shop.search(q); }
  @Get('products/:id') product(@Param('id') id: string) { return this.shop.product(id); }

  @Put('admin/settings') @UseGuards(AdminGuard) settings(@Body() b: Record<string, unknown>) { return this.shop.updateSettings(b); }
  @Get('admin/products') @UseGuards(AdminGuard) adminProducts() { return { items: this.shop.products(true), images: this.shop.images() }; }
  @Post('admin/products') @UseGuards(AdminGuard) createProduct(@Body() b: Record<string, unknown>) { return this.shop.createProduct(b); }
  @Put('admin/products/:id') @UseGuards(AdminGuard) updateProduct(@Param('id') id: string, @Body() b: Record<string, unknown>) { return this.shop.updateProduct(id, b); }
  @Delete('admin/products/:id') @UseGuards(AdminGuard) removeProduct(@Param('id') id: string) { return this.shop.removeProduct(id); }
  @Put('admin/featured') @UseGuards(AdminGuard) featured(@Body('ids') ids: unknown) { return this.shop.setFeatured(ids); }
  @Patch('admin/collections/:id') @UseGuards(AdminGuard) collection(@Param('id') id: string, @Body() b: Record<string, unknown>) { return this.shop.updateCollection(id, b); }
  @Patch('admin/categories/:id') @UseGuards(AdminGuard) category(@Param('id') id: string, @Body('label') label: unknown) { return this.shop.updateCategory(id, label); }
  @Patch('admin/care/:n') @UseGuards(AdminGuard) care(@Param('n') n: string, @Body() b: Record<string, unknown>) { return this.shop.updateCare(n, b); }
  @Post('admin/faqs') @UseGuards(AdminGuard) createFaq(@Body() b: Record<string, unknown>) { return this.shop.createFaq(b); }
  @Put('admin/faqs/:id') @UseGuards(AdminGuard) updateFaq(@Param('id', ParseIntPipe) id: number, @Body() b: Record<string, unknown>) { return this.shop.updateFaq(id, b); }
  @Delete('admin/faqs/:id') @UseGuards(AdminGuard) removeFaq(@Param('id', ParseIntPipe) id: number) { return this.shop.removeFaq(id); }
}

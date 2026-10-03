import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AdminGuard } from '../common/admin.guard';

@Controller()
export class MessagesController {
  constructor(private readonly msgs: MessagesService) {}

  /** Live field check for the form (on blur): always 200 with the current errors. */
  @Post('messages/validate')
  @HttpCode(200)
  validate(@Body() body: Record<string, unknown>) {
    return { errors: this.msgs.check(body).e };
  }

  @Post('messages')
  @HttpCode(201)
  create(@Body() body: Record<string, unknown>) {
    return this.msgs.create(body);
  }

  @Get('admin/messages')
  @UseGuards(AdminGuard)
  list(@Query('status') status?: string, @Query('q') q?: string) {
    return this.msgs.list(status, q);
  }

  @Patch('admin/messages/:id')
  @UseGuards(AdminGuard)
  setStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: unknown) {
    return this.msgs.setStatus(id, status);
  }

  @Delete('admin/messages/:id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.msgs.remove(id);
  }
}

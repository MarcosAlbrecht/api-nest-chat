import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.createMessage(createMessageDto);
  }

  @Get('/more-messages')
  findMessagesByIdChamadoAndFistMessage(
    @Query('cnpj') cnpj: string,
    @Query('id_mensagem') id_mensagem: number | null,
    @Query('operador') operador: string,
    @Query('skip') skip: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.messagesService.findMessagesByCnpjAndOperadorAndIdMessage(
      cnpj,
      id_mensagem,
      operador,
      limit,
    );
  }

  @Get(':id_chamado')
  findMessagesByIdChamado(
    @Param('id_chamado') id_chamado: string,
    @Query('skip') skip: string = '1',
    @Query('limit') limit: string = '9999',
  ) {
    return this.messagesService.findMessagesByIdChamado(
      +id_chamado,
      skip,
      limit,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}

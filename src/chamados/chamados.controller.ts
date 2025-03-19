import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ChamadosService } from './chamados.service';

@Controller('chamados')
export class ChamadosController {
  constructor(private readonly chamadosService: ChamadosService) {}
  @Get()
  async findChamadosByCnpjAndOperador(
    @Query('cnpj') cnpj: string,
    @Query('idOperador') idOperador: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.chamadosService.findChamadosByCnpjAndOperador(
        cnpj,
        idOperador,
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/open')
  async findChamadosByStatusOpen(@Res() res: Response) {
    try {
      const result = await this.chamadosService.findChamadosByStatusOpen();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:idChamado')
  async updateChamadoSetToClosed(
    @Param('idChamado') idChamado: string, // Extrai corretamente da rota
    @Res() res: Response, // Indica explicitamente que estamos usando Response
  ) {
    try {
      const result = await this.chamadosService.updateChamadoSetToClosed(
        Number(idChamado),
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao atualizar o chamado',
        error: error.message,
      });
    }
  }

  @Patch('/withoutticket/:idChamado')
  async updateChamadoSetToClosedWithoutticket(
    @Param('idChamado') idChamado: string,
    @Param() res: Response,
  ) {
    try {
      const result = await this.chamadosService.updateChamadoSetToClosed(
        Number(idChamado),
      );
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

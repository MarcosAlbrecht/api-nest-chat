import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReturnChamadoDto } from './dtos/returnChamado.dto';
import { Chamado } from './interface/chamado.interface';

@Injectable()
export class ChamadosRepository {
  constructor(@Inject('FIREBIRD_CONNECTION') private readonly db: any) {}

  //busca acessos com IDN_BIONOTIFICA = S
  async findChamadosByCnpjAndOperador(
    cnpj: string,
    idOperador: string,
  ): Promise<Chamado[]> {
    //const db = this.connectionService.getMainDatabase();
    const result = await new Promise<Chamado[]>((resolve, reject) => {
      this.db.query(
        'SELECT * FROM CHAMADOS WHERE CNPJ_OPERADOR = ? AND ID_OPERADOR = ? AND STATUS = ?',
        [cnpj, idOperador, 'ABERTO'],
        (err, result) => {
          if (err) return reject(err);
          const plained = plainToInstance(Chamado, result, {
            excludeExtraneousValues: true,
          });
          resolve(result); // Confirmando o tipo explicitamente
        },
      );
    });

    return result;
  }

  //busca acessos com IDN_BIONOTIFICA = S
  async findChamadosByStatusOpen(): Promise<Chamado[]> {
    //const db = this.connectionService.getMainDatabase();
    const result = await new Promise<Chamado[]>((resolve, reject) => {
      this.db.query(
        'SELECT * FROM CHAMADOS WHERE STATUS = ?',
        ['ABERTO'],
        (err, result) => {
          if (err) return reject(err);
          const plained = plainToInstance(Chamado, result, {
            excludeExtraneousValues: true,
          });
          resolve(result); // Confirmando o tipo explicitamente
        },
      );
    });

    return result.map((chamado) => new ReturnChamadoDto(chamado));
  }
}

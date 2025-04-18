import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistRepository {
  constructor(@Inject('FIREBIRD_CONNECTION') private readonly db: any) {}

  async findBlacklistByIdTecnico(idTecnico: string): Promise<Array<string>> {
    //const db = this.connectionService.getMainDatabase();

    const result = await new Promise<Array<{ cnpj: string }>>(
      (resolve, reject) => {
        this.db.query(
          `select CNPJ from TECNICO_CHAT_ACESSOS(?)`,
          [idTecnico],
          (err, result) => {
            if (err) return reject(err);

            resolve(result); // Confirmando o tipo explicitamente
          },
        );
      },
    );

    return result.map((row) => row.cnpj) || [];
  }
}

import { JeedomApiResult } from './jeedomApiResult';

export class JeedomApiResponce<T> {
  public jsonrpc!: number;
  public id!: number;
  public result!: JeedomApiResult<T>;
}
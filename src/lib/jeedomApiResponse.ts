export class JeedomApiResponse<T> {
  public jsonrpc!: number;
  public id!: number;
  public result!: T;
}
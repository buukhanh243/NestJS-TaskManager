/* eslint-disable prettier/prettier */
export class ResponseData {
  private _statusCode: number;
  private _isSuccess: boolean;
  private _data: any;

  public get statusCode() {
    return this._statusCode;
  }

  public set statusCode(statusCode: number) {
    this._statusCode = statusCode;
  }

  public get isSuccess() {
    return this._isSuccess;
  }

  public set isSuccess(isSuccess: boolean) {
    this._isSuccess = isSuccess;
  }

  public get data() {
    return this._data;
  }

  public set data(data: any) {
    this._data = data;
  }
}

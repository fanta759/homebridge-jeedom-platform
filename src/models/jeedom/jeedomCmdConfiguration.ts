import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class JeedomCmdConfiguration {
  @jsonMember({ constructor: String })
  public group!: string;// "1",

  private _group!: number;

  public get Group(): number {
    if (this._group === undefined) {
      this._group = +this.group;
    }
    return this._group;
  }

  public set Group(value: number) {
    this._group = value;
  }

  @jsonMember({ constructor: String })
  public updateCmdId!: string;// "392",

  private _updateCmdId!: number;

  public get UpdateCmdId(): number {
    if (this._updateCmdId === undefined) {
      this._updateCmdId = +this.updateCmdId;
    }
    return this._updateCmdId;
  }

  public set UpdateCmdId(value: number) {
    this._updateCmdId = value;
  }

  @jsonMember({ constructor: String })
  public updateCmdToValue!: string;// "1",

  @jsonMember({ constructor: String })
  public logicalId!: string;// "6C7663#ID##GROUP#011E010001640D0A",

  @jsonMember({ constructor: String })
  public id!: string;// "",

  @jsonMember({ constructor: String })
  public returnStateValue!: string;// "",

  @jsonMember({ constructor: String })
  public returnStateTime!: string;// "",

  @jsonMember({ constructor: String })
  public minValue!: string;// "",

  private _minValue!: number;

  public get MinValue(): number {
    if (this._minValue === undefined) {
      this._minValue = +this.minValue;
    }
    return this._minValue;
  }

  public set MinValue(value: number) {
    this._minValue = value;
  }

  @jsonMember({ constructor: String })
  public maxValue!: string;// ""

  private _maxValue!: number;

  public get MaxValue(): number {
    if (this._maxValue === undefined) {
      this._maxValue = +this.maxValue;
    }
    return this._maxValue;
  }

  public set MaxValue(value: number) {
    this._maxValue = value;
  }
}
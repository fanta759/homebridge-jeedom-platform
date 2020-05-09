import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';
import { JeedomCmd } from './jeedomCmd';

@jsonObject
export class JeedomEqLogic {
  @jsonMember({ constructor: String })
  public id!: string;

  private _id!: number;

  public get Id(): number {
    if (this._id === undefined) {
      this._id = +this.id;
    }
    return this._id;
  }

  public set Id(value: number) {
    this._id = value;
  }

  @jsonMember({ constructor: String })
  public name!: string;

  @jsonMember({ constructor: String })
  public logicalId!: string;

  @jsonMember({ constructor: String })
  public object_id!: string;

  private _objectId!: number;

  public get ObjectId(): number {
    if (this._objectId === undefined) {
      this._objectId = +this.object_id;
    }
    return this._objectId;
  }

  public set ObjectId(value: number) {
    this._objectId = value;
  }

  @jsonMember({ constructor: String })
  public eqType_name!: string;

  @jsonMember({ constructor: String })
  public isVisible!: string;

  private _isVisible!: boolean;

  public get IsVisible(): boolean {
    if (this._isVisible === undefined) {
      this._isVisible = this.isVisible === '1';
    }
    return this._isVisible;
  }

  public set IsVisible(value: boolean) {
    this._isVisible = value;
  }

  @jsonMember({ constructor: String })
  public isEnable!: string;

  private _isEnable!: boolean;

  public get IsEnable(): boolean {
    if (this._isEnable === undefined) {
      this._isEnable = this.isEnable === '1';
    }
    return this._isEnable;
  }

  public set IsEnable(value: boolean) {
    this._isEnable = value;
  }

  @jsonArrayMember(JeedomCmd)
  public cmds!: JeedomCmd[];
}
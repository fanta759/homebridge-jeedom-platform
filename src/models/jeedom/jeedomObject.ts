import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';
import { JeedomEqLogic } from './jeedomEqLogic';

@jsonObject
export class JeedomObject {
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
  public father_id!: string;

  private _fatherId!: number;

  public get FatherId(): number {
    if (this._fatherId === undefined) {
      this._fatherId = +this.father_id;
    }
    return this._fatherId;
  }

  public set FatherId(value: number) {
    this._fatherId = value;
  }

  @jsonArrayMember(JeedomEqLogic)
  public eqLogics!: JeedomEqLogic[];
}
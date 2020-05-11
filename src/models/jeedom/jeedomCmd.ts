import { jsonObject, jsonMember } from 'typedjson';
import { GenericTypeEnum } from '../../enums/genericTypeEnum';
import { GenericTypesConverter } from '../../lib/genericTypesConverter';
import { JeedomCmdConfiguration } from './jeedomCmdConfiguration';

@jsonObject
export class JeedomCmd {
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
  public logicalId!: string;

  @jsonMember({ constructor: String })
  public generic_type!: string;  //"LIGHT_ON"

  private _genericType!: GenericTypeEnum;
  public get genericType(): GenericTypeEnum {
    if (this._genericType === undefined) {
      this._genericType = GenericTypesConverter.toGenericType(this.generic_type);
    }

    return this._genericType;
  }

  public set genericType(value: GenericTypeEnum) {
    this._genericType = value;
  }

  @jsonMember({ constructor: String })
  public eqType!: string;  //"edisio"

  @jsonMember({ constructor: String })
  public name!: string;  //"ON"

  @jsonMember({ constructor: String })
  public order!: string; //"0"

  private _order!: number;

  public get Order(): number {
    if (this._id === undefined) {
      this._order = +this.order;
    }
    return this._id;
  }

  public set Order(value: number) {
    this._order = value;
  }

  @jsonMember({ constructor: String })
  public type!: string;  //"action"

  @jsonMember({ constructor: String })
  public subType!: string; //"other"

  @jsonMember({ constructor: String })
  public eqLogic_id!: string; //"35"

  private _eqLogicId!: number;

  public get EqLogicId(): number {
    if (this._id === undefined) {
      this._eqLogicId = +this.eqLogic_id;
    }
    return this._eqLogicId;
  }

  public set EqLogicId(value: number) {
    this._eqLogicId = value;
  }

  @jsonMember({ constructor: String })
  public isHistorized!: string;

  private _isHistorized!: boolean;

  public get IsHistorized(): boolean {
    if (this._isHistorized === undefined) {
      this._isHistorized = this.isHistorized === '1';
    }
    return this._isHistorized;
  }

  public set IsHistorized(value: boolean) {
    this._isHistorized = value;
  }

  @jsonMember({ constructor: String })
  public unite!: string;

  @jsonMember({ constructor: String })
  public value!: string;

  @jsonMember({ constructor: String })
  public isVisible!: string;  //"1"

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

  @jsonMember({ constructor: JeedomCmdConfiguration })
  public configuration!: JeedomCmdConfiguration;
}
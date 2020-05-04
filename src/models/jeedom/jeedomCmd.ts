export class JeedomCmd {
  public Id: number;
  public LogicalId: string;
  public GenericType: string;  //"LIGHT_ON"
  public EqType: string;  //"edisio"
  public Name: string;  //"ON"
  public Order: number; //"0"
  public Type: string;  //"action"
  public SubType: string; //"other"
  public EqLogicId: number; //"35"
  public IsHistorized: boolean;
  public Unite: string;
  public Value: string;
  public IsVisible: boolean;  //"1"
  public MinValue: number;
  public MaxValue: number;

  constructor(
    id: string,
    logicalId: string,
    genericType: string,
    eqType: string,
    name: string,
    order: string,
    type: string,
    subType: string,
    eqLogicId: string,
    isHistorized: string,
    unite: string,
    value: string,
    isVisible: string,
    minValue: number,
    maxValue: number,
  ) {
    this.Id = +id;
    this.LogicalId = logicalId;
    this.GenericType = genericType;
    this.EqType = eqType;
    this.Name = name;
    this.Order = +order;
    this.Type = type;
    this.SubType = subType;
    this.EqLogicId = +eqLogicId;
    this.IsHistorized = isHistorized === '1';
    this.Unite = unite;
    this.Value = value;
    this.IsVisible = isVisible === '1';
    this.MinValue = +minValue;
    this.MaxValue = +maxValue;
  }
}
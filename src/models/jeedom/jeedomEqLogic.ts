import { JeedomCmd } from './jeedomCmd';

export class JeedomEqLogic {
  public Id: number;
  public Name: string;
  public LogicalId: string;
  public ObjectId: number;
  public EqTypeName: string;
  public IsVisible: boolean;
  public IsEnable: boolean;
  public Cmds: JeedomCmd[];

  constructor(
    id: string,
    name: string,
    logicalId: string,
    objectId: string,
    eqTypeName: string,
    isVisible: string,
    isEnable: string,
    cmds: any[],
  ) {
    this.Id = +id;
    this.Name = name;
    this.LogicalId = logicalId;
    this.ObjectId = +objectId;
    this.EqTypeName = eqTypeName;
    this.IsVisible = isVisible === '1';
    this.IsEnable = isEnable === '1';
    this.Cmds = [];

    for (const cmd of cmds) {
      if (cmd.generic_type === 'DONT') {
        continue;
      }

      this.Cmds.push(new JeedomCmd(cmd.id,
        cmd.logicalId,
        cmd.generic_type,
        cmd.eqType,
        cmd.name,
        cmd.order,
        cmd.type,
        cmd.subType,
        cmd.aqLogic_id,
        cmd.isHistorized,
        cmd.unite,
        cmd.value,
        cmd.isVisible,
        cmd.configuration.minValue,
        cmd.configuration.maxValue));
    }
  }
}
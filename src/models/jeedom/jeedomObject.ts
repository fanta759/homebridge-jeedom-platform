import { JeedomEqLogic } from './jeedomEqLogic';

export class JeedomObject {
  public Id: number;
  public Name: string;
  public FatherId: number;
  public EqLogics: JeedomEqLogic[];

  constructor(
    id: string,
    name: string,
    fatherId: string,
    eqLogics: any[],
  ) {
    this.Id = +id;
    this.Name = name;
    this.FatherId = +fatherId;
    this.EqLogics = [];

    for (const eqLogic of eqLogics) {
      this.EqLogics.push(new JeedomEqLogic(eqLogic.id,
        eqLogic.name,
        eqLogic.logicalId,
        eqLogic.objectId,
        eqLogic.eqType_name,
        eqLogic.isVisible,
        eqLogic.isEnable,
        eqLogic.cmds));
    }
  }
}
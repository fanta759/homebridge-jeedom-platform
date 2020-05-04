import * as Crypto from 'crypto';

import { Logger } from 'homebridge';
import { JeedomObject } from '../models/jeedom/jeedomObject';
import { JeedomEqLogic } from '../models/jeedom/jeedomEqLogic';

export class Helper {
  static filterEqLogicFromObjectd(objects: JeedomObject[], objectId: number, log: Logger): JeedomEqLogic[] {
    if (objectId === undefined || objectId === 0) {
      objectId = 1;
    }

    let eqLogics: JeedomEqLogic[] = [];

    const obj = objects.find(_ => _.Id === objectId);

    if (obj === undefined || obj.EqLogics === undefined) {
      return eqLogics;
    }

    for (const eqLogic of obj.EqLogics) {
      if (!eqLogic.IsEnable) {
        continue;
      }

      eqLogics.push(eqLogic);
    }

    const childObjects = objects.filter((o) => o.FatherId === obj.Id);

    for (const child of childObjects) {
      eqLogics = eqLogics.concat(this.filterEqLogicFromObjectd(objects, child.Id, log));
    }

    return eqLogics;
  }

  static getHash(data: object): string {
    return Crypto.createHash('MD5')
      .update(JSON.stringify(data))
      .digest('hex');
  }
}
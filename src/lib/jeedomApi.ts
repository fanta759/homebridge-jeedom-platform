import axios from 'axios';
import { Configuration } from '../models/configuration';
import { Helper } from './helpers';
import { JeedomEqLogic } from '../models/jeedom/jeedomEqLogic';
import { Logger } from 'homebridge';
import { JeedomObject } from '../models/jeedom/jeedomObject';
import { JeedomApiData } from './jeedomApiData';

export class JeedomApi {
  constructor(
    public readonly configuration: Configuration,
    public readonly log: Logger) {
  }

  getDevices(): Promise<JeedomEqLogic[] | undefined> {
    const data = this.buildData('object::full');

    return axios.post(this.url(), data)
      .then(res => {
        if (res.status === 200) {
          const objects: JeedomObject[] = [];

          for (const obj of res.data.result) {
            objects.push(new JeedomObject(obj.id, obj.name, obj.father_id, obj.eqLogics));
          }

          return Helper.filterEqLogicFromObjectd(objects, this.configuration.rootObjectId, this.log);
        }
      });
  }

  execCmd(cmdId: number) {
    const data = this.buildData('cmd::execCmd', cmdId);
    return this.sendExecCmd(data);
  }

  execCmdSlider(cmdId: number, slider: number) {
    const data = this.buildData('cmd::execCmd', cmdId);
    data.setSlider(slider);
    return this.sendExecCmd(data);
  }

  execCmdColor(cmdId: number, hexColor: string) {
    const data = this.buildData('cmd::execCmd', cmdId);
    data.setColor(hexColor);
    return this.sendExecCmd(data);
  }

  execCmdWithResult(cmdId: number) {
    const data = this.buildData('cmd::execCmd', cmdId);
    return axios.post(this.url(), data)
      .then(res => {
        if (res.status === 200) {
          return res.data.result.value as boolean;
        } else {
          return false;
        }
      });
  }

  private sendExecCmd(data: JeedomApiData) {
    return axios.post(this.url(), data)
      .then(res => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      });
  }

  private url() {
    return `http${this.configuration.https ? 's' : ''}://${this.configuration.server}/core/api/jeeApi.php`;
  }

  private buildData(method: string, id: number | undefined = undefined) {
    return new JeedomApiData(method, this.configuration.token, id);
  }
}
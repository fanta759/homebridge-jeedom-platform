import Axios, { AxiosError } from 'axios';
import { TypedJSON } from 'typedjson';
import { Configuration } from '../models/configuration';
import { Helper } from './helpers';
import { Logger } from 'homebridge';
import { JeedomObject } from '../models/jeedom/jeedomObject';
import { JeedomApiData } from './jeedomApiData';
import { JeedomApiResponse } from './jeedomApiResponse';
import { JeedomApiResult } from './jeedomApiResult';

export class JeedomApi {
  constructor(
    public readonly configuration: Configuration,
    public readonly log: Logger) {
  }

  async getDevices() {
    const data = this.buildData('object::full');

    try {
      const response = await Axios.post<JeedomApiResponse<JeedomObject[]>>(this.url(), data);
      const serializer = new TypedJSON(JeedomObject);
      const objects = serializer.parseAsArray(response.data.result);
      return Helper.filterEqLogicFromObjects(objects, this.configuration.rootObjectId, this.log);
    } catch (error) {
      if (error && error.response) {
        const axiosError = error as AxiosError;
        this.log.error(`Error on getDevice, code : ${axiosError.code} - data : ${data}`);
        return null;
      }

      throw error;
    }
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

  async execCmdWithResult<T>(cmdId: number): Promise<T | null> {
    const data = this.buildData('cmd::execCmd', cmdId);

    try {
      const response = await Axios.post<JeedomApiResponse<JeedomApiResult<T>>>(this.url(), data);
      return response.data.result.value;
    } catch (error) {
      if (error && error.response) {
        const axiosError = error as AxiosError;
        this.log.error(`Error on sendExecCmdWithResult, code : ${axiosError.code} - data : ${data}`);
        return null;
      }

      throw error;
    }
  }

  private async sendExecCmd(data: JeedomApiData) {
    try {
      await Axios.post(this.url(), data);
      return true;
    } catch (error) {
      if (error && error.response) {
        const axiosError = error as AxiosError;
        this.log.error(`Error on sendExecCmd, code : ${axiosError.code} - data : ${data}`);
        return false;
      }

      throw error;
    }
  }

  private url() {
    return `http${this.configuration.https ? 's' : ''}://${this.configuration.server}:${this.configuration.port}/core/api/jeeApi.php`;
  }

  private buildData(method: string, id: number | undefined = undefined) {
    return new JeedomApiData(method, this.configuration.token, id);
  }
}
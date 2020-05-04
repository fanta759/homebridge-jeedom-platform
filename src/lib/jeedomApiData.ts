import { JeedomApiDataParams } from './jeedomApiDataParams';

export class JeedomApiData {
  public jsonrpc = '2.0';
  public id = 1;
  public method: string;
  public params: JeedomApiDataParams;

  constructor(
    method: string,
    apikey: string,
    id: number | undefined = undefined,
  ) {
    this.method = method;
    this.params = new JeedomApiDataParams(apikey, id);
  }

  setSlider(slider: number) {
    this.params.setSlider(slider);
  }

  setColor(color: string) {
    this.params.setColor(color);
  }
}
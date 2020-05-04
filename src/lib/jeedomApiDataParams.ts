import { JeedomApiDataParamsOptions } from './jeedomApiDataParamsOptions';

export class JeedomApiDataParams {
  public apikey: string;
  public id: number | undefined;
  public options: JeedomApiDataParamsOptions | undefined;

  constructor(
    apikey: string,
    id: number | undefined = undefined,
  ) {
    this.apikey = apikey;
    this.id = id;
  }

  setSlider(slider: number) {
    if (this.options === undefined) {
      this.options = new JeedomApiDataParamsOptions();
    }

    this.options.setSlider(slider);
  }

  setColor(color: string) {
    if (this.options === undefined) {
      this.options = new JeedomApiDataParamsOptions();
    }

    this.options.setColor(color);
  }
}
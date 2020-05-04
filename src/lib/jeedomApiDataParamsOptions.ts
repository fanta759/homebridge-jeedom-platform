export class JeedomApiDataParamsOptions {
  public slider: number | undefined;
  public color: string | undefined;

  setSlider(slider: number) {
    this.slider = slider;
  }

  setColor(color: string) {
    this.color = `#${color}`;
  }
}
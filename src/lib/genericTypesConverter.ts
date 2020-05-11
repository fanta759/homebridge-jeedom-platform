import { GenericTypeEnum } from '../enums/genericTypeEnum';

export class GenericTypesConverter {
  static toGenericType(type: string): GenericTypeEnum {
    switch (type) {
      case 'LIGHT_TOGGLE':
        return GenericTypeEnum.LightToggle;
      case 'LIGHT_ON':
        return GenericTypeEnum.LightOn;
      case 'LIGHT_OFF':
        return GenericTypeEnum.LightOff;
      case 'LIGHT_SLIDER':
        return GenericTypeEnum.LightSlider;
      case 'LIGHT_SET_COLOR':
        return GenericTypeEnum.LightSetColor;
      case 'LIGHT_MODE':
        return GenericTypeEnum.LightMode;
      case 'LIGHT_SET_COLOR_TEMP':
        return GenericTypeEnum.LightSetColorTemp;
      case 'LIGHT_STATE':
        return GenericTypeEnum.LightState;
      case 'LIGHT_BRIGHTNESS':
        return GenericTypeEnum.LightBrightness;
      case 'LIGHT_COLOR':
        return GenericTypeEnum.LightColor;
      case 'LIGHT_STATE_BOOL':
        return GenericTypeEnum.LightStateBool;
      case 'LIGHT_COLOR_TEMP':
        return GenericTypeEnum.LightColorTemp;
      default:
        return GenericTypeEnum.None;
    }
  }

  static toString(type: GenericTypeEnum): string {
    switch (type) {
      case GenericTypeEnum.LightToggle:
        return 'LIGHT_TOGGLE';
      case GenericTypeEnum.LightOn:
        return 'LIGHT_ON';
      case GenericTypeEnum.LightOff:
        return 'LIGHT_OFF';
      case GenericTypeEnum.LightSlider:
        return 'LIGHT_SLIDER';
      case GenericTypeEnum.LightSetColor:
        return 'LIGHT_SET_COLOR';
      case GenericTypeEnum.LightMode:
        return 'LIGHT_MODE';
      case GenericTypeEnum.LightSetColorTemp:
        return 'LIGHT_SET_COLOR_TEMP';
      case GenericTypeEnum.LightState:
        return 'LIGHT_STATE';
      case GenericTypeEnum.LightBrightness:
        return 'LIGHT_BRIGHTNESS';
      case GenericTypeEnum.LightColor:
        return 'LIGHT_COLOR';
      case GenericTypeEnum.LightStateBool:
        return 'LIGHT_STATE_BOOL';
      case GenericTypeEnum.LightColorTemp:
        return 'LIGHT_COLOR_TEMP';
      default:
        return '';
    }
  }
}
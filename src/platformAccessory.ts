import { CharacteristicEventTypes } from 'homebridge';
import type { Service, PlatformAccessory, CharacteristicValue, CharacteristicSetCallback, CharacteristicGetCallback } from 'homebridge';
import * as ColorConvert from 'color-convert';

import { JeedomHomebridgePlatform } from './platform';
import { DeviceTypeEnum } from './enums/deviceTypeEnum';
import { JeedomEqLogic } from './models/jeedom/jeedomEqLogic';
import { JeedomCmd } from './models/jeedom/jeedomCmd';
import { JeedomApi } from './lib/jeedomApi';
import { Helper } from './lib/helpers';
import { GenericTypeEnum } from './enums/genericTypeEnum';
import { GenericTypesConverter } from './lib/genericTypesConverter';

/**
 * Jeedom Platform Accessory
 * An instance of this class is created for each device discovered from Jeedom the the platform registers
 */
export class JeedomPlatformAccessory {
  private service!: Service;
  private device!: JeedomEqLogic;
  private previousSyncHash = '';
  private colorUpdated = false;

  private deviceType = DeviceTypeEnum.None;
  private onCmdId!: number;
  private offCmdId!: number;
  private brightnessCmdId!: number;
  private colorCmdId!: number;
  private stateCmdId!: number;
  private brightnessStateCmdId!: number;
  private colorStateCmdId!: number;
  private stateIntervalId!: NodeJS.Timeout;

  public UUID: string;

  /**
   * This is to track the device state
   */
  private states = {
    On: false,
    Hue: 0,
    Saturation: 0,
    Brightness: 100,
  }

  /**
   * The constructor of a device to be expose in Homebridge
   * @param platform 
   * @param platformAccessory 
   * @param jeedomApi 
   */
  constructor(
    private readonly platform: JeedomHomebridgePlatform,
    public readonly platformAccessory: PlatformAccessory,
    private readonly jeedomApi: JeedomApi,
  ) {
    this.UUID = this.platformAccessory.UUID;
    this.configure();
  }

  /**
   * This is to configure the accessory when it's create from scratch or from update
   * @param newSyncHash the hash of the new device when update accessory
   */
  configure(newSyncHash: string | undefined = undefined) {
    // Store a copy of the device object in the accessory.context
    this.device = this.platformAccessory.context.device;

    // Compute the hash of the current device to check update
    if (newSyncHash === undefined) {
      newSyncHash = Helper.getHash(this.device);
    }

    this.previousSyncHash = newSyncHash;

    const serialNumber = this.device.logicalId ? this.device.logicalId : 'Default-Serial';

    // set accessory information
    this.platformAccessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, this.device.eqType_name)// 'Default-Manufacturer')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, serialNumber); //'Default-Serial');

    // Loop around commands of the Jeedom device to add and configure services and characteristics
    for (const cmd of this.device.cmds) {
      this.platform.log.debug(`Setting the ${GenericTypesConverter.toString(cmd.genericType)} cmd of ${this.device.name}`);
      switch (cmd.genericType) {
        case GenericTypeEnum.LightToggle:
          this.setCharacteristicToggle(cmd);
          break;
        case GenericTypeEnum.LightOn:
          this.setCharacteristicOn(cmd);
          break;
        case GenericTypeEnum.LightOff:
          this.setCharacteristicOff(cmd);
          break;
        case GenericTypeEnum.LightSlider:
          this.setCharacteristicBrightness(cmd);
          break;
        case GenericTypeEnum.LightSetColor:
          this.setCharacteristicColor(cmd);
          break;
        case GenericTypeEnum.LightState:
        case GenericTypeEnum.LightStateBool:
          this.setCharacteristicState(cmd);
          break;
        case GenericTypeEnum.LightBrightness:
          this.setCharacteristicBrightnessState(cmd);
          break;
        case GenericTypeEnum.LightColor:
          this.setCharacteristicColorState(cmd);
          break;
      }
    }
  }

  /**
   * Set the lightbulb service
   */
  setServiceLightBulb() {
    if (this.service !== undefined) {
      this.platform.log.debug(`The lightbuld service of ${this.device.name} is already define`);
      return;
    }

    this.deviceType = DeviceTypeEnum.Light;

    this.platform.log.debug(`Defining the lightbuld service of ${this.device.name} `);
    this.service = this.platformAccessory.getService(this.platform.Service.Lightbulb)
      ?? this.platformAccessory.addService(this.platform.Service.Lightbulb);

    this.service.setCharacteristic(this.platform.Characteristic.Name, this.device.name);
  }

  setCharacteristicToggle(cmd: JeedomCmd) {
    this.setCharacteristicOn(cmd);
    this.setCharacteristicOff(cmd);
  }

  /**
   * Configure characteritic light on
   * @param cmd the Jeedom device LIGHT_ON command
   */
  setCharacteristicOn(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    this.onCmdId = cmd.Id;

    if (!this.offCmdId) {
      this.service.getCharacteristic(this.platform.Characteristic.On)
        .on(CharacteristicEventTypes.SET, this.setOn.bind(this))
        .on(CharacteristicEventTypes.GET, this.getOn.bind(this));
    }
  }

  /**
   * Configure characteritic light off
   * @param cmd the Jeedom device LIGHT_OFF command
   */
  setCharacteristicOff(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    this.offCmdId = cmd.Id;

    if (!this.onCmdId) {
      this.service.getCharacteristic(this.platform.Characteristic.On)
        .on(CharacteristicEventTypes.SET, this.setOn.bind(this))
        .on(CharacteristicEventTypes.GET, this.getOn.bind(this));
    }
  }

  /**
   * Configure characteritic light brightness
   * @param cmd the Jeedom device LIGHT_SLIDER command
   */
  setCharacteristicBrightness(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    if (this.deviceType < DeviceTypeEnum.LightBrightness) {
      this.deviceType = DeviceTypeEnum.LightBrightness;
    }
    this.brightnessCmdId = cmd.Id;

    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .on(CharacteristicEventTypes.SET, this.setBrightness.bind(this))
      .setProps({
        maxValue: cmd.configuration.MaxValue,
        minValue: cmd.configuration.MinValue,
      });
  }

  /**
   * Configure characteritics for light color
   * @param cmd the Jeedom device LIGHT_COLOR command
   */
  setCharacteristicColor(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    if (this.deviceType < DeviceTypeEnum.LightColor) {
      this.deviceType = DeviceTypeEnum.LightColor;
    }
    this.colorCmdId = cmd.Id;

    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .on(CharacteristicEventTypes.SET, this.setColorBrightness.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.Hue)
      .on(CharacteristicEventTypes.SET, this.setColorHue.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.Saturation)
      .on(CharacteristicEventTypes.SET, this.setColorSaturation.bind(this));
  }

  /**
  * Configure characteritic light state
  * @param cmd the Jeedom device LIGHT_STATE command
  */
  setCharacteristicState(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    this.stateCmdId = cmd.Id;
  }

  /**
  * Configure characteritic light state
  * @param cmd the Jeedom device LIGHT_STATE command
  */
  setCharacteristicBrightnessState(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    this.brightnessStateCmdId = cmd.Id;
  }

  /**
  * Configure characteritic light state
  * @param cmd the Jeedom device LIGHT_STATE command
  */
  setCharacteristicColorState(cmd: JeedomCmd) {
    this.setServiceLightBulb();
    this.colorStateCmdId = cmd.Id;
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */

  /**
  * Handle turning on/off light bulb
  * @param value ths on/off value
  * @param callback a callback to call a the end
  */
  setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    const val = value as boolean;

    // If the light state is same of value to set we skip it
    if (this.states.On !== val) {
      if (val) {
        this.jeedomApi.execCmd(this.onCmdId);
      } else {
        this.jeedomApi.execCmd(this.offCmdId);
      }

      this.states.On = val;

      this.platform.log.debug('Set Characteristic On ->', val);
    }

    // you must call the callback function
    callback(null);
  }

  /**
   * Handle brightness of light bulb
   * @param value the brightness value
   * @param callback a callback to call a the end
   */
  setBrightness(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    this.jeedomApi.execCmdSlider(this.brightnessCmdId, value as number);

    this.platform.log.debug('Set Characteristic Brightness -> ', value);

    // you must call the callback function
    callback(null);
  }

  /**
   * Handle brightness of light bulb when device is a LightBulbColor
   * @param value the brightness value
   * @param callback a callback to call a the end
   */
  setColorBrightness(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    this.states.Brightness = value as number;
    this.setColor();

    this.platform.log.debug('Set Characteristic color Brightness -> ', value);

    // you must call the callback function
    callback(null);
  }

  /**
   * Handle hue of light bulb when device is a LightBulbColor
   * @param value the hue value
   * @param callback a callback to call a the end
   */
  setColorHue(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    this.states.Hue = value as number;

    this.platform.log.debug('Set Characteristic color Hue -> ', value);

    // When color is updated both Hue and Saturation is updated.
    // Call just once setColor
    if (this.colorUpdated) {
      this.setColor();
    } else {
      this.colorUpdated = true;
    }

    // you must call the callback function
    callback(null);
  }

  /**
   * Handle saturation of light bulb when device is a LightBulbColor
   * @param value the saturation value
   * @param callback a callback to call a the end
   */
  setColorSaturation(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    this.states.Saturation = value as number;

    this.platform.log.debug('Set Characteristic color Saturation -> ', value);

    // When color is updated both Hue and Saturation is updated.
    // Call just once setColor
    if (this.colorUpdated) {
      this.setColor();
    } else {
      this.colorUpdated = true;
    }

    // you must call the callback function
    callback(null);
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a Light bulb is on.
   *
   * GET requests should return as fast as possbile. A long delay here will result in
   * HomeKit being unresponsive and a bad user experience in general.
   *
   * If your device takes time to respond you should update the status of your device
   * asynchronously instead using the `updateCharacteristic` method instead.
   * @example
   * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
   */

  /**
   * 
   * @param callback a callback to call a the end
   */
  getOn(callback: CharacteristicGetCallback) {

    // implement your own code to check if the device is on
    const isOn = this.states.On;

    this.platform.log.debug('Get Characteristic On ->', isOn);

    // you must call the callback function
    // the first argument should be null if there were no errors
    // the second argument should be the value to return
    callback(null, isOn);
  }

  /**
   * This is to set the color of the Jeedom device
   */
  private setColor() {
    // Convert the Hue/Saturation/Brightness to hex color
    const hexColor = ColorConvert.hsv.hex([this.states.Hue, this.states.Saturation, this.states.Brightness]);
    this.jeedomApi.execCmdColor(this.colorCmdId, hexColor);

    this.platform.log.debug(`Set color -> #${hexColor}`);

    this.colorUpdated = false;
  }

  /**
   * This is to asynchronously update the state of the accessory from Jeedom
   */
  private async updateState() {
    // Get State from Jeedom
    const state = await this.jeedomApi.execCmdWithResult<boolean>(this.stateCmdId);
    if (state === null) {
      this.platform.log.debug(`Retreived current state of ${this.device.name} Failed !`);
      return;
    }

    this.states.On = state;

    // push the new value to HomeKit
    this.service.updateCharacteristic(this.platform.Characteristic.On, state);

    this.platform.log.debug(`Pushed updated current state of ${this.device.name} to HomeKit: ${state}`);
  }

  /**
   * This is to asynchronously update the state of the accessory from Jeedom
   */
  private async updateBrightnessState() {
    // Get State from Jeedom
    const state = await this.jeedomApi.execCmdWithResult<number>(this.brightnessStateCmdId);

    if (state === null) {
      this.platform.log.debug(`Retreived current state of ${this.device.name} Failed !`);
      return;
    }

    this.states.Brightness = state;

    // push the new value to HomeKit
    this.service.updateCharacteristic(this.platform.Characteristic.Brightness, state);

    this.platform.log.debug(`Pushed updated current brightness state of ${this.device.name} to HomeKit: ${state}`);
  }

  /**
   * This is to asynchronously update the state of the accessory from Jeedom
   */
  private async updateColorState() {
    // Get State from Jeedom
    let state = await this.jeedomApi.execCmdWithResult<string>(this.colorStateCmdId);

    if (state === null) {
      this.platform.log.debug(`Retreived current state of ${this.device.name} Failed !`);
      return;
    }

    state = state.substring(1);

    [this.states.Hue, this.states.Saturation, this.states.Brightness] = ColorConvert.hex.hsv(state);

    // push the new value to HomeKit
    this.service.updateCharacteristic(this.platform.Characteristic.Hue, this.states.Hue);
    this.service.updateCharacteristic(this.platform.Characteristic.Saturation, this.states.Saturation);
    this.service.updateCharacteristic(this.platform.Characteristic.Brightness, this.states.Brightness);

    this.platform.log.debug(`Pushed updated current color state of ${this.device.name} to HomeKit: #${state} `
      + `Hue: ${this.states.Hue} - Saturation: ${this.states.Saturation} - Brightness: ${this.states.Brightness}`);
  }

  private async updateStates() {
    await this.updateState();

    if (this.deviceType === DeviceTypeEnum.LightBrightness) {
      await this.updateBrightnessState();
    }

    if (this.deviceType === DeviceTypeEnum.LightColor) {
      await this.updateColorState();
    }
  }

  /**
   * Check if this accessory is Ready to add in homebridge
   */
  isReady(): boolean {
    this.platform.log.debug(`Device ${this.device.name} is type ${this.deviceType}`);
    this.platform.log.debug(`Device ${this.device.name} onCmd ${this.onCmdId} ` +
      `offCmd ${this.offCmdId} ` +
      `stateCmd ${this.stateCmdId} ` +
      `brightnessCmd ${this.brightnessCmdId} ` +
      `colorCmd ${this.colorCmdId}`);

    switch (this.deviceType) {
      case DeviceTypeEnum.Light:
        return this.onCmdId !== 0
          && this.offCmdId !== 0
          && this.stateCmdId !== 0;
      case DeviceTypeEnum.LightBrightness:
        return this.onCmdId !== 0
          && this.offCmdId !== 0
          && this.stateCmdId !== 0
          && this.brightnessCmdId !== 0;
      case DeviceTypeEnum.LightColor:
        return this.onCmdId !== 0
          && this.offCmdId !== 0
          && this.stateCmdId !== 0
          && this.brightnessCmdId !== 0
          && this.colorCmdId !== 0;
      case DeviceTypeEnum.None:
      default:
        return false;
    }
  }

  /**
   * When adding in homebridge start the asynchronoulsy update of the accessory
   */
  added() {
    this.stateIntervalId = setInterval(this.updateStates.bind(this), this.platform.configuration.deviceStateSyncInterval * 1000);
  }

  /**
   * When removing from homebridge stop the asynchronoulsy update of the accessory
   */
  removed() {
    clearInterval(this.stateIntervalId);
  }

  /**
   * Clear and update ths accessory from an updated Jeedom device
   * @param updatedDevice the updated Jeedom device
   */
  updateFromDevice(updatedDevice: JeedomEqLogic) {
    const newSyncHash = Helper.getHash(updatedDevice);

    // Check with hash if the Jeedom device have a device
    if (this.previousSyncHash === newSyncHash) {
      this.platform.log.debug(`No update to do on accessory ${this.device.name}, old : ${this.previousSyncHash} - new : ${newSyncHash}`);
      return;
    }

    this.platform.log.debug(`the accessory ${this.device.name} need to be updated, old : ${this.previousSyncHash} - new : ${newSyncHash}`);

    this.platformAccessory.context.device = updatedDevice;
    this.platformAccessory.removeService(this.service);
    this.configure(newSyncHash);
  }
}
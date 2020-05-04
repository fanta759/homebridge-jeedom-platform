import { APIEvent } from 'homebridge';
import type { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { JeedomPlatformAccessory } from './platformAccessory';
import { Configuration } from './models/configuration';
import { JeedomApi } from './lib/jeedomApi';
import { Helper } from './lib/helpers';

/**
 * JeedomHomebridgePlatformx²
 */
export class JeedomHomebridgePlatform implements DynamicPlatformPlugin {
  private readonly jeedomApi: JeedomApi;
  private previousSyncHash = '';

  public readonly Service = this.api.hap.Service;
  public readonly Characteristic = this.api.hap.Characteristic;

  // this is used to track restored cached accessories
  public readonly accessories: JeedomPlatformAccessory[] = [];

  public readonly configuration: Configuration;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Started initializing platform:', this.config.name);
    this.configuration = new Configuration(this.config);
    this.jeedomApi = new JeedomApi(this.configuration, this.log);

    this.log.debug(this.configuration.toString());
    if (!this.configuration.isConfigurationOK()) {
      this.log.debug(`Aborted initializing platform ${this.config.name}, because config isn't OK`);
      return;
    }

    this.log.debug('Finished initializing platform:', this.config.name);

    // When this event is fired it means Homebridge has restored all cached accessories from disk.
    // Dynamic Platform plugins should only register new accessories after this event was fired,
    // in order to ensure they weren't added to homebridge already. This event can also be used
    // to start discovery of new accessories.
    this.api.on(APIEvent.DID_FINISH_LAUNCHING, () => {
      log.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      this.synchronizeDevices();
    });
  }

  /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
  configureAccessory(platformAccessory: PlatformAccessory) {
    if (!platformAccessory.context || !platformAccessory.context.device) {
      // Remove invalid accessory from cache
      try {
        this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [platformAccessory]);
      } catch (e) {
        this.log.error(`Couldn't unregister cached platform accessory\n${e}`);
      }
      return;
    }

    this.log.info('Restoring accessory from cache:', platformAccessory.displayName);

    // create the accessory handler
    // this is imported from `platformAccessory.ts`
    const accessory = new JeedomPlatformAccessory(this, platformAccessory, this.jeedomApi);
    accessory.added();

    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }

  /**
   * This function is invoked to synchronize all devices in Jeedom
   */
  async synchronizeDevices() {
    this.log.debug('Starting synchronize devices');

    // Get eqLogic from Jeedom
    const devices = await this.jeedomApi.getDevices();

    // No device found
    if (devices === undefined) {
      this.log.debug('Fetch no device');
      return;
    }

    // Check if there is an update with hash
    const newSyncHash = Helper.getHash(devices);

    if (this.previousSyncHash === newSyncHash) {
      this.log.debug('No update from Jeedom to do');
      setTimeout(this.synchronizeDevices.bind(this), this.configuration.devicesSyncInterval * 60 * 1000);
      return;
    }

    this.previousSyncHash = newSyncHash;

    this.log.debug(`Fetch ${devices?.length} devices`);
    this.log.debug('Starting loop around fetched devices');

    const foundDevices: string[] = [];

    // Loop over the discovered devices and register each one if it has not already been registered
    for (const device of devices) {
      if (this.configuration.excludedDevices.find(excludedDeviceId => device.Id === excludedDeviceId)) {
        this.log.debug(`The device ${device.Name} is excluded from configuration file`);
        continue;
      }

      const uuid = this.api.hap.uuid.generate(`${device.Id}`);
      foundDevices.push(uuid);

      // Check that the device has already been registered by checking the
      // cached devices we stored in the configureAccessory method
      const existingDevice = this.accessories.find(accessory => accessory.UUID === uuid);
      if (existingDevice) {
        this.log.debug(`Device ${device.Name} already added from cache`);

        existingDevice.updateFromDevice(device);
        continue;
      }

      this.log.info(`Registering new accessory: ${device.Name} : ${uuid}`);

      // Create a new accessory
      const platformAccessory = new this.api.platformAccessory(device.Name, uuid);

      platformAccessory.context.device = device;
      // Create the accessory handler
      const accessory = new JeedomPlatformAccessory(this, platformAccessory, this.jeedomApi);

      if (!accessory.isReady()) {
        continue;
      }

      accessory.added();

      // link the accessory to your platform
      this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [platformAccessory]);

      // push into accessory cache
      this.accessories.push(accessory);
    }
    this.log.debug('Finished loop around fetched devices');
    this.log.debug(`foundDevices : ${foundDevices.length} - accessories : ${this.accessories.length}`);

    // Filter all accessories not in found devices
    const removedAccessories = this.accessories.filter(accessory => !foundDevices.find(foundDevice => foundDevice === accessory.UUID));
    this.log.debug(`${removedAccessories.length} devices to removed`);

    // Remove all obsolete accessories
    for (const removedAccessory of removedAccessories) {
      removedAccessory.removed();
      // Unregister accessory
      this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [removedAccessory.platformAccessory]);

      // Remove accessory from this.accessories
      const removedIndex = this.accessories.indexOf(removedAccessory);
      this.accessories.splice(removedIndex, 1);
    }

    // Set a timeout to synchronize every this.configuration.devicesSyncInterval minutes
    setTimeout(this.synchronizeDevices.bind(this), this.configuration.devicesSyncInterval * 60 * 1000);
  }
}

import type { PlatformConfig } from 'homebridge';

export class Configuration implements PlatformConfig {
  platform: string;
  public readonly name: string | undefined;
  public readonly server: string;
  public readonly port: number;
  public readonly https: boolean;
  public readonly token: string;
  public readonly rootObjectId: number;
  public readonly excludedDevices: number[];
  public readonly devicesSyncInterval: number;
  public readonly deviceStateSyncInterval: number;

  constructor(config: PlatformConfig) {
    this.platform = config.platform;
    this.name = config.name;
    this.server = config.server;
    this.port = config.port;
    this.https = config.https;
    this.token = config.token;
    this.rootObjectId = config.rootObjectId;
    this.excludedDevices = config.excludedDevices;
    this.devicesSyncInterval = config.devicesSyncInterval;
    this.deviceStateSyncInterval = config.deviceStateSyncInterval;
  }

  isConfigurationOK() {
    return this.name
      && this.server
      && this.port
      && this.token
      && this.rootObjectId !== undefined
      && this.devicesSyncInterval >= 0
      && this.deviceStateSyncInterval > 0;
  }

  toString() {
    return `Config : ${JSON.stringify(this)}`;
  }
}
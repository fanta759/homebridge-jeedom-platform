[![npm (tag)](https://img.shields.io/npm/v/homebridge-jeedom-platform/latest?logo=npm)](https://www.npmjs.com/package/homebridge-jeedom-platform)
[![npm](https://img.shields.io/npm/dt/homebridge-jeedom-platform?label=Downloads&logo=npm)](https://www.npmjs.com/package/homebridge-jeedom-platform)
[![node-current](https://img.shields.io/node/v/homebridge-jeedom-platform?label=Node&logo=Node.JS)](https://nodejs.org/)
[![npm dev dependency version](https://img.shields.io/npm/dependency-version/homebridge-jeedom-platform/dev/homebridge?label=Homebridge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIj48ZGVmcz48c3R5bGU+LmF7aXNvbGF0aW9uOmlzb2xhdGU7fS5ie2ZpbGw6dXJsKCNhKTt9LmN7ZmlsbDp1cmwoI2IpO30uZHtvcGFjaXR5OjAuMjU7bWl4LWJsZW5kLW1vZGU6bXVsdGlwbHk7fS5le2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1MDAiIHgyPSI1MDAiIHkyPSIxMDAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNTcyNzdjIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDkxZjU5Ii8+PC9saW5lYXJHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImIiIGN4PSI1MDAiIGN5PSI1MDAiIHI9IjUwMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9IjAuMSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxnIGNsYXNzPSJhIj48Y2lyY2xlIGNsYXNzPSJiIiBjeD0iNTAwIiBjeT0iNTAwIiByPSI1MDAiLz48Y2lyY2xlIGNsYXNzPSJjIiBjeD0iNTAwIiBjeT0iNTAwIiByPSI1MDAiLz48cGF0aCBjbGFzcz0iZSIgZD0iTTgzOS4wNSw0NDkuMjFoLS41Mkw3NzcuNDEsMzg4LjFhMTEuNzYsMTEuNzYsMCwwLDEtMy40Ny04LjMzdi0xNDFhNTQuMTUsNTQuMTUsMCwwLDAtNTQuMDgtNTQuMDhINjgxLjY5YTU0LjE2LDU0LjE2LDAsMCwwLTU0LjExLDU0LjA4di44MWwtOTAuMjMtODcuMzlhNTQuMzgsNTQuMzgsMCwwLDAtNzUuOTEuNjNMMTU1Ljg3LDQ1OC40MWE1NCw1NCwwLDAsMC0uMDgsNzYuNDRsLjA4LjA5TDE4NSw1NjMuODhhNTQuMjIsNTQuMjIsMCwwLDAsNzYuMjIuMzFMNDk2LDMzMi43NmExMS44NSwxMS44NSwwLDAsMSwxNi42NywwTDc0Mi43OCw1NjIuODhhMTEuODcsMTEuODcsMCwwLDEsMCwxNi42N0w3MTQuNSw2MDcuODNhMTEuODcsMTEuODcsMCwwLDEtMTYuNjcsMEw1MzYuMjcsNDUxLjI3YTU0LjI5LDU0LjI5LDAsMCwwLTc2LjA2LjY2bC0xNTUsMTU1Ljg0YTU0LjIxLDU0LjIxLDAsMCwwLDAsNzYuNDJsMjguNywyOC42OWE1NC4xOSw1NC4xOSwwLDAsMCw3Ni4yOC4ybDgzLjU4LTgyLjU5YTExLjg3LDExLjg3LDAsMCwxLDE2LjY3LDBsODMuMTEsODEuN2ExMS42NywxMS42NywwLDAsMSwzLjUzLDguMzMsMTEuODUsMTEuODUsMCwwLDEtMy40Nyw4LjM0bC04Mi4zMSw4Mi41NWMtLjM2LDAtLjY3LS4yMi0xLjA2LS4yMmEzMC44NiwzMC44NiwwLDEsMCwzMC44NywzMC44NnYtLjUybDgyLjY5LTgyLjY3YTU0LjExLDU0LjExLDAsMCwwLDAtNzYuNTNsLS4zMS0uMzEtODMuMTEtODEuNjdhNTQuMjYsNTQuMjYsMCwwLDAtNzYsMGwtODMuODYsODIuN2ExMS44MSwxMS44MSwwLDAsMS0xNi42NywwbC0yOC42NC0yOC43MmExMS44NywxMS44NywwLDAsMSwwLTE2LjY3TDQ5MC4zNSw0ODEuODJhMTEuODEsMTEuODEsMCwwLDEsMTYuNjctLjE2TDY2OC41NSw2MzguNmE1NC4zNiw1NC4zNiwwLDAsMCw3Ni0uNTVsMjguMy0yOC4zMWE1NC4xNiw1NC4xNiwwLDAsMCwwLTc2LjVMNTQyLjYsMzAzYTU0LjI1LDU0LjI1LDAsMCwwLTc2LjI1LS4zM0wyMzEuNTEsNTM0LjA1YTExLjkxLDExLjkxLDAsMCwxLTE2LjY2LDBsLTI5LTI5LjA2YTExLjgxLDExLjgxLDAsMCwxLDAtMTYuNjdMNDkxLjQ0LDE4Mi43NmExMS44MywxMS44MywwLDAsMSwxNi42Ni0uMTRMNjcwLjA1LDMzOS4zNVYyMzguNzlBMTEuODUsMTEuODUsMCwwLDEsNjgxLjg2LDIyN0g3MjBhMTEuODcsMTEuODcsMCwwLDEsMTEuODQsMTEuODFWMzgwYTU0LjYyLDU0LjYyLDAsMCwwLDE1LjgzLDM4LjI1bDYwLjgxLDYwLjgxYzAsLjM4LS4yMi42OS0uMjIsMS4wNWEzMC44NiwzMC44NiwwLDEsMCwzMC44My0zMC44OVoiLz48L2c+PC9zdmc+)](https://github.com/homebridge/homebridge)

[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/homebridge-jeedom-platform)](https://libraries.io/npm/homebridge-jeedom-platform)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fanta759/homebridge-jeedom-platform/Build%20and%20Lint?label=Build%20and%20Lint&logo=Github)](https://github.com/fanta759/homebridge-jeedom-platform/actions?query=workflow%3A%22Build+and+Lint%22)


# Homebridge-Jeedom-Platform
This is a plugin for [Homebridge](https://github.com/nfarina/homebridge) and [Homebridge Config UI X Support](https://github.com/oznu/homebridge-config-ui-x) and [Jeedom](https://www.jeedom.com/).

## Supports:
<details>
<summary><b>Standard HomeKit Types (supported by Home.app):</b></summary>
    
- Lamps (on/off)
- Lamps (dimmer)
- Lamps (color)
</details>

## Installation

**Option 1: Install via Homebridge Config UI X:**

 1. Navigate to the Plugins page in in [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x).
 2. Search for "jeedom" and install homebridge-jeedom-platform.

**Option 2: Manually Install:**
```
sudo npm install -g homebridge-jeedom-platform
```

## Update

**Option 1: Update via Homebridge Config UI X:**

 1. Navigate to the Plugins page in [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x).
 2. Click the Update button for the Jeedom platform plugin.

**Option 2: Manually Update:**
```
sudo npm update -g homebridge-jeedom-platform
```

## Configuration

To configure homebridge-jeedom-platform you must also be running [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x).

 1. Navigate to the Plugins page in homebridge-config-ui-x.
 2. Click the Settings button for the Jeedom Platform plugin.
 
 ![sJeedom](jeedom-platform.png)
 
### Manual Settings

<details><summary><b>Manual Configuration</b></summary>

~/.homebridge/config.json example:
```js
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:21:3E:E4:DE:33",
        "port": 51826,
        "pin": "031-45-154"
    },
    "platforms": [
        {
	    "platform": "HomebridgeJeedomPlatform",
	    "name": "Jeedom",
	    "server": "127.0.0.1",
	    "port": 80,
	    "https": 0,
	    "token": "CNHLlaXdDWRHO1GitAc0jPjTpY7JcGVv",
	    "rootObjectId": 0,
	    "devicesSyncInterval": 10,
	    "deviceStateSyncInterval": 10,
	    "excludedDevices": []
        }
    ],
    "accessories": []
}
```
To prevent certain Jeedom devices from showing up in HomeBridge it is possible to exclude them by setting the "excludedDevices" parameter.
Provide an array of Jeedom Device ID's, which can be found in the Jeedom dashboard on the "Analysis > Home Automation summary" page and look for the "id" at the start of each line of device.

```js
"excludedDevices": ["12","30","129"]
```
</details>

<details><summary><b>Advanced Configuration</b></summary>

### Devices synchonization interval
By default, the plugin synchronize the hardware informations every 10 minutes. You can increase or decrease this intervale or cancel the synchonization by setting at 0.

### Device state synchonization interval
By default, the plugin synchronize the device staye every 10 seconde. You can increase or decrease this intervale. You cant't cancel the synchonization by setting at 0.
</details>

## Tips

### Issues pairing to Homebridge when you have a lot of Jeedom devices...
If you have more than 99 devices in Jeedom, you need to limit the number of devices exposed to HomeKit (Homebridge only supports 99 Accessories on a single bridge - whilst we could combine multiple sensors into a single homekit accessory within the plugin, the possible combinations out there are endless, so we won't).

Therefore, to reduce the number of devices exposed from Jeedom, create a object within Jeedom via Tools > Objects. Add only the devices you wish to be exposed to HomeKit to this new object within Jeedom, and then get it's ID number. Set "rootObjectId" in your config.json file to this object number.

### Is my device supported??
To get your device work with this plugin, check the "Type generic" of each command of the device in advanced parameters of command. A lightbulb must have a Light button on, a Light button off ans a Light state for example.

### Logging
Complies with Homebridge's native logging & debugging methodology - see https://github.com/nfarina/homebridge/wiki/Basic-Troubleshooting

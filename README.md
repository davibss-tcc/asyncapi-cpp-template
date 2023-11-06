# asyncapi-cpp-template

- [Overview](#overview)
- [Technical requirements](#technical-requirements)
- [Specification requirements](#specification-requirements)
- [Supported protocols](#supported-protocols)
- [How to use the template](#how-to-use-the-template)
  * [CLI](#cli)
- [Template configuration](#template-configuration)
- [Development](#development)
- [Contributors](#contributors)

## Overview

This template generates a C++ application with any of the [supported protocols](#supported-protocols) endpoint, based on [Mosquitto](https://github.com/eclipse/mosquitto).

## Technical requirements

- [Generator](https://github.com/asyncapi/generator/) =^1.10.14
- Generator specific [requirements](https://github.com/asyncapi/generator/#requirements)


## Specification requirements

* You must have at least one server described in your specification.
* It's recommended to have defined `schemas` section in your specification, the messages inside operations must reference these `schemas`.

## Supported protocols

* [MQTT and MQTTS](https://en.wikipedia.org/wiki/MQTT)

## How to use the template

This template must be used with the AsyncAPI Generator. You can find all available options [here](https://github.com/asyncapi/generator/).

> You can find a complete tutorial on AsyncAPI Generator using this template [here](https://www.asyncapi.com/docs/tutorials/streetlights). 

### CLI

```bash
# Install the AsyncAPI Generator
$ npm install -g @asyncapi/generator

# Run generation
# To use the template
$ ag ./specs/edscorbot-async-api.yml https://github.com/davibss-tcc/asyncapi-cpp-template -o output

# OR

# To test your local changes
$ ag ./specs/edscorbot-async-api.yml ./ -o output

##
## Start the server 
##

# Go to the generated server
$ cd output/client

# Build generated application
$ mkdir build
$ cd build
$ cmake ..
$ make .
$ cd ..

# Start `Mosquitto` message broker with this file
$ mosquitto -c mosquitto.conf

##
## Start the client 
##
$ g++ -fdiagnostics-color=always -g ./src/simulated-server.cpp -o ./src/simulated-server -lmosquitto -lpthread ./src/simulated-server

#publish a message
$ mosquitto_pub -h 127.0.0.1 -p 1883 -t "metainfo" -m "{ \"signal\": 1, \"name\": \"bot_0\"}" -q 0
```

## Template configuration

You can configure this template by passing different parameters in the Generator CLI: `-p PARAM1_NAME=PARAM1_VALUE -p PARAM2_NAME=PARAM2_VALUE`

|Name|Description|Required|Default|
|---|---|---|---|
|initializeEnum|Initialize or not initialize Enum with values|false|false|
|protocol|Protocol for the generated client, the supported protocols are: mqtt, secure-mqtt, kafka and ws. The default is mqtt|false|mqtt|
|zip|Boolean value to zip file or not|false|false|
|onlySourceFiles|Boolean value to specify if user wants an entire application or just the source files|false|false|
|choosedServer|Choosed server from AsyncAPI specification. Value is 127.0.0.1 if not passed|false|default|

## Development

The most straightforward command to use this template is:
```bash
$ ag ./specs/edscorbot-async-api.yml https://github.com/davibss-tcc/asyncapi-cpp-template -o output
```

**Setup locally**

```bash
# Run following commands in terminal:
$ git clone https://github.com/davibss-tcc/asyncapi-cpp-template
$ cd asyncapi-cpp-template
$ npm install
$ ag ./specs/edscorbot-async-api.yml https://github.com/davibss-tcc/asyncapi-cpp-template -o output
```

For local development, you need different variations of this command. First of all, you need to know about three important CLI flags:
- `--watch-template` enables a watcher of changes that you make in the template. It regenerates your template whenever it detects a change.
- `--install` enforces reinstallation of the template.

## Contributors
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://github.com/davibss"><img src="https://avatars.githubusercontent.com/u/54844612?v=4" width="100px;" alt="Davi Barbosa"/><br /><sub><b>Davi Barbosa</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="http://github.com/adalbertocajueiro"><img src="https://avatars.githubusercontent.com/u/6329702?v=4" width="100px;" alt="Davi Barbosa"/><br /><sub><b>Adalberto Cajueiro</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
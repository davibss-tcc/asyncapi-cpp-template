import { File, Text } from "@asyncapi/generator-react-sdk"

export default function ReadME({params}) {
    const files = [];
    if (params.onlySourceFiles === "false") {
        files.push(
<File name="README.md">
    <Text>
{`\
# C++ AsyncAPI Client - Skeleton
This is a AsyncAPI Client for C++ that create models and services to handle topics subscriptions and publications.

## Build and run this project (terminal)
\`\`\`sh
mkdir build
cd build
sudo cmake ..
sudo make
\`\`\`

## Build and run this project (VSCode)
### Required plugins
* C/C++ Extension Pack
### Steps
In this root folder:
1. Click on **Configure All Projects**
3. Choose the \`g++\` option
2. Click in the bottom button in VSCode: **Launch the selected target in the terminal window [simulated_server]**

## Using mosquitto.conf
In this generated project you'll see a \`mosquitto.conf\` file. Use this file to initiate your *Mosquitto* message broker.
### Options
1. Copy the \`mosquitto.conf\` file to \`/etc/mosquitto/conf.d\`
\`\`\`sh
cp mosquitto.conf /etc/mosquitto/conf.d
\`\`\`
2. Start \`Mosquitto\` message broker with this file
\`\`\`sh
mosquitto -c mosquitto.conf
\`\`\`

## Changing the hostname
In the \`src/simulated_server.cpp\` file you can change this line to be the host you need.
\`\`\`cpp
#define mqtt_host "127.0.0.1"
\`\`\`
After you change this line you'll have to compile again your code.

## Updating the generated code
If your specification has changed you can generate again the main code using this process:
\`\`\`sh
ag {spec_file_path} https://github.com/davibss-tcc/asyncapi-cpp-template -o ./ --force-write -p {your_params}
\`\`\`
**CAUTION!!** This operation will change almost all files, except by \`src/services/communication-layer-impl.cpp\` and \
\`src/services/topics-impl.cpp\`. If the overwritten changes break this files you'll have to fix by yourself. To overwrite \
this special files you would have to delete them and then generate again.
`}
    </Text>
</File>
        );
    }

    return files;
}
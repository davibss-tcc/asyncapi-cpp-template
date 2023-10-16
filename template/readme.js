import { File, Text } from "@asyncapi/generator-react-sdk"

export default function ReadME({params}) {
    const files = [];
    if (params.onlySourceFiles === "false") {
        files.push(
<File name="README.md">
    <Text>
{`\
# C++ AsyncAPI Client - Skeleton
This is a AsyncAPI Client for C++ that creates models and services to handle topics, subscriptions and publications.

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
3. Choose your underlying compiler (\`g++\`, \`gcc\`, etc.) option
2. Choose the configuration **[simulated_server]** for compiling and run/debug.

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

If your mosquitto is running automatically, replace the step \`2\` above with the command to restart your mosquitto (ex. \`sudo systemctl restart mosquitto.service\`)

Your mosquitto must be running and using two ports: \`1883\` and \`8080\` if they are not in use. Check this using the commands \`sudo systemctl status mosquitto.service\` to see mosquitto has started successfully and \`netstat -vatn\` to see the above ports in use

## Changing the hostname
In the \`src/simulated_server.cpp\` file you can change this line to be the host you need.
\`\`\`cpp
#define mqtt_host "127.0.0.1"
\`\`\`
After you change this line you'll have to compile your code again.

## Updating the generated code
If your specification has changed you can generate again the main code using this process:
\`\`\`sh
ag {spec_file_path} https://github.com/davibss-tcc/asyncapi-cpp-template -o ./ --force-write -p {your_params}
\`\`\`
**CAUTION!!** This operation will change almost all files, except the files below: 
* \`src/services/communication-layer-impl.cpp\` 
* \`src/services/topics-impl.cpp\` 
* \`src/simulated-server-info.cpp\`

If the overwritten changes break these files you'll have to fix them yourself. To overwrite these special files you would have to delete them and then generate them again.

Optionally you can use the service (with a Web interface) to re-generate the code from your AsyncAPI specification. The instructions for running the generator as a service can be found at https://github.com/davibss/asyncapi-client-generator. 
`}
    </Text>
</File>
        );
    }

    return files;
}
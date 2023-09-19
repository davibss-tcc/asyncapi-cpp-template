import { File, Text } from "@asyncapi/generator-react-sdk"

export default function MosquittoBuild() {
    return (
        <File name="mosquitto_build.sh">
            <Text>
{`#!/bin/bash

cd ../
[ ! -d 'mosquitto' ] && git clone https://github.com/eclipse/mosquitto >> script_log.txt
[ ! -d 'json' ] && git clone https://github.com/nlohmann/json/ >> script_log.txt
cd mosquitto >> script_log.txt
rm -rf build >> script_log.txt
mkdir build >> script_log.txt
cd build >> script_log.txt
cmake .. -DWITH_STATIC_LIBRARIES=ON -DWITH_PIC=ON -DWITH_TLS=OFF -DDOCUMENTATION=OFF >> script_log.txt
make -j4 >> script_log.txt

ls -l lib >> script_log.txt
mkdir -p ../../lib >> script_log.txt
cp lib/libmosquitto_static.a ../../lib/libmosquitto_static.a >> script_log.txt`}
            </Text>
        </File>
    )
}
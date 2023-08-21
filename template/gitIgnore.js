import { File, Text } from "@asyncapi/generator-react-sdk"

export default function GitIgnore() {
    return (
        <File name=".gitignore">
            <Text>
{`.vscode/
build/
json/
mosquitto/
lib/
script_log.txt`}
            </Text>
        </File>
    );
}
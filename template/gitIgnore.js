import { File, Text } from "@asyncapi/generator-react-sdk"

export default function GitIgnore({params}) {
    const files = [];
    if (params.onlySourceFiles === "false") {
        files.push(
<File name=".gitignore">
    <Text>
{`\
.vscode/
build/
json/
mosquitto/
lib/
script_log.txt\
`}
    </Text>
</File>
        );
    }
    return files;
}
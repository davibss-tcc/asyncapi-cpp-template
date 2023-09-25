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
`}
    </Text>
</File>
        );
    }

    return files;
}
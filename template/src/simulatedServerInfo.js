import { File, Text } from "@asyncapi/generator-react-sdk"
import { v4 as uuidv4 } from "uuid";
import { fileExists } from "../../util/fileUtil";

export default function SimulatedServerInfo({params}) {
    const files = [];
    const simulatedServerInfoPath = `${params.outputDir}/src/simulated-server-info.cpp`;
    const fileExist = fileExists(simulatedServerInfoPath);
    
    if (!fileExist) {
        files.push(
<File name="simulated-server-info.cpp">
    <Text>
{`\
#include <string.h>

using namespace asyncapi_client;
class simulated_server_info {
    public:
        static std::string client_id;
};
std::string simulated_server_info::client_id = "${uuidv4()}";\
`}
    </Text>
</File>
        );
    }

    return files;
}
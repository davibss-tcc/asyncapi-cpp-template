import TopicsComponent from "../../../components/TopicsComponent";
import TopicsImplComponent from "../../../components/TopicsImplComponent";
import { fileExists } from ".././../../util/fileUtil";

export default function Topics({asyncapi, params}) {
    var generateFiles = [];
    generateFiles.push(TopicsComponent(asyncapi.channels().collections));

    const implementationFilePath = `${params.outputDir}/src/services/topics-impl.cpp`;
    const implementationFileExists = fileExists(implementationFilePath);
    if (!implementationFileExists) {
        generateFiles.push(TopicsImplComponent(asyncapi.channels().collections));
    }

    return generateFiles;
}
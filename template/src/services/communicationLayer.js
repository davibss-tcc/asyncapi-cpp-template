import CommunicationLayerComponent from '../../../components/CommunicationLayerComponent'
import CommunicationLayerImplComponent from '../../../components/CommunicationLayerImplComponent';
import { fileExists } from '../../../util/fileUtil';

export default function CommunicationLayer({asyncapi, params}) {
    const generatedFiles = [];
    generatedFiles.push(CommunicationLayerComponent(asyncapi.channels().collections));

    const implementationFilePath = `${params.outputDir}/src/services/communication-layer-impl.cpp`;
    const implementationFileExists = fileExists(implementationFilePath);
    if (!implementationFileExists) {
        generatedFiles.push(CommunicationLayerImplComponent(asyncapi.channels().collections));
    }

    return generatedFiles;
}
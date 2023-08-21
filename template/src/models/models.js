import { File, Text } from "@asyncapi/generator-react-sdk"
import { CplusplusFileGenerator, FormatHelpers, TS_COMMON_PRESET, ConstrainedEnumModel } from '@asyncapi/modelina';
import EnumComponent from '../../../components/EnumComponent';

/**
 * @typedef TemplateParameters
 * @type {object}
 */

/**
 * Return the correct channel functions for the test client on whether a channel is `pubSub` or `requestReply`
 * @param {{asyncapi: AsyncAPIDocument, params?: TemplateParameters}} _
 */
export default async function Models({asyncapi, params}) {
    const cPPGenerator = new CplusplusFileGenerator({
        namespace: "asyncapi_client"
    });

    const generatedModels = await cPPGenerator.generateCompleteModels(asyncapi, {moduleSystem: 'ESM'});
    const files = [];
    generatedModels.forEach(generatedModel => {
        const modelFileName = `${FormatHelpers.toSnakeCase(generatedModel.modelName)}.hpp`;
        if (generatedModel.model instanceof ConstrainedEnumModel) {
            files.push(<File name={modelFileName}>{EnumComponent(generatedModel.model, params.initializeEnum)}</File>);
        } else {
            files.push(<File name={modelFileName}>{generatedModel.result}</File>);
        }
    });


    return files;
}
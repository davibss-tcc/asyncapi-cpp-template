import { File, Text } from "@asyncapi/generator-react-sdk"
import { CplusplusFileGenerator, FormatHelpers, TS_COMMON_PRESET, ConstrainedEnumModel, ConstrainedReferenceModel, ConstrainedAnyModel, ConstrainedArrayModel, ConstrainedUnionModel } from '@asyncapi/modelina';
import EnumComponent from '../../../components/EnumComponent';
import { removeOptional } from "../../../util/stringUtil";
import ModelPreset from "../../../components/model/ModelPreset";

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
        namespace: "asyncapi_client",
        presets: [ModelPreset()],
        processorOptions: {
            interpreter: {
                ignoreAdditionalProperties: true
            }
        },
        typeMapping: {
            Object({
                constrainedModel,
                options,
                partOfProperty,
                dependencyManager
              }) {
                const type = `${options.namespace}::${constrainedModel.name}`;
                return type;
              },
              Reference({
                constrainedModel,
                options,
                partOfProperty,
                dependencyManager
              }) {
                const type = `${options.namespace}::${constrainedModel.name}`;
                return type;
              },
              Any({ partOfProperty, dependencyManager }) {
                dependencyManager.addDependency('#include <any>');
                const type = 'std::any';
                return type;
              },
              Float({ partOfProperty, dependencyManager }) {
                const type = 'double';
                return type;
              },
              Integer({ partOfProperty, dependencyManager }) {
                const type = 'int';
                return type;
              },
              String({ dependencyManager, partOfProperty }) {
                dependencyManager.addDependency('#include <string>');
                const type = 'std::string';
                return type;
              },
              Boolean({ partOfProperty, dependencyManager }) {
                const type = 'bool';
                return type;
              },
              Tuple({ constrainedModel, dependencyManager, partOfProperty }) {
                const types = constrainedModel.tuple.map((model) => {
                  return model.value.type;
                });
                dependencyManager.addDependency('#include <tuple>');
                const type = `std::tuple<${types.join(', ')}>`;
                return type;
              },
              Array({ constrainedModel, dependencyManager, partOfProperty }) {
                dependencyManager.addDependency('#include <vector>');
                const type = `std::vector<${constrainedModel.valueModel.type}>`;
                return type;
              },
              Enum({
                constrainedModel,
                options,
                partOfProperty,
                dependencyManager
              }) {
                //Returning name here because all enum models have been split out
                const type = `${options.namespace}::${constrainedModel.name}`;
                return type;
              },
              Union({ constrainedModel, dependencyManager, partOfProperty }) {
                const types = constrainedModel.union.map((model) => {
                  return model.type;
                });
                dependencyManager.addDependency('#include <variant>');
                const type = `std::variant<${types.join(', ')}>`;
                return type;
              },
              Dictionary({ constrainedModel, dependencyManager, partOfProperty }) {
                dependencyManager.addDependency('#include <map>');
                const type = `std::map<${constrainedModel.key.type}, ${constrainedModel.value.type}>`;
                return type;
              }
        }
    });

    const generatedModels = await cPPGenerator.generateCompleteModels(
        asyncapi
    );
    const files = [];
    generatedModels.forEach(generatedModel => {
        const modelFileName = `${FormatHelpers.toSnakeCase(generatedModel.modelName)}.hpp`;
        if (generatedModel.model instanceof ConstrainedEnumModel) {
            files.push(<File name={modelFileName}>{EnumComponent(generatedModel.model, params.initializeEnum)}</File>);
        } else {
            files.push(<File name={modelFileName}>
{`
#ifndef ${FormatHelpers.toSnakeCase(generatedModel.modelName).toUpperCase()}_H
#define ${FormatHelpers.toSnakeCase(generatedModel.modelName).toUpperCase()}_H
${generatedModel.result}
#endif
`}
</File>);
        }
    });


    return files;
}
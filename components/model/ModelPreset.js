import { ConstrainedAnyModel, ConstrainedArrayModel, ConstrainedUnionModel, CplusplusPreset } from "@asyncapi/modelina";
import { removeOptional, toSnakeCase } from "../../util/stringUtil";

/**
 * 
 * @returns {CplusplusPreset}
 */
export default function ModelPreset(){
    return { 
        class: {
            self({ renderer, content, model }) {
                renderer.dependencyManager.addDependency(`#include <nlohmann/json.hpp>`);
                renderer.dependencyManager.addDependency(`using json = nlohmann::json;`);
                const paramsToMacro = [];
                paramsToMacro.push(model.name);
                Object.entries(model.properties).map(entry => {
                    paramsToMacro.push(entry[0]);
                });
                return `
                    ${content}
                `;
            },
            additionalContent({ content, model }) {
                const paramsToMacro = [];
                paramsToMacro.push(model.name);
                Object.entries(model.properties).map(entry => {
                    paramsToMacro.push(entry[0]);
                });
                return `${content}
                static ${model.name} from_json_string(std::string json_string)
                {
                    json json_obj = json::parse(json_string);

                    ${model.name} result = ${model.name}();
                    ${Object.entries(model.properties)
                        .filter(([k,prop]) => k !== 'additional_properties')
                        .filter(([k,prop]) => {
                            return prop.property !== undefined;
                        })
                        .map(([k,prop]) => {
                            let castType = removeOptional(prop.property.type);                                    
                            return `if (json_obj.contains("${prop.propertyName}")) { json_obj.at("${prop.propertyName}").get_to(result.${prop.propertyName}); }`;
                        }).join("\n")}
                    return result;
                }

                static std::string to_json_string(${model.name} ${model.name})
                {
                    json json_obj = ${model.name};
                    return json_obj.dump();
                }

                NLOHMANN_DEFINE_TYPE_INTRUSIVE_WITH_DEFAULT(${paramsToMacro.join(", ")})
                `
            },
            property({ property, content, model }) {
                if (property.property instanceof ConstrainedArrayModel) {
                    let arrayType = "";
                    if (property.property.valueModel instanceof ConstrainedUnionModel) {
                        const constrainedRefModel = property.property.valueModel.union
                            .filter(constrained => !(constrained instanceof ConstrainedAnyModel))[0];
                        arrayType = constrainedRefModel.type;
                        arrayType = removeOptional(arrayType);
                        property.property.type = `std::vector<${arrayType}>`;
                    }
                    return `std::vector<${arrayType}> ${property.propertyName};`
                }
                return content;
            },
            getter(args) {
                console.log(args);
            }
        }
    };
}
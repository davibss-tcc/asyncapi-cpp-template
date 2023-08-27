import { ConstrainedAnyModel, ConstrainedArrayModel, ConstrainedUnionModel, CplusplusPreset } from "@asyncapi/modelina";
import { removeOptional } from "../../util/stringUtil";

/**
 * 
 * @returns {CplusplusPreset}
 */
export default function ModelPreset(){
    return { 
        class: {
            self({ renderer, content, model, options, inputModel }) {
                renderer.dependencyManager.addDependency(`#include <nlohmann/json.hpp>`);
                renderer.dependencyManager.addDependency(`using json = nlohmann::json;`);
                return `
                void from_json(const json& j, ${model.type}& ${model.name}) {
                    ${Object.entries(model.properties)
                        .filter(entry => entry[0] !== "additional_properties")
                        .map(entry => {
                            let castType = removeOptional(entry[1].property.type);                                    
                            return `${model.name}.${entry[0]} = j.at("${entry[0]}").get<${castType}>();`
                        }).join("\n")}
                }
                ${content}`;
            },
            additionalContent({content,model}) {
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
                            return `result.${prop.propertyName} = json_obj['${prop.propertyName}'].get<${castType}>();`
                        }).join("\n")}
                    return result;
                }`
            },
            property({model, property, content}) {
                if (property.property instanceof ConstrainedArrayModel) {
                    let arrayType = "";
                    if (property.property.valueModel instanceof ConstrainedUnionModel) {
                        const constrainedRefModel = property.property.valueModel.union
                            .filter(constrained => !(constrained instanceof ConstrainedAnyModel))[0];
                        arrayType = constrainedRefModel.type;
                        arrayType = removeOptional(arrayType);
                        property.property.type = `std::optional<std::vector<${arrayType}>>`;
                    }
                    return `std::optional<std::vector<${arrayType}>> ${property.propertyName};`
                }
                return content;
            }
        }
    };
}
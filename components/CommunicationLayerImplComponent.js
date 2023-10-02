import { File, Text } from "@asyncapi/generator-react-sdk"
import { Channel } from "@asyncapi/parser"
import { sanitizeString } from "../util/sanitizeString";
import { extractSubscribeSchemaFromChannel } from "../util/asyncApiUtil";

/**
 * 
 * @param {Channel[]} channels 
 * @returns 
 */
export default function CommunicationLayerImplComponent(channels) {

    let topicConstants = channels.map(channel => {
        const variableName = `${sanitizeString(channel.id()).toUpperCase()}_TOPIC`;
        const model_name = extractSubscribeSchemaFromChannel(channel, true);
        return [
            variableName , 
            sanitizeString(channel.id()).toLowerCase(),
            model_name
        ]
    });

    return (
        <File name="communication-layer-impl.cpp">
            <Text>
{`
#include "communication-layer.cpp"
#include "topics-impl.cpp"
#include "../simulated-server-info.cpp"
${topicConstants.map(topicConstant => {
    return `#include "../models/${topicConstant[2]}.hpp"`
}).join("\n")}
using namespace asyncapi_client;

class CommunicationLayerImpl : public CommunicationLayer {
public:
    ${topicConstants.map(topicConstant => { return `
        void handle_${topicConstant[1]}_topic(const struct mosquitto_message* message)
        {
            // TODO implement your business code
            if ((char *)message->payload != NULL)    
            {
                try
                {
                  //TODO implement your business code
                  ${topicConstant[2]} obj = ${topicConstant[2]}::from_json_string((char *)message->payload);
                  std::string unstructured = ${topicConstant[2]}::to_json_string(obj);
                  std::cout << "[Topic: ${topicConstant[1]}] => Handled message: " << unstructured << std::endl;
                  if (obj.publisher_id == "" || obj.publisher_id != simulated_server_info::client_id) {
                    obj.publisher_id = simulated_server_info::client_id;
                    std::string unstructured_publish_message = ${topicConstant[2]}::to_json_string(obj);
                    publish_message(topicsImpl.${topicConstant[0]}.c_str(), unstructured_publish_message.c_str());
                  }
                }
                catch (std::exception& e)
                {
                  std::cout << "Unable to build CommandObject from message (${topicConstant[1]}_topic): " <<  (char *)message->payload << std::endl;
                }
              }
            else
            {
                std::cout << "message received on ${topicConstant[1]}_topic has no payload" << std::endl;
            }


        }
    `}).join("\n")}
};

CommunicationLayerImpl impl;

void message_callback(struct mosquitto* mosq, void* obj, const struct mosquitto_message* message)
{
    ${topicConstants.map(topicConstant => { return `
        if (std::strcmp(message->topic, topicsImpl.${topicConstant[0]}.c_str()) == 0) {
            impl.handle_${topicConstant[1]}_topic(message);
        }   
    `}).join("\n")}
}
`}
            </Text>
        </File>
    )
}
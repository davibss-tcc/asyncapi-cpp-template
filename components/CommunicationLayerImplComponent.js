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
                  ${topicConstant[2]} obj = ${topicConstant[2]}::from_json_string((char *)message->payload);
                  //TODO implement your business code
                  std::cout << "handle_${topicConstant[1]}_topic" << std::endl;
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
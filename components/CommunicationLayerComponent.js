import { File, Text } from "@asyncapi/generator-react-sdk";
import { Channel } from "@asyncapi/parser";
import { sanitizeString } from "../util/sanitizeString";

/**
 * 
 * @param {Channel[]} channels 
 * @returns 
 */
export default function CommunicationLayerComponent(channels) {

    const channelsNames = channels.map(channel => sanitizeString(channel.id()).toLowerCase())

    return (
        <File name="communication-layer.cpp">
            <Text>
{`
#include "topics.cpp"
#include <cstring>

int publish_message(std::string topic, const char *buf)
{
  char *payload = (char *)buf;
  int rc = mosquitto_publish(mosq, NULL, topic.c_str(), strlen(payload), payload, 1, false);
  return rc;

}

class CommunicationLayer
{
public:
  ${channelsNames.map(channelName => {
    return `virtual void handle_${channelName}_topic(const struct mosquitto_message *message) = 0;`
  }).join("\n")}
};
`}   
            </Text>
        </File>
    );
}
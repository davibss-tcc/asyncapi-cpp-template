import { Channel } from "@asyncapi/parser";
import { File, Text } from "@asyncapi/generator-react-sdk";
import { sanitizeString } from "../util/sanitizeString";

/**
 * 
 * @param {Channel[]} channels 
 * @returns 
 */
export default function TopicsComponent(channels) {

    let topicConstants = channels.map(channel => {
        const variableName = `${sanitizeString(channel.id()).toUpperCase()}_TOPIC`
        return [variableName , channel.id()]
    });

    return (
        <File name="topics.cpp">
            <Text>
{`
#include "mosquitto.h"
#include <iostream>

struct mosquitto *mosq;

${topicConstants.map(topicConstant => {
    return `std::string ${topicConstant[0]} = "${topicConstant[1]}";`
}).join("\n")}

void subscribe_all_topics()
{
  ${topicConstants.map(topicConstant => {
    return `mosquitto_subscribe(mosq,NULL,${topicConstant[0]}.c_str(),0);`
  }).join("\n")}

  std::cout << "Subscribed on topics: " << std::endl
    ${topicConstants.map(topicConstant => {
        return `<< "  " + ${topicConstant[0]}<< std::endl`
    }).join("\n")}
  ;
}
`}
            </Text>
        </File>
    );
}
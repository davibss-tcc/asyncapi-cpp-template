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
#pragma once
#include "mosquitto.h"
#include <iostream>

struct mosquitto *mosq;

class TopicsLayer {
public:
  ${topicConstants.map(topicConstant => {
    return `std::string ${topicConstant[0]} = "${topicConstant[1]}";`
  }).join("\n")}

    virtual void subscribe_all_topics() = 0;
};
`}
            </Text>
        </File>
    );
}
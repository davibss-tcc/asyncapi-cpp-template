import { Channel } from '@asyncapi/parser';
import { toSnakeCase } from '../util/stringUtil';

/**
 * 
 * @param {Channel} channel 
 * @param {boolean} snakeCase 
 * @returns string
 */
export function extractSubscribeSchemaFromChannel(channel, snakeCase = false) {
    let schema = undefined;

    let operations = channel.operations().collections;
    let subscribeOperation = operations.filter(op => op.action() === 'subscribe')[0];
    let messages = subscribeOperation.messages().collections;
    let message = messages[0];
    schema = message.payload().id();

    if (snakeCase) {
        schema = toSnakeCase(schema);
    }

    return schema;
}

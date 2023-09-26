import { Channel, Server } from '@asyncapi/parser';
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

/**
 * @typedef TemplateParameters
 * @type {object}
 */
/**
 * 
 * @param {Server[]} servers 
 * @param {TemplateParameters} params 
 */
export function getChoosedServerHost(servers, params) {
    var result = '127.0.0.1';
    var choosedServer = params.choosedServer;
    if (choosedServer !== 'default') {
        if (servers.length > 0) {
            if (servers.find(server => server.id() === choosedServer)) {
                result = servers.filter(server => server.id() === choosedServer)[0].url();
            }
        }
    }
    return result;
}

import { AsyncAPIDocument } from '@asyncapi/parser';
import GitIgnore from './gitIgnore';
import CMakeList from './cmakeList';
import MosquittoBuild from './mosquittoBuild';
import Src from './src/src';
import MosquittoConf from './mosquitto.conf';

/**
 * @typedef TemplateParameters
 * @type {object}
 */

/**
 * Return the correct channel functions for the test client on whether a channel is `pubSub` or `requestReply`
 * @param {{asyncapi: AsyncAPIDocument, params?: TemplateParameters}} _
 */
export default function ({ asyncapi, params }) {
  return [
    <GitIgnore />,
    <CMakeList />,
    <MosquittoBuild />,
    <MosquittoConf />,
    <Src asyncapi={asyncapi} params={params} />
  ];
}
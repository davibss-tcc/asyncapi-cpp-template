import { AsyncAPIDocument } from '@asyncapi/parser';
import Models from './models/models';
import Topics from './services/topics';
import CommunicationLayer from './services/communicationLayer';

/**
 * @typedef TemplateParameters
 * @type {object}
 */

/**
 * Return the correct channel functions for the test client on whether a channel is `pubSub` or `requestReply`
 * @param {{asyncapi: AsyncAPIDocument, params?: TemplateParameters}} _
 */
export default function Src({ asyncapi, params }) {
  return [
    <Models />,
    <Topics />,
    <CommunicationLayer />
  ];
}
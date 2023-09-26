import { File, Text } from "@asyncapi/generator-react-sdk";
import SimulatedServerComponent from "../../components/SimulatedServerComponent";
import { AsyncAPIDocument } from "@asyncapi/parser";

/**
 * 
 * @param {{asyncapi: AsyncAPIDocument}} _ 
 * @returns 
 */
export default function SimulatedServer({asyncapi, params}) {

    const servers = asyncapi.servers().collections;

    return SimulatedServerComponent(servers, params);
}
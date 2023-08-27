import CommunicationLayerImplComponent from "../../../components/CommunicationLayerImplComponent";

export default function CommunicationLayerImpl({asyncapi}) {
    return (CommunicationLayerImplComponent(asyncapi.channels().collections));
}
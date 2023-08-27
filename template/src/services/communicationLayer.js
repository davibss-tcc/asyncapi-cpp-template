import CommunicationLayerComponent from '../../../components/CommunicationLayerComponent'

export default function CommunicationLayer({asyncapi}) {
    return CommunicationLayerComponent(asyncapi.channels().collections);
}
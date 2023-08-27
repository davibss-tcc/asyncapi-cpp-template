import TopicsComponent from "../../../components/TopicsComponent";

export default function Topics({asyncapi}) {
    return TopicsComponent(asyncapi.channels().collections);
}
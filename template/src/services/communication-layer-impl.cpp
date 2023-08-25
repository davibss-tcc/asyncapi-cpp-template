#include "communication-layer.cpp"

class CommunicationLayerImpl: public CommunicationLayer
{
public:
  void handle_metainfo_topic(const struct mosquitto_message *message)
  {
    //TODO implement your business code
    std::cout << "handle_metainfo_topic" << std::endl;
  }
  void handle_robot_name_commands_topic(const struct mosquitto_message *message)
  {
    //TODO implement your business code
    std::cout << "handle_robot_name_commands_topic" << std::endl;
  }
  void handle_robot_name_moved_topic(const struct mosquitto_message *message)
  {
    //TODO implement your business code
    std::cout << "handle_robot_name_moved_topic" << std::endl;
  }
};

CommunicationLayerImpl impl;

void message_callback(struct mosquitto *mosq, void *obj, const struct mosquitto_message *message)
{
  if (std::strcmp(message->topic,METAINFO_TOPIC.c_str()) == 0)
  {
    impl.handle_metainfo_topic(message);
  }
  else if (std::strcmp(message->topic,ROBOT_NAME_COMMANDS_TOPIC.c_str()) == 0)
  {
    impl.handle_robot_name_commands_topic(message);
  }
  else if (std::strcmp(message->topic,ROBOT_NAME_MOVED_TOPIC.c_str()) == 0)
  {
    impl.handle_robot_name_moved_topic(message);
  }
}
const ContainerTypes = {
  Bot: Symbol('Bot'),
  Client: Symbol('Client'),
  Token: Symbol('Token'),
  BotConfig: Symbol('BotConfig'),
  CommandHandler: Symbol('CommandHandler'),
  MessageResponder: Symbol('MessageResponder'),
  ReactionHandler: Symbol('ReactionHandler'),
  DBConnection: Symbol('DBConnection'),
};

export default ContainerTypes;

import container from '../inversify.config';
import CommandHandler from '../services/command-handler';
import ContainerTypes from '../types/dependencies';

const commandHandler = container.get<CommandHandler>(ContainerTypes.CommandHandler);

export default function Command(Target: any) {
  const TargetInstance = new Target();

  commandHandler.registerCommand(TargetInstance);
}

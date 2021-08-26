import container from '../inversify.config';
import ReactionHandler from '../services/reaction-handler';
import ContainerTypes from '../types/dependencies';

const reactionHandler = container.get<ReactionHandler>(ContainerTypes.ReactionHandler);

export default function OnReaction() {
  return (Target: any) => {
    const TargetInstance = new Target();

    reactionHandler.registerReactionHook(TargetInstance);
  };
}

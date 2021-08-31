import './lib/config/env';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import LoadBot from './loaders/bot';
import './loaders/commands';
import './loaders/reactions';

dayjs.extend(relativeTime);

LoadBot();

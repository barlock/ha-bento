import { registerCustomCard } from '../../util/register-custom-card.tsx';
import { RoomCard } from './room-card.tsx';
import { RoomCardEditor } from './room-card-editor.tsx';
import { getStubConfig } from './room-card-config.ts';

registerCustomCard('bento-room-card', {
  card: RoomCard,
  editor: RoomCardEditor,
  getStubConfig: getStubConfig,
  getLayoutOptions: () => ({
    grid_columns: 2,
    grid_min_columns: 2,
  }),
  name: 'Bento Room Card',
  description: 'Room card',
});

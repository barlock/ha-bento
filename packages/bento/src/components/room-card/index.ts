import { registerCustomCard } from '../../util/register-custom-card.tsx';
import { RoomCard } from './room-card.tsx';
import { RoomCardEditor } from './room-card-editor.tsx';

registerCustomCard('bento-room-card', {
  card: RoomCard,
  editor: RoomCardEditor,
  name: 'Bento Room Card',
  description: 'Room card',
});

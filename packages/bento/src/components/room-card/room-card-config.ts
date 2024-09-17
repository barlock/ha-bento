import { InferType, object, string, boolean } from 'yup';
import { HomeAssistant } from 'custom-card-helpers';

const roomCardEntitySchema= object({
  enabled: boolean().required(),
  entity: string().optional(),
  icon: string().optional(),
  state_color: string().optional(),
})

export const roomCardConfigSchema = object({
  name: string().optional(),
  icon: string().optional(),
  state_color: string().optional(),
  entity: string().required(),
  entity1: roomCardEntitySchema.optional(),
  entity2: roomCardEntitySchema.optional(),
  entity3: roomCardEntitySchema.optional(),
  entity4: roomCardEntitySchema.optional(),
})

export type RoomCardSubEntity = InferType<typeof roomCardEntitySchema>
export type RoomCardConfig = InferType<typeof roomCardConfigSchema>;

export const getStubConfig = (hass: HomeAssistant): RoomCardConfig => {
  const entities = Object.keys(hass.states);

  return {
    entity: entities[0],
    entity1: { enabled: true, entity: entities[1], state_color: 'primary' },
    entity2: {enabled: false},
    entity3: {enabled: false},
    entity4: {enabled: false},
  };
}
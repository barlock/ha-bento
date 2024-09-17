import { HaFormSchema } from '../../ha-types/ha-form.ts';
import { HaForm } from '../../editor/ha-form.tsx';
import { APPEARANCE_FORM_SCHEMA } from '../../editor/appearance-config.ts';
import { computeActionsFormSchema } from '../../editor/actions-config.ts';

const SCHEMA: HaFormSchema[] = [
  { name: 'entity', selector: { entity: {} } },
  { name: 'name', selector: { text: {} } },
  {
    type: 'grid',
    name: '',
    schema: [
      {
        name: 'icon',
        selector: { icon: {} },
        context: { icon_entity: 'entity' },
      },
      { name: 'icon_color', selector: { color_rgb: {} } },
    ],
  },

  { name: 'entity1Id', selector: { entity: {} } },
  { name: 'entity2Id', selector: { entity: {} } },
  { name: 'entity3Id', selector: { entity: {} } },
  { name: 'entity4Id', selector: { entity: {} } },
  ...APPEARANCE_FORM_SCHEMA,
  ...computeActionsFormSchema(),
];

export const RoomCardEditor = () => {
  return <HaForm schema={SCHEMA} />;
};

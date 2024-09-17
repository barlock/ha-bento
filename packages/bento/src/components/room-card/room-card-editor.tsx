import { HaFormSchema } from '../../ha-types/ha-form.ts';
import { HaForm } from '../../editor/ha-form.tsx';
import { computeActionsFormSchema } from '../../editor/actions-config.ts';

type EntityOpts = {
  name: string;
  title: string;
  expanded?: boolean;
}

const entitySchema = ({ name, title, expanded = false }: EntityOpts): HaFormSchema => ({
  type: 'expandable',
  name,
  title,
  expanded,
  schema: [
    { name: 'enabled', selector: { boolean: {}}},
    { name: 'entity', selector: { entity: {} } },
    {
      type: 'grid',
      name: 'Icon',
      schema: [
        {
          name: 'icon',
          selector: { icon: {} },
          context: { icon_entity: 'entity' },
        },
        { name: 'state_color', selector: { ui_color: {} } },
      ],
    },
    ...computeActionsFormSchema(),
  ],
});

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
      { name: 'state_color', selector: { ui_color: {} } },
    ],
  },

  ...computeActionsFormSchema(),
  entitySchema({ name: 'entity1', title:'Entity 1', expanded: true }),
  entitySchema({ name: 'entity2', title:'Entity 2' }),
  entitySchema({ name: 'entity3', title:'Entity 3' }),
  entitySchema({ name: 'entity4', title:'Entity 4' }),
  // ...APPEARANCE_FORM_SCHEMA,
];

export const RoomCardEditor = () => {
  return <HaForm schema={SCHEMA} />
};

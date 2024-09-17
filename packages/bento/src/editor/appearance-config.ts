import { HaFormSchema } from '../ha-types/ha-form';

export const APPEARANCE_FORM_SCHEMA: HaFormSchema[] = [
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'layout', selector: { mush_layout: {} } },
      { name: 'fill_container', selector: { boolean: {} } },
    ],
  },
  {
    type: 'grid',
    name: '',
    schema: [
      { name: 'primary_info', selector: { mush_info: {} } },
      { name: 'secondary_info', selector: { mush_info: {} } },
      { name: 'icon_type', selector: { mush_icon_type: {} } },
    ],
  },
];

import { HaFormDataContainer, HaFormSchema } from '../ha-types/ha-form';
import { useConfig, useFireEvent, useHass } from '../state/hooks';

export type HaFormProps = {
  schema: HaFormSchema | HaFormSchema[];
};

export const HaForm = ({ schema }: HaFormProps) => {
  const hass = useHass();
  const config = useConfig<HaFormDataContainer>();
  const fireEvent = useFireEvent();
  const handleValueChanged = (event: CustomEvent) => {
    fireEvent('config-changed', { config: event.detail.value });
  };

  const handleComputeLabel = (schema: HaFormSchema) => {
    const generic = hass.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`,
    );

    return generic || schema.name;
  };
  return (
    <ha-form
      hass={hass}
      data={config}
      schema={schema}
      computeLabel={handleComputeLabel}
      onvalue-changed={handleValueChanged}
    />
  );
};

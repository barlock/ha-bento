import { HassEntity } from 'home-assistant-js-websocket';
import { useHass } from '../state/hooks.tsx';

type HaStateIconProps = {
  entity?: HassEntity;
  icon?: string;
  size?: string;
};

export const HaStateIcon = ({ entity, icon, size }: HaStateIconProps) => {
  const hass = useHass();
  const stateIcon = icon ?? entity?.attributes.icon;
  console.log({ entity });
  return (
    <ha-state-icon
      hass={hass}
      stateObj={entity}
      stateValue={entity?.state}
      icon={stateIcon}
      style={{
        '--ha-icon-display': 'inline-block',
        '--mdc-icon-size': size,
        '--iron-icon-width': size,
        '--iron-icon-height': size,
      }}
    />
  );
};

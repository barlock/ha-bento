import { useConfig, useEntities, useHass } from '../../state/hooks';
import { Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sx } from '../styled';

const Root = styled('div')({
  position: 'relative',
  display: 'flex',
});

const RoomButton = styled(Button)(
  sx({
    minHeight: 200,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'start',
    borderRadius: 4,
  }),
);

const EntityIcon = styled('div')({
  aspectRatio: 1,
  background: 'var(--blue-color)',
  borderRadius: '50%',
  maxHeight: '85%',
  maxWidth: '75%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  transform: 'translate(-12%, 12%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RoomButtonGroup = styled('div')({
  position: 'absolute',
  top: '16px',
  bottom: '16px',
  right: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

type RoomCardConfig = {
  icon: string;
  icon_color: string;
  entity: string;
  entity1Id: string;
  entity2Id: string;
  entity3Id: string;
  entity4Id: string;
};

export const RoomCard = () => {
  const {
    icon = '',
    icon_color,
    entity: entityId,
    entity1Id,
    entity2Id,
    entity3Id,
    entity4Id,
  } = useConfig<RoomCardConfig>();
  const hass = useHass();
  const entities = useEntities([
    entityId,
    entity1Id,
    entity2Id,
    entity3Id,
    entity4Id,
  ]);

  const entity = entities[entityId];
  const haIcon = icon || entity?.attributes.icon;

  console.log({ entities, haIcon });
  return (
    <Root>
      <RoomButton variant={'contained'} sx={{}}>
        {entity?.attributes.friendly_name}

        <EntityIcon>
          <ha-state-icon
            hass={hass}
            stateValue={entity?.state}
            icon={haIcon}
            style={{
              display: 'inline-block',
              '--mdc-icon-size': '45%',
              '--iron-icon-width': '45%',
              '--iron-icon-height': '45%',
            }}
          />
        </EntityIcon>
      </RoomButton>
      <RoomButtonGroup>
        <IconButton sx={{ backgroundColor: 'var(--blue-color)' }}>
          <ha-icon icon={entities[entity1Id]?.attributes.icon} />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'var(--blue-color)' }}>
          <ha-icon icon={entities[entity2Id]?.attributes.icon} />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'var(--blue-color)' }}>
          <ha-icon icon={entities[entity3Id]?.attributes.icon} />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'var(--blue-color)' }}>
          <ha-icon icon={entities[entity4Id]?.attributes.icon} />
        </IconButton>
      </RoomButtonGroup>
    </Root>
  );
};

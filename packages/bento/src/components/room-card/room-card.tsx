import { useConfig, useEntities } from '../../state/hooks';
import { Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { sx } from '../styled';
import { HaStateIcon } from '../../ha-types/ha-state-icon.tsx';
import { RoomCardConfig, RoomCardSubEntity } from './room-card-config.ts';

const Root = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'end',
  // TODO: If you adjust column width the card breaks the layout, it should
  // switch to taking the full size of the card

  // height: '100%',
  // width: '100%',
   aspectRatio: 1,
});

const Title = styled('div')({
  fontSize: 18,
  textTransform: 'none'
})

const RoomButton = styled(Button)(
  sx({
    background: 'var(--ha-card-background,var(--card-background-color,#fff))',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 4,
    alignItems: 'start',
    justifyContent: 'start',

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
);

const EntityIcon = styled('div')({
  aspectRatio: 1,
  borderRadius: '50%',
  maxHeight: '85%',
  maxWidth: '75%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  transform: 'translate(-15%, 15%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RoomButtonGroup = styled('div')({
  width: '33%',
});

const RoomButtonGroupGrid = styled('div')({
  // display: 'grid',
  // gridAutoFlow: 'column',
  // gridTemplateRows: 'repeat(4, minmax(0, 1fr))',

  // TODO: Make the icons smaller as more show up?!?
  display: 'flex',
  flexDirection: 'column',
  // width: '25%',
  // height: '100%',
  justifyContent: 'end',
});

const SubEntityButton = styled(IconButton)({
  minHeight: 36,
  // maxHeight: '25%',
  height: '80%',
  aspectRatio: 1,
});

const SubEntityRoot = styled('div')({
  height: '100%',
  // width: '100%',
  aspectRatio: 1,
  display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
});

export const RoomCard = () => {
  const config = useConfig<RoomCardConfig>();
  console.log(config)
  const {
    name,
    icon = '',
    state_color,
    entity: entityId,
    entity1,
    entity2,
    entity3,
    entity4,
  } = config;

  const subEntities =  [
    entity1,
    entity2,
    entity3,
    entity4,
  ].filter((sub): sub is RoomCardSubEntity   => Boolean(sub && sub.entity && sub.enabled));

  console.log({subEntities})

  const entities = useEntities([
    entityId,
    ...subEntities
      .map(({entity}) => entity)
      .filter((entity): entity is string => Boolean(entity)),
  ]);

  const entity = entities[entityId];
  const entityIsOn = entity.state === 'on';
  const iconColor = entityIsOn ? `var(--${state_color}-color)`: 'var(--state-inactive-color)';
  const haIcon = icon || entity?.attributes.icon;
  console.log({entities, entity, haIcon})

  return (
    <Root>
      <RoomButton variant={'contained'}>
        <Title>
          {name ?? entity?.attributes.friendly_name}

        </Title>
        <EntityIcon sx={{ backgroundColor: iconColor }}>
          <HaStateIcon entity={entity} icon={haIcon} size={'45%'} />
        </EntityIcon>
      </RoomButton>
      <RoomButtonGroup>
        <RoomButtonGroupGrid>
          {subEntities.map(subEntity => {
            const sub = entities[subEntity.entity];
            const subIsOn = sub.state === 'on';
            const subIconColor = subIsOn ? `var(--${subEntity.state_color ?? state_color}-color)`: 'var(--state-inactive-color)';
            return (
              <SubEntityRoot key={subEntity.entity}>
                <SubEntityButton sx={{
                  background: subIconColor,
                }}>
                  <HaStateIcon size={'100%'} entity={entities[subEntity.entity]} />
                </SubEntityButton>
              </SubEntityRoot>
            )
          })}
        </RoomButtonGroupGrid>
      </RoomButtonGroup>
    </Root>
  );
};

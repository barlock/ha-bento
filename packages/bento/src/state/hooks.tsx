import { StoreContext } from './store';
import { useCallback, useContext, useMemo } from 'react';

export const useStore = () => useContext(StoreContext);

export const useHass = () => {
  const store = useStore();
  return store(({ hass }) => hass);
};

export function useConfig<T>() {
  const store = useStore();
  return store(({ config }) => config as T);
}

export const useFireEvent = () => {
  const store = useStore();
  return store(({ fireEvent }) => fireEvent);
};

export const useUser = () => {
  const store = useStore();
  const user = store((state) => state.hass?.user);
  const entity = store(
    useCallback(
      ({ hass }) =>
        user
          ? Object.values(hass?.states).find(
              ({ attributes }) => attributes?.user_id === user.id,
            )
          : undefined,
      [user],
    ),
  );

  return {
    ...user,
    entity,
  };
};

export const useEntity = (entityId: string) => {
  const store = useStore();
  return store(useCallback(({ hass }) => hass?.states[entityId], [entityId]));
};

export const useEntities = (entityIds: string[]) => {
  const hass = useHass();

  return useMemo(
    () => Object.fromEntries(entityIds.map((id) => [id, hass?.states[id]])),
    [hass, entityIds],
  );
};

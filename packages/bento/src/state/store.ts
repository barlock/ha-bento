import { createContext } from 'react';
import { create } from 'zustand';
import { HomeAssistant } from 'custom-card-helpers';

export interface Store {
  hass: HomeAssistant;
  config: any;
  fireEvent: (name: string, details: any) => void;
}

export const createStore = () => create<Store>(() => ({}));
export const StoreContext = createContext(createStore());

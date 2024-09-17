import { ReactHassElement } from './react-hass-element';
import { ComponentType } from 'react';
import { HomeAssistant } from 'custom-card-helpers';

export type RegisterCardOptions = {
  name: string;
  description: string;
  card: ComponentType;
  editor: ComponentType;
  getStubConfig: (hass: HomeAssistant) => any,
  getLayoutOptions?: () => {
    grid_rows?: number,
    grid_min_rows?: number,
    grid_max_rows?: number,
    grid_columns?: number,
    grid_min_columns?: number,
    grid_max_columns?: number,
  },
};

export const registerCustomCard = (
  type: string,
  { name, description, card: Card, editor: Editor, getStubConfig, getLayoutOptions }: RegisterCardOptions,
) => {
  const editorType = `${type}-editor`;

  class ReactCard extends ReactHassElement {
    constructor() {
      super(Card);
    }

    static getStubConfig(hass: HomeAssistant) {
      return getStubConfig(hass)
    }

    getLayoutOptions() {
      return getLayoutOptions ? getLayoutOptions() : {};
    }

    static getConfigElement() {
      return document.createElement(editorType);
    }
  }

  class EditorCard extends ReactHassElement {
    constructor() {
      super(Editor);
    }
  }

  customElements.define(type, ReactCard);
  customElements.define(editorType, EditorCard);

  window.customCards = window.customCards ?? [];
  window.customCards.push({
    type,
    name,
    description,
    preview: true,
  });

  return ReactCard;
};

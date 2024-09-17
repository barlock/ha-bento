import { ReactHassElement } from './react-hass-element';
import { ComponentType } from 'react';

export type RegisterCardOptions = {
  name: string;
  description: string;
  card: ComponentType;
  editor: ComponentType;
};

export const registerCustomCard = (
  type: string,
  { name, description, card: Card, editor: Editor }: RegisterCardOptions,
) => {
  const editorType = `${type}-editor`;

  class ReactCard extends ReactHassElement {
    constructor() {
      super(Card);
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

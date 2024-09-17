import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { EntitySelector, Selector } from './ha-selector.ts';

declare global {
  namespace JSX {
    type HtmlAttributes = React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;

    interface IntrinsicElements {
      'ha-card': HtmlAttributes;
      'ha-icon': HtmlAttributes & {
        icon?: string;
      };
      'ha-state-icon': HtmlAttributes & {
        hass?: HomeAssistant;
        stateObj?: HassEntity;
        stateValue?: string;
        icon?: string;
      };
      'ha-selector-entity': HtmlAttributes & {
        hass: HomeAssistant;
        selector: EntitySelector;
        value?: any;
        label?: string;
        helper?: string;
        disabled?: boolean;
        required?: boolean;
      }
      'ha-selector': HtmlAttributes & {
        hass: HomeAssistant;
        name?: string;
        selector: Selector;
        value?: any;
        label?: string;
        helper?: string;
        disabled?: boolean;
        required?: boolean;
      }
    }
  }
}

declare module 'csstype' {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any;
  }
}

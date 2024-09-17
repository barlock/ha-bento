import { HomeAssistant } from 'custom-card-helpers';

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
        state?: HassEntity;
        stateValue?: string;
        icon?: string;
      };
    }
  }
}

declare module 'csstype' {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any;
  }
}

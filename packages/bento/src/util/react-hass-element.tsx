import { createRoot, Root } from 'react-dom/client';
import { ComponentType } from 'react';
import { createStore, StoreContext } from '../state/store';
import { HomeAssistant } from 'custom-card-helpers';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';

export class ReactHassElement extends HTMLElement {
  private readonly emotion: EmotionCache;
  private readonly root: Root;
  private store = createStore();

  constructor(private Component: ComponentType) {
    super();

    this.emotion = createCache({
      key: 'skylight',
      container: this,
    });
    this.root = createRoot(this);
    this.store.setState({
      fireEvent: (name: string, detail: any) => {
        this.dispatchEvent(
          new CustomEvent(name, {
            bubbles: true,
            composed: true,
            detail,
          }),
        );
      },
    });
  }

  connectedCallback() {
    const Component = this.Component;

    this.root.render(
      <CacheProvider value={this.emotion}>
        <StoreContext.Provider value={this.store}>
          <Component />
        </StoreContext.Provider>
      </CacheProvider>,
    );
  }

  disconnectedCallback() {
    //    this.root.unmount();
  }

  set hass(hass: HomeAssistant | undefined) {
    this.store.setState({ hass });
  }

  setConfig(config: any) {
    this.store.setState({ config });
  }
}

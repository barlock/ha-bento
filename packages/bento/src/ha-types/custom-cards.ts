/**
 * Copied from homeassistant/frontend
 * https://github.com/home-assistant/frontend/blob/ca66c02fb3747d012e771d12abc31db4f029064a/src/data/lovelace_custom_cards.ts
 */
export interface CustomCardEntry {
  type: string;
  name?: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

/**
 * Copied from home-assistant/frontend
 * https://github.com/home-assistant/frontend/blob/dev/src/components/ha-form/types.ts
 */
import React from 'react';
import { Selector } from './ha-selector';
import type { HaDurationData } from './ha-duration-input';
import { HomeAssistant } from 'custom-card-helpers';

export type HaFormSchema =
  | HaFormConstantSchema
  | HaFormStringSchema
  | HaFormIntegerSchema
  | HaFormFloatSchema
  | HaFormBooleanSchema
  | HaFormSelectSchema
  | HaFormMultiSelectSchema
  | HaFormTimeSchema
  | HaFormSelector
  | HaFormGridSchema
  | HaFormExpandableSchema;

export interface HaFormBaseSchema {
  name: string;
  // This value is applied if no data is submitted for this field
  default?: HaFormData;
  required?: boolean;
  disabled?: boolean;
  description?: {
    suffix?: string;
    // This value will be set initially when form is loaded
    suggested_value?: HaFormData;
  };
  context?: Record<string, string>;
}

export interface HaFormGridSchema extends HaFormBaseSchema {
  type: 'grid';
  flatten?: boolean;
  column_min_width?: string;
  schema: readonly HaFormSchema[];
}

export interface HaFormExpandableSchema extends HaFormBaseSchema {
  type: 'expandable';
  flatten?: boolean;
  title?: string;
  icon?: string;
  iconPath?: string;
  expanded?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  schema: readonly HaFormSchema[];
}

export interface HaFormSelector extends HaFormBaseSchema {
  type?: never;
  selector: Selector;
}

export interface HaFormConstantSchema extends HaFormBaseSchema {
  type: 'constant';
  value?: string;
}

export interface HaFormIntegerSchema extends HaFormBaseSchema {
  type: 'integer';
  default?: HaFormIntegerData;
  valueMin?: number;
  valueMax?: number;
}

export interface HaFormSelectSchema extends HaFormBaseSchema {
  type: 'select';
  options: ReadonlyArray<readonly [string, string]>;
}

export interface HaFormMultiSelectSchema extends HaFormBaseSchema {
  type: 'multi_select';
  options:
    | Record<string, string>
    | readonly string[]
    | ReadonlyArray<readonly [string, string]>;
}

export interface HaFormFloatSchema extends HaFormBaseSchema {
  type: 'float';
}

export interface HaFormStringSchema extends HaFormBaseSchema {
  type: 'string';
  format?: string;
  autocomplete?: string;
}

export interface HaFormBooleanSchema extends HaFormBaseSchema {
  type: 'boolean';
}

export interface HaFormTimeSchema extends HaFormBaseSchema {
  type: 'positive_time_period_dict';
}

// Type utility to unionize a schema array by flattening any grid schemas
export type SchemaUnion<
  SchemaArray extends readonly HaFormSchema[],
  Schema = SchemaArray[number],
> = Schema extends HaFormGridSchema | HaFormExpandableSchema
  ? SchemaUnion<Schema['schema']> | Schema
  : Schema;

export interface HaFormDataContainer {
  [key: string]: HaFormData;
}

export type HaFormData =
  | HaFormStringData
  | HaFormIntegerData
  | HaFormFloatData
  | HaFormBooleanData
  | HaFormSelectData
  | HaFormMultiSelectData
  | HaFormTimeData;

export type HaFormStringData = string;
export type HaFormIntegerData = number;
export type HaFormFloatData = number;
export type HaFormBooleanData = boolean;
export type HaFormSelectData = string;
export type HaFormMultiSelectData = string[];
export type HaFormTimeData = HaDurationData;

interface HaFormAttributes
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  hass: HomeAssistant;
  schema: HaFormSchema | HaFormSchema[];
  data?: HaFormDataContainer | HaFormData;
  label?: string;
  computeLabel?: (schema: HaFormSchema) => string;
  valueChanged?: (event: CustomEvent) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-form': HaFormAttributes;
    }
  }
}
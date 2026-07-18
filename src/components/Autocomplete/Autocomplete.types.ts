export type AutocompleteProps = {
  options: string[];
  label: string;
  value?: string[];
  onChange?: (value: string[]) => void;
};

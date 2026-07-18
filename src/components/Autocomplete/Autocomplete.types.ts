export type AutocompleteProps = {
  options: string[];
  label: string;
  value?: string | null;
  onChange?: (value: string | null) => void;
};

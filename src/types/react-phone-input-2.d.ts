declare module 'react-phone-input-2' {
  import { Component } from 'react';

  interface PhoneInputProps {
    country?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    buttonStyle?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    disabled?: boolean;
    autoFormat?: boolean;
    defaultCountry?: string;
    regions?: string | string[];
    preferredCountries?: string[];
    excludeCountries?: string[];
    onlyCountries?: string[];
    defaultMask?: string;
    alwaysDefaultMask?: boolean;
    prefix?: string;
    copyNumbersOnly?: boolean;
    enableSearch?: boolean;
    disableSearchIcon?: boolean;
    disableCountryCode?: boolean;
    disableDropdown?: boolean;
    searchPlaceholder?: string;
    searchNotFound?: string;
    preserveOrder?: string[];
    countryCodeEditable?: boolean;
    enableLongNumbers?: boolean;
    enableAreaCodes?: boolean;
    enableAreaCodeStretch?: boolean;
    enableClickOutside?: boolean;
    enableTerritories?: boolean;
    enableSearchField?: boolean;
    disableInitialCountryGuess?: boolean;
    disableCountryGuess?: boolean;
    disableAreaCodes?: boolean;
    localization?: Record<string, string>;
    masks?: Record<string, string>;
    areaCodes?: Record<string, string[]>;
    jumpCursorToEnd?: boolean;
    autoComplete?: string;
    name?: string;
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    isValid?: (value: string, country: any) => boolean;
    specialLabel?: string;
    countryLabelFormatter?: (country: any) => string;
    renderCountrySelect?: (props: any) => React.ReactNode;
    renderInput?: (props: any) => React.ReactNode;
  }

  class PhoneInput extends Component<PhoneInputProps> {}

  export default PhoneInput;
} 
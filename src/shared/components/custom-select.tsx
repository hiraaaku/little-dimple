import Select, { 
	StylesConfig, 
	CSSObjectWithLabel, 
	GroupBase, 
	OptionProps,
	ControlProps,
	PlaceholderProps,
	SingleValueProps,
	InputProps,
	MenuProps,
	MenuListProps,
	ValueContainerProps,
	DropdownIndicatorProps,
	ClearIndicatorProps,
	IndicatorSeparatorProps
} from 'react-select';

export type SelectOption = {
	value: string;
	label: string;
};

const baseStyles = {
	fontFamily: 'var(--font-dm-sans)',
	fontWeight: 'normal',
} as const;

export const customStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
	control: (base: CSSObjectWithLabel) => ({
		...base,
		...baseStyles,
		backgroundColor: '#f8f8f8',
		borderColor: '#e2e2e2',
		borderRadius: '0.5rem',
		minHeight: '38px',
		boxShadow: 'none',
		'&:hover': {
			borderColor: '#e2e2e2'
		},
		'&:focus-within': {
			borderColor: '#e2e2e2',
			boxShadow: 'none'
		}
	}),
	option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
		...base,
		...baseStyles,
		backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
		color: '#333',
		padding: '8px 12px',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#f0f0f0'
		}
	}),
	placeholder: (base: CSSObjectWithLabel) => ({
		...base,
		...baseStyles,
		color: '#666',
		fontSize: '14px'
	}),
	singleValue: (base: CSSObjectWithLabel) => ({
		...base,
		...baseStyles,
		color: '#333',
		fontSize: '14px',
	}),
	input: (base: CSSObjectWithLabel) => ({
		...base,
		...baseStyles,
		color: '#333',
		fontSize: '14px',
		margin: 0,
		padding: 0,
		boxShadow: 'none',
		border: 'none',
		'&:focus': {
			boxShadow: 'none',
			border: 'none'
		}
	}),
	menu: (base: CSSObjectWithLabel) => ({
		...base,
		...baseStyles,
		backgroundColor: 'white',
		borderRadius: '0.5rem',
		marginTop: '4px',
		zIndex: 10
	}),
	menuList: (base: CSSObjectWithLabel) => ({
		...base,
		...baseStyles,
		padding: '4px'
	}),
	indicatorSeparator: () => ({
		display: 'none'
	}),
	dropdownIndicator: (base: CSSObjectWithLabel) => ({
		...base,
		padding: '0 8px',
		color: '#666',
		'&:hover': {
			color: '#666'
		}
	}),
	clearIndicator: (base: CSSObjectWithLabel) => ({
		...base,
		padding: '0 8px',
		color: '#666',
		'&:hover': {
			color: '#666'
		}
	}),
	valueContainer: (base: CSSObjectWithLabel) => ({
		...base,
		padding: '0 12px'
	})
};

interface CustomSelectProps {
	options: SelectOption[];
	value: SelectOption | null;
	onChange: (option: SelectOption | null) => void;
	placeholder: string;
	isDisabled?: boolean;
	isClearable?: boolean;
	isSearchable?: boolean;
	noOptionsMessage?: () => string;
	styles?: Partial<StylesConfig<SelectOption, false, GroupBase<SelectOption>>>;
	invertStyles?: boolean;
}

export default function CustomSelect({
	options,
	value,
	onChange,
	placeholder,
	isDisabled = false,
	isClearable = true,
	isSearchable = true,
	noOptionsMessage = () => "No options found",
	styles,
	invertStyles = false
}: CustomSelectProps) {
	const mergedStyles = invertStyles
		? {
				...styles,
				control: (base: CSSObjectWithLabel, state: ControlProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.control?.(base, state) || {})
				}),
				option: (base: CSSObjectWithLabel, state: OptionProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.option?.(base, state) || {})
				}),
				placeholder: (base: CSSObjectWithLabel, state: PlaceholderProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.placeholder?.(base, state) || {})
				}),
				singleValue: (base: CSSObjectWithLabel, state: SingleValueProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.singleValue?.(base, state) || {})
				}),
				input: (base: CSSObjectWithLabel, state: InputProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.input?.(base, state) || {})
				}),
				menu: (base: CSSObjectWithLabel, state: MenuProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.menu?.(base, state) || {})
				}),
				menuList: (base: CSSObjectWithLabel, state: MenuListProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.menuList?.(base, state) || {})
				}),
				indicatorSeparator: (base: CSSObjectWithLabel, state: IndicatorSeparatorProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.indicatorSeparator?.(base, state) || {})
				}),
				dropdownIndicator: (base: CSSObjectWithLabel, state: DropdownIndicatorProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.dropdownIndicator?.(base, state) || {})
				}),
				clearIndicator: (base: CSSObjectWithLabel, state: ClearIndicatorProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.clearIndicator?.(base, state) || {})
				}),
				valueContainer: (base: CSSObjectWithLabel, state: ValueContainerProps<SelectOption, false, GroupBase<SelectOption>>) => ({
					...base,
					...(styles?.valueContainer?.(base, state) || {})
				})
		  }
		: {
				...customStyles,
				...styles
		  };

	return (
		<Select
			options={options}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			isDisabled={isDisabled}
			isClearable={isClearable}
			isSearchable={isSearchable}
			styles={mergedStyles}
			className="custom-select"
			noOptionsMessage={noOptionsMessage}
		/>
	);
} 
import { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({
	options,
	label,
	id,
	selectedVal,
	handleChange,
}) => {
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const inputRef = useRef(null);

	useEffect(() => {
		document.addEventListener("click", toggle);
		return () => document.removeEventListener("click", toggle);
	}, []);

	const selectOption = (option) => {
		setQuery(() => "");
		handleChange(option[label]);
		setIsOpen((isOpen) => !isOpen);
	};

	function toggle(e) {
		setIsOpen(e && e.target === inputRef.current);
	}

	const getDisplayValue = () => {
		if (query) return query;
		if (selectedVal) return selectedVal;

		return "";
	};

	const filter = (options) => {
		// iterate through options and return first 10 options that match query
		let filteredOptions = [];
		for (let i = 0; i < options.length; i++) {
			if (filteredOptions.length >= 100) break;
			if (
				options[i][label].toLowerCase().indexOf(query.toLowerCase()) >
				-1
			) {
				filteredOptions.push(options[i]);
			}
		}
		return filteredOptions;
	};

	return (
		<div className="dropdown">
			<div className="control">
				<div className="selected-value">
					<input
						placeholder="Search for a class"
						ref={inputRef}
						type="text"
						value={getDisplayValue()}
						name="searchTerm"
						onChange={(e) => {
							setQuery(e.target.value);
							handleChange(null);
						}}
						onClick={toggle}
					/>
				</div>
				<div className={`arrow ${isOpen ? "open" : ""}`}></div>
			</div>

			<div className={`options ${isOpen ? "open" : ""}`}>
				{filter(options).map((option, index) => {
					return (
						<div
							onClick={() => selectOption(option)}
							className={`option ${
								option[label] === selectedVal ? "selected" : ""
							}`}
							key={`${id}-${index}`}
						>
							{option[label]}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SearchableDropdown;

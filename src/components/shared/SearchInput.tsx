import { Form, InputGroup } from 'react-bootstrap';

interface SearchInputProps {
    onSearch: (value: string) => void;
    placeholder?: string
}

const SearchInput = ({ onSearch, placeholder = "Search..." }: SearchInputProps) => {
    return (
        <InputGroup className="w-50 align-self-center">
            <Form.Control
                aria-label="Search category input"
                placeholder={placeholder}
                onChange={(e) => onSearch(e.target.value)}
            />
            <InputGroup.Text>
                <i className="bi bi-search"></i>
            </InputGroup.Text>
        </InputGroup>
    );
};

export default SearchInput;
import { useState, useEffect } from 'react';


type Props = {
    items: string[];
    onSelect: (item: string) => void;
};

const AutoComplete = ({ items, onSelect } : Props) => {
  const [query, setQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);  
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredItems([]);
      setShowDropdown(false);
      return;
    }

    const filtered = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredItems(filtered);
    setShowDropdown(filtered.length > 0);
    setActiveIndex(-1);
  }, [query, items]);

  const handleSelect = (item:string) => {
    setQuery(item);
    setShowDropdown(false);
    onSelect(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSelect(filteredItems[activeIndex]);
      }
    }
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(filteredItems.length > 0)}
      />
      {showDropdown && (
        <ul className="dropdown">
          {filteredItems.map((item, index) => (
            <li
              key={item}
              className={index === activeIndex ? 'active' : ''}
             
            >
                <button  onClick={() => handleSelect(item)}>
  {item}
                </button>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

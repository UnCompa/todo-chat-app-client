// Dropdown.tsx

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

type DropdownSize = "sm" | "md" | "lg";

interface DropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  onSelect?: (item: DropdownItem) => void;
  value?: string | number;
  className?: string;
  size?: DropdownSize; // 👈 nuevo
  disabled?: boolean; // opcional, pero útil
}
export function Dropdown({
  items,
  placeholder = "Seleccionar...",
  onSelect,
  value,
  className = "",
  size = "md",
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? internalValue;
  const selectedItem = items.find((i) => i.value === selectedValue);

  const handleSelect = (item: DropdownItem) => {
    if (!value) {
      setInternalValue(item.value);
    }
    onSelect?.(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Mapeo de tamaños a clases de padding
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-base",
  };

  const menuSizeClasses = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-base",
  };

  return (
    <div
      ref={ref}
      className={`relative inline-block w-full max-w-xs ${className}`}
    >
      {/* Botón del dropdown */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between rounded-md border
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${sizeClasses[size]}
          ${disabled
            ? 'opacity-60 cursor-not-allowed bg-[var(--color-elev-1)] text-[var(--color-muted)] border-[var(--color-border)]'
            : 'bg-[var(--color-elev-1)] text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-elev-2)] focus:ring-[var(--ring-color)] focus:border-[var(--ring-color)]'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedItem?.icon && (
            <span className="flex-shrink-0">{selectedItem.icon}</span>
          )}
          <span className="truncate">
            {selectedItem?.label ?? placeholder}
          </span>
        </span>
        <ChevronDown
          size={size === "sm" ? 14 : size === "lg" ? 20 : 18}
          className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Menú desplegable */}
      {isOpen && !disabled && (
        <ul
          className={`
            absolute left-0 z-20 mt-1 w-full
            bg-[var(--color-surface)] border border-[var(--color-border)]
            rounded-md shadow-lg overflow-hidden
            max-h-60 overflow-y-auto
            focus:outline-none
          `}
          role="listbox"
        >
          {items.length === 0 ? (
            <li className="px-3 py-2 text-[var(--color-muted)] text-sm italic">
              Sin opciones
            </li>
          ) : (
            items.map((item) => (
              <li
                key={item.value}
                onClick={() => handleSelect(item)}
                className={`
                  flex items-center gap-2 cursor-pointer
                  ${menuSizeClasses[size]}
                  transition-colors
                  ${selectedValue === item.value
                    ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-950)] dark:text-[var(--color-primary-300)]'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-elev-2)]'
                  }
                `}
                role="option"
                aria-selected={selectedValue === item.value}
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="truncate">{item.label}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
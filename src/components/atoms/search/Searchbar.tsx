import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  fullWidth?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchBar({
  placeholder,
  fullWidth = false,
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-full md:w-auto"}`}>
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || "Search..."}
        className={`focus-visible:ring-primary rounded-xl py-2 pr-4 pl-9 focus-visible:ring-1 ${
          fullWidth ? "w-full" : "w-full md:w-auto"
        }`}
      />
    </div>
  );
}

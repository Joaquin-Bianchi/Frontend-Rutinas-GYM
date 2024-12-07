import { Label } from "@/components/ui/label";
import { Controller, Control } from "react-hook-form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multipleSelector";

interface MultiSelectFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  options: any[];
  rules?: object;
  placeholder?: string;
}

export function MultiSelectField({
  name,
  label,
  control,
  options,
  rules,
  placeholder,
}: MultiSelectFieldProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <MultiSelector values={value || []} onValuesChange={onChange} loop>
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder={placeholder} />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList className="capitalize h-[200px] overflow-y-scroll scrollbar-hide">
                  {options.map((option) => (
                    <MultiSelectorItem key={option} value={option}>
                      {option}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
            {error && (
              <span className="text-sm text-red-500">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
}

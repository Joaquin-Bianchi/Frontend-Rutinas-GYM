import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, Control } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  rules?: object;
  placeholder?: string;
  type?: string;
}

export function FormField({
  name,
  label,
  control,
  rules,
  placeholder,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input id={name} type={type} placeholder={placeholder} {...field} />
            {error && (
              <span className="text-sm text-red-500">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
}

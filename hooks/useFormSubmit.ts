import { AppInputProps } from "@/components/ui/AppInput";
import { removeNullishValues } from "@/functions/helpers";
import { useMemo, useRef, useState } from "react";
import { TextInput } from "react-native";

export type _JSON = Record<string, string>;

export type SubmitResponse = {
  error?: string;
  data?: any;
  success?: string;
  fieldErrors?: { [key: string]: string[] };
};

export type UseFormSubmitParams<T> = {
  onSubmit?: (values: T) => Promise<void | SubmitResponse>;
  onSuccess?: (data: SubmitResponse) => void;
  onError?: (data: SubmitResponse) => void;
  onData?: (data: SubmitResponse) => void;
  logging?: boolean;
  extra?: Record<string, string>;
};

export function useFormSubmit<T extends _JSON>({
  onSubmit,
  onSuccess,
  onError,
  onData,
  logging = false,
  extra,
}: UseFormSubmitParams<T>) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<T>({} as T);
  const [res, setRes] = useState<SubmitResponse>({});
  const fields = useRef<Record<string, TextInput>>({});
  const [validFields] = useState<Record<string, boolean>>({});
  const canSubmit = useMemo(() => {
    // console.log({ validFields });

    return !Object.values(validFields).includes(false);
  }, [validFields]);

  function log(data: any) {
    if (logging) console.log(data);
  }

  function updateValue(key: string, value: string) {
    setValues({ ...values, [key]: value });
  }

  const inputProps: (key: string, defaultValue?: string) => AppInputProps = (
    key: string,
    defaultValue?: string
  ) => {
    if (typeof values[key] === "undefined" && defaultValue)
      updateValue(key, defaultValue);
    return {
      onChangeText: (value: string) => {
        updateValue(key, value);
        // console.log(fields);
      },
      _ref(input: TextInput) {
        if (!fields.current) return;
        fields.current[key] = input;
      },
      defaultValue: defaultValue,
      onLayout: () => {
        if (logging) console.log(key, defaultValue, "laid out");
      },
      value: values[key],
      onSubmitEditing() {
        const fieldIndex = Object.keys(fields.current).indexOf(key);
        const nextKey =
          fieldIndex >= 0 ? Object.keys(fields.current)[fieldIndex + 1] : null;
        // console.log({ nextKey });

        if (nextKey) {
          fields?.current?.[nextKey].focus();
        }
      },
      blurOnSubmit:
        key ===
        Object.keys(fields.current)[Object.keys(fields.current).length - 1],
      errors: res.fieldErrors?.[key],
    };
  };

  async function handleSubmit() {
    setLoading(true);
    setRes({});
    try {
      const _res = await onSubmit?.(
        removeNullishValues({ ...values, ...extra }) as any
      );
      if (_res) onData?.(_res);
      if (_res && _res.success !== undefined && onSuccess) onSuccess(_res);
      if (_res && _res.error !== undefined && onError) onError(_res);
      setRes(_res ?? {});
    } catch (e) {
      console.error(e);
      setRes({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  const formButtonProps = {
    loading,
    onPress: handleSubmit,
  };

  return {
    inputProps,
    handleSubmit,
    formButtonProps,
    res,
    canSubmit,
    setValues,
    values,
  };
}

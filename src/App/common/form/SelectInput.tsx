import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Select } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  onSelectCallback: any;
}

export const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  onSelectCallback,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value}
        onChange={(event, data) => {
          input.onChange(data.value);
          if (onSelectCallback != null)
            onSelectCallback();
        }}
        placeholder={placeholder}
        options={options}
      />
    </Form.Field>
  );
};

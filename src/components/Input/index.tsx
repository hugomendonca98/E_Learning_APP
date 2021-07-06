/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, string | number>;
  isErrored: boolean | undefined;
}

interface RefProps {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<RefProps, InputProps> = ({
  icon,
  isErrored,
  containerStyle = {},
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!rest.value);
  }, [rest.value]);

  return (
    <Container style={containerStyle} isErrored={isErrored}>
      <Icon
        name={icon}
        size={20}
        color={
          isErrored ? '#c53030' : isFocused || isFilled ? '#7b6c9b' : '#C4C4D1'
        }
      />
      <TextInput
        placeholderTextColor="#C4C4D1"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      {isErrored && <Icon name="alert-circle" size={20} color="#c53030" />}
    </Container>
  );
};

export default Input;

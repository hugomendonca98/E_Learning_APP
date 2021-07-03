/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, string | number>;
}

interface RefProps {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<RefProps, InputProps> = (
  // eslint-disable-next-line react/prop-types
  { icon, containerStyle = {}, ...rest },
) => {
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
    <Container style={containerStyle} isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#FF6680' : '#C4C4D1'}
      />
      <TextInput
        placeholderTextColor="#C4C4D1"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default Input;

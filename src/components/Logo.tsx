import React from 'react';
import { SvgXml } from 'react-native-svg';
import { logoXml } from '../assets/logoXml';
import { useTheme } from '../contexts/ThemeContext';

const ASPECT = 242.88 / 123;

interface Props {
  height?: number;
  color?: string;
}

export function Logo({ height = 34, color }: Props) {
  const { colors } = useTheme();
  return (
    <SvgXml
      xml={logoXml}
      width={height * ASPECT}
      height={height}
      color={color ?? colors.text}
    />
  );
}

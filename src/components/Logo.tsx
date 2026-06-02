import React from 'react';
import { Image } from 'react-native';

// Logo oficial da MEND (PNG sem fundo: lettering branco + acentos laranja).
const logoSource = require('../../assets/logo.png');
const ASPECT = 779 / 178;

export function Logo({ height = 34 }: { height?: number }) {
  return (
    <Image
      source={logoSource}
      style={{ width: height * ASPECT, height, resizeMode: 'contain' }}
    />
  );
}

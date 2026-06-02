import React from 'react';
import { SvgXml } from 'react-native-svg';
import { logoXml } from '../assets/logoXml';

// Logo oficial da MEND (cores originais: escuro + laranja).
// Use sobre fundo claro — não fica legível sobre o laranja do header.
const ASPECT = 242.88 / 123;

export function Logo({ height = 34 }: { height?: number }) {
  return <SvgXml xml={logoXml} width={height * ASPECT} height={height} />;
}

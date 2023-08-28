import type * as React from 'react';
import SingleRadio, { RadioProps } from './radio';
import RadioGroup from './radio-group';

type CompoundedComponent = React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLElement>
> & { Group: typeof RadioGroup };

const Radio = SingleRadio as CompoundedComponent;
Radio.Group = RadioGroup;

export default Radio;

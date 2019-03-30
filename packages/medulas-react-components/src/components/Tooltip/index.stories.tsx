import { storiesOf } from '@storybook/react';
import React from 'react';
import Tooltip from './index';
import Block from '../Block';
import { Storybook } from '../../utils/storybook';

storiesOf('Components', module).add('Tooltip', () => (
  <Storybook>
    <Block>
      <Tooltip>Some tooltip text</Tooltip>
    </Block>
    <br />
    <br />
    <br />
    <br />
    <Block>
      Loooooooooooooooooooooooooooooooooong text
      <Tooltip>Tooltip for long text</Tooltip>
    </Block>
  </Storybook>
));

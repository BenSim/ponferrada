import { TokenTicker } from '@iov/core';
import { storiesOf } from '@storybook/react';
import Block from 'medulas-react-components/lib/components/Block';
import Hairline from 'medulas-react-components/lib/components/Hairline';
import Typography from 'medulas-react-components/lib/components/Typography';
import * as React from 'react';
import { ReadonlyDate } from 'readonly-date';
import { DeepPartial } from 'redux';
import { ProcessedTx, Tx } from '../../store/notifications';
import { RootState } from '../../store/reducers';
import { stringToAmount } from '../../utils/balances';
import DecoratedStorybook from '../../utils/storybook';
import Header from './index';

const pendingTxs: ReadonlyArray<Tx> = [
  {
    id: 'tx1',
    recipient: 'alex*iov',
    amount: stringToAmount('12.5', 'IOV' as TokenTicker),
    signer: 'adolfo*iov',
  },
  {
    id: 'tx2',
    recipient: 'moe*iov',
    amount: stringToAmount('0.14', 'IOV' as TokenTicker),
    signer: 'adolfo*iov',
  },
];

const txs: ReadonlyArray<ProcessedTx> = [
  {
    received: true,
    signer: 'george*iov',
    recipient: 'me',
    amount: stringToAmount('10.5', 'LSK' as TokenTicker),
    time: new ReadonlyDate('2018-12-24T10:51:33.763Z'),
    success: true,
    id: 'tx1',
  },
  {
    received: false,
    signer: 'me',
    recipient: 'alex*iov',
    amount: stringToAmount('25.5', 'IOV' as TokenTicker),
    time: new ReadonlyDate('2018-12-24T10:51:33.763Z'),
    success: true,
    id: 'tx2',
  },
];

const faultTx: ProcessedTx = {
  received: false,
  signer: 'me',
  recipient: 'alex*iov',
  amount: stringToAmount('100.5', 'IOV' as TokenTicker),
  time: new ReadonlyDate('2018-12-24T10:51:33.763Z'),
  success: false,
  id: 'tx3',
};

const txStore: DeepPartial<RootState> = {
  notifications: {
    transactions: txs,
  },
};

const pendingTxStore: DeepPartial<RootState> = {
  notifications: {
    pending: pendingTxs,
  },
};

const fullStore = (faulty: boolean): DeepPartial<RootState> => {
  const fullTxs = faulty ? [faultTx, ...txs] : txs;

  return {
    notifications: {
      pending: pendingTxs,
      transactions: fullTxs,
    },
  };
};

interface EnahncedHeaderProps {
  readonly text: string;
}

const EnhancedHeader = ({ text }: EnahncedHeaderProps): JSX.Element => (
  <React.Fragment>
    <Typography variant="h6">{text}</Typography>
    <Header />
    <Hairline />
    <Block marginBottom={6} />
  </React.Fragment>
);

storiesOf('Components', module)
  .addParameters({ viewport: { defaultViewport: 'responsive' } })
  .add(
    'Header',
    (): JSX.Element => (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <DecoratedStorybook storeProps={fullStore(false)}>
          <EnhancedHeader text="Full Header" />
        </DecoratedStorybook>
        <DecoratedStorybook storeProps={fullStore(true)}>
          <EnhancedHeader text="Faulty full Header" />
        </DecoratedStorybook>
        <DecoratedStorybook storeProps={txStore}>
          <EnhancedHeader text="Txs Header" />
        </DecoratedStorybook>
        <DecoratedStorybook storeProps={pendingTxStore}>
          <EnhancedHeader text="Pending Header" />
        </DecoratedStorybook>
        <DecoratedStorybook>
          <EnhancedHeader text="Empty Header" />
        </DecoratedStorybook>
      </div>
    ),
  );
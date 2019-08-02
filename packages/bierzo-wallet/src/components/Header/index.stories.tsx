import { Address, Algorithm, ChainId, Identity, PubkeyBytes, TokenTicker } from '@iov/bcp';
import { Encoding } from '@iov/encoding';
import { storiesOf } from '@storybook/react';
import Block from 'medulas-react-components/lib/components/Block';
import Hairline from 'medulas-react-components/lib/components/Hairline';
import Typography from 'medulas-react-components/lib/components/Typography';
import * as React from 'react';
import { ReadonlyDate } from 'readonly-date';
import { DeepPartial } from 'redux';

import { RootState } from '../../store/reducers';
import { stringToAmount } from '../../utils/balances';
import DecoratedStorybook, { WALLET_ROOT } from '../../utils/storybook';
import Header from './index';

const defaultCreator: Identity = {
  chainId: 'registry-chain' as ChainId,
  pubkey: {
    algo: Algorithm.Ed25519,
    // Random 32 bytes pubkey. Derived IOV address:
    // tiov1dcg3fat5zrvw00xezzjk3jgedm7pg70y222af3 / 6e1114f57410d8e7bcd910a568c9196efc1479e4
    data: Encoding.fromHex('7196c465e4c95b3dce425784f51936b95da6bc58b3212648cdca64ee7198df47') as PubkeyBytes,
  },
};

const txs: ReadonlyArray<any> = [
  {
    kind: 'bns/register_username',
    creator: defaultCreator,
    username: 'alice*iov',
    targets: [
      {
        chainId: 'chain1' as ChainId,
        address: '367X' as Address,
      },
      {
        chainId: 'chain3' as ChainId,
        address: '0xddffeeffddaa44' as Address,
      },
      {
        chainId: 'chain2' as ChainId,
        address: '0x00aabbddccffee' as Address,
      },
    ],
    time: new ReadonlyDate('2018-12-24T10:51:33.763Z'),
  },
  {
    kind: 'bcp/send',
    received: true,
    sender: 'george*iov',
    recipient: 'me',
    amount: stringToAmount('10.5', 'LSK' as TokenTicker),
    time: new ReadonlyDate('2018-12-24T10:51:33.763Z'),
    id: 'tx1',
  },
  {
    kind: 'bcp/send',
    received: false,
    sender: 'me',
    recipient: 'alex*iov',
    amount: stringToAmount('25.5', 'IOV' as TokenTicker),
    time: new ReadonlyDate('2018-12-24T10:51:33.763Z'),
    id: 'tx2',
  },
];

const txStore: DeepPartial<RootState> = {
  notifications: {
    transactions: txs,
  },
};

interface EnahncedHeaderProps {
  readonly text: string;
}

const EnhancedHeader = ({ text }: EnahncedHeaderProps): JSX.Element => (
  <React.Fragment>
    <Typography variant="h6">{text}</Typography>
    <Header path="example" />
    <Hairline />
    <Block marginBottom={6} />
  </React.Fragment>
);

storiesOf(`${WALLET_ROOT}/Components`, module)
  .addParameters({ viewport: { defaultViewport: 'responsive' } })
  .add(
    'Header',
    (): JSX.Element => (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <DecoratedStorybook storeProps={txStore}>
          <EnhancedHeader text="Txs Header" />
        </DecoratedStorybook>
        <DecoratedStorybook>
          <EnhancedHeader text="Empty Header" />
        </DecoratedStorybook>
      </div>
    ),
  );

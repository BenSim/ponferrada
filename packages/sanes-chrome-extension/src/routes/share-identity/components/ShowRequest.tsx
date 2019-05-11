import * as React from 'react';
import Button from 'medulas-react-components/lib/components/Button';
import Typography from 'medulas-react-components/lib/components/Typography';
import Block from 'medulas-react-components/lib/components/Block';
import PageLayout from 'medulas-react-components/lib/components/PageLayout';

interface Props {
  readonly showAcceptView: () => void;
  readonly showRejectView: () => void;
}

const Layout = ({ showAcceptView, showRejectView }: Props): JSX.Element => (
  <PageLayout primaryTitle="Share" title="Identity">
    <Block textAlign="center">
      <Typography variant="body1">The following site:</Typography>
      <Typography variant="body1" color="primary">
        http://finex.com
      </Typography>
      <Typography variant="body1" inline>
        wants to see your identity on
      </Typography>
      <Typography variant="body1" inline color="primary">
        {' '}
        ETH
      </Typography>
    </Block>
    <Block marginTop={10} />
    <Button variant="contained" fullWidth onClick={showAcceptView}>
      Accept
    </Button>
    <Block marginTop={2} />
    <Button variant="contained" fullWidth color="secondary" onClick={showRejectView}>
      Reject
    </Button>
  </PageLayout>
);

export default Layout;
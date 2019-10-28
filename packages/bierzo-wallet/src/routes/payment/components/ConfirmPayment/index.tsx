import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionId } from "@iov/bcp";
import clipboardCopy from "clipboard-copy";
import {
  Block,
  Button,
  Image,
  makeStyles,
  ToastContext,
  ToastVariant,
  Typography,
} from "medulas-react-components";
import React from "react";

import tickIcon from "../../../../assets/tick.svg";
import PageContent from "../../../../components/PageContent";

export const PAYMENT_CONFIRMATION_VIEW_ID = "payment-confirmation-view-id";
const useClasses = makeStyles({
  txId: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  copyButton: {
    cursor: "pointer",
  },
});

const paymentIcon = <Image src={tickIcon} alt="Tick" />;

interface Props {
  readonly transactionId: TransactionId;
  readonly onNewPayment: () => void;
  readonly onSeeTrasactions: () => void;
  readonly onReturnToBalance: () => void;
}

const ConfirmPayment = ({
  transactionId,
  onNewPayment,
  onSeeTrasactions,
  onReturnToBalance,
}: Props): JSX.Element => {
  const toast = React.useContext(ToastContext);
  const classes = useClasses();

  const buttons = (
    <Block
      marginTop={4}
      marginBottom={1}
      justifyContent="center"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Block width="75%">
        <Button fullWidth onClick={onNewPayment}>
          New Payment
        </Button>
      </Block>
      <Block width="75%" marginTop={2}>
        <Button fullWidth variant="text" onClick={onSeeTrasactions}>
          See Transactions
        </Button>
      </Block>
    </Block>
  );

  const copyTxId = (): void => {
    clipboardCopy(transactionId);
    toast.show("Address has been copied to clipboard.", ToastVariant.INFO);
  };

  return (
    <PageContent id={PAYMENT_CONFIRMATION_VIEW_ID} icon={paymentIcon} avatarColor="#31E6C9" buttons={buttons}>
      <Typography color="textPrimary" variant="subtitle1" weight="semibold" align="center">
        Your transaction was successfully signed and sent to the network.
      </Typography>
      <Block marginTop={4} alignSelf="flex-start">
        <Typography color="textPrimary" variant="subtitle2" weight="semibold">
          Transaction ID
        </Typography>
      </Block>
      <Block marginTop={2} alignSelf="flex-start" display="flex" alignItems="center">
        <Typography color="textPrimary" variant="subtitle2" className={classes.txId}>
          {transactionId}
        </Typography>
        <Block marginLeft={1} onClick={copyTxId} className={classes.copyButton}>
          <FontAwesomeIcon icon={faCopy} color="#31E6C9" size="lg" />
        </Block>
      </Block>
    </PageContent>
  );
};

export default ConfirmPayment;

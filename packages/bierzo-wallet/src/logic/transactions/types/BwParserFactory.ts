import {
  Address,
  ConfirmedTransaction,
  FailedTransaction,
  isConfirmedTransaction,
  isFailedTransaction,
  isSendTransaction,
  UnsignedTransaction,
} from "@iov/bcp";
import {
  isRegisterUsernameTx,
  isUpdateTargetsOfUsernameTx,
  RegisterUsernameTx,
  UpdateTargetsOfUsernameTx,
} from "@iov/bns";

import { ProcessedSendTransaction } from "../../../store/notifications";
import { BwParser, ProcessedTx } from "../types/BwParser";
import { BwRegisterUsernameParser } from "./BwRegisterUsernameTx";
import { BwSendParser } from "./BwSendTransaction";
import { BwUnkownParser } from "./BwUnkownTransaction";
import { BwUpdateUsernameTargetParser } from "./BwUpdateUsernameTargetsTx";

function isProcessedSendTransaction(tx: ProcessedTx): tx is ProcessedSendTransaction {
  return isSendTransaction(tx.original);
}

function isProcessedRegisterUsernameTx(tx: ProcessedTx): tx is ProcessedTx<RegisterUsernameTx> {
  return isRegisterUsernameTx(tx.original);
}

function isProcessedUpdateUsernameTargetsTx(tx: ProcessedTx): tx is ProcessedTx<UpdateTargetsOfUsernameTx> {
  return isUpdateTargetsOfUsernameTx(tx.original);
}

export class BwParserFactory {
  public static getReactComponent(tx: ProcessedTx, userAddresses: readonly Address[]): JSX.Element {
    if (isProcessedSendTransaction(tx)) {
      return new BwSendParser().graphicalRepresentation(tx, userAddresses);
    } else if (isProcessedRegisterUsernameTx(tx)) {
      return new BwRegisterUsernameParser().graphicalRepresentation(tx);
    } else if (isProcessedUpdateUsernameTargetsTx(tx)) {
      return new BwUpdateUsernameTargetParser().graphicalRepresentation(tx);
    }

    return new BwUnkownParser().graphicalRepresentation(tx);
  }

  public static getHeaderRepresentation(tx: ProcessedTx, lastOne: boolean): JSX.Element {
    if (isProcessedSendTransaction(tx)) {
      return new BwSendParser().headerRepresentation(tx, lastOne);
    } else if (isProcessedRegisterUsernameTx(tx)) {
      return new BwRegisterUsernameParser().headerRepresentation(tx, lastOne);
    } else if (isProcessedUpdateUsernameTargetsTx(tx)) {
      return new BwUpdateUsernameTargetParser().headerRepresentation(tx, lastOne);
    }

    return new BwUnkownParser().headerRepresentation(tx, lastOne);
  }

  public static getBwTransactionFrom(
    trans: ConfirmedTransaction<UnsignedTransaction> | FailedTransaction,
  ): BwParser<UnsignedTransaction> {
    if (isFailedTransaction(trans)) {
      throw new Error("Not supported error txs for now");
    }

    if (!isConfirmedTransaction(trans)) {
      throw new Error("Confirmed transaction expected");
    }

    const { transaction: payload } = trans;
    if (isSendTransaction(payload)) {
      return new BwSendParser();
    } else if (isRegisterUsernameTx(payload)) {
      return new BwRegisterUsernameParser();
    } else if (isUpdateTargetsOfUsernameTx(payload)) {
      return new BwUpdateUsernameTargetParser();
    }

    return new BwUnkownParser();
  }
}

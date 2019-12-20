import { ElectionRule } from "@iov/bns";
import { ProposalType } from "@iov/bns-governance";
import { FormApi } from "final-form";
import { Block, FieldInputValue } from "medulas-react-components";
import React, { Dispatch, SetStateAction } from "react";

import AddCommitteeMember from "./AddCommitteeMember";
import AddValidator from "./AddValidator";
import AmendCommitteeQuorum from "./AmendCommitteeQuorum";
import AmendCommitteeThreshold from "./AmendCommitteeThreshold";
import AmendProtocol from "./AmendProtocol";
import DistributeFunds, { Recipient } from "./DistributeFunds";
import ReleaseGuaranteeFunds from "./ReleaseGuaranteeFunds";
import RemoveCommitteeMember from "./RemoveCommitteeMember";
import RemoveValidator from "./RemoveValidator";

const proposalOptions = {
  [ProposalType.AmendProtocol]: AmendProtocol,
  [ProposalType.AddCommitteeMember]: AddCommitteeMember,
  [ProposalType.RemoveCommitteeMember]: RemoveCommitteeMember,
  [ProposalType.AmendElectionRuleThreshold]: AmendCommitteeThreshold,
  [ProposalType.AmendElectionRuleQuorum]: AmendCommitteeQuorum,
  [ProposalType.AddValidator]: AddValidator,
  [ProposalType.RemoveValidator]: RemoveValidator,
  [ProposalType.ReleaseGuaranteeFunds]: ReleaseGuaranteeFunds,
  [ProposalType.DistributeFunds]: DistributeFunds,
  [ProposalType.ExecuteMigration]: Block, // TODO: implement
};

export const isFraction = (value: FieldInputValue): string | undefined => {
  if (typeof value !== "string") throw new Error("Input must be a string");

  const members = value.split("/");
  const numerator = parseInt(members[0], 10);
  const denominator = parseInt(members[1], 10);

  if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
    return "Must be a valid fraction in the form a/b";
  }

  if (numerator > denominator) {
    return "Fraction must be less than or equal to 1";
  }

  return undefined; // valid
};

interface Props {
  readonly form: FormApi;
  readonly proposalType: ProposalType;
  readonly electionRule: ElectionRule | undefined;
  readonly recipientsChanged: Dispatch<SetStateAction<readonly Recipient[]>>;
}

const FormOptions = ({ form, proposalType, electionRule, recipientsChanged }: Props): JSX.Element => {
  const FormComponent = proposalOptions[proposalType];

  return <FormComponent form={form} electionRule={electionRule} recipientsChanged={recipientsChanged} />;
};

export default FormOptions;

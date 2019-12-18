import { ElectionRule } from "@iov/bns";
import { FormApi } from "final-form";
import { Block, SelectField, SelectFieldItem, Typography } from "medulas-react-components";
import React, { useState } from "react";
import { displayPeriod } from "ui-logic";

const COMMITTEE_RULES_FIELD = "Committee Rule";
const COMMITTEE_RULES_INITIAL = "Select a rule";

interface Props {
  readonly form: FormApi;
  readonly electionRules: readonly ElectionRule[];
  readonly electionRuleChanged: (rule: ElectionRule) => void;
}

const CommitteeRulesSelect = ({ form, electionRules, electionRuleChanged }: Props): JSX.Element => {
  const ruleItems = electionRules.map(rule => {
    return {
      name: `${rule.id}: ${rule.title}`,
    };
  });

  const [quorum, setQuorum] = useState<string>();
  const [threshold, setThreshold] = useState<string>();
  const [period, setPeriod] = useState<string>();

  const showRules = threshold && period;

  const changeCommittee = (selectedItem: SelectFieldItem | undefined): void => {
    if (!selectedItem) return;

    const ruleId = parseInt(selectedItem.name.substring(0, selectedItem.name.indexOf(":")), 10);
    const rule = electionRules.find(rule => rule.id === ruleId);
    if (!rule) throw new Error("Selected committee not found. This is a bug.");

    const quorum = rule.quorum ? `${rule.quorum.numerator}/${rule.quorum.denominator}` : "none";
    const threshold = `${rule.threshold.numerator}/${rule.threshold.denominator}`;
    const period = displayPeriod(rule.votingPeriod);

    setQuorum(quorum);
    setThreshold(threshold);
    setPeriod(period);

    electionRuleChanged(rule);
  };

  return (
    <Block marginTop={2} display="flex" flexDirection="column">
      <Block display="flex" alignItems="center">
        <Typography>{COMMITTEE_RULES_FIELD}</Typography>
        <Block marginLeft={2}>
          <SelectField
            fieldName={COMMITTEE_RULES_FIELD}
            fullWidth
            form={form}
            items={ruleItems}
            initial={COMMITTEE_RULES_INITIAL}
            onChangeCallback={changeCommittee}
          />
        </Block>
        {showRules && (
          <Block marginLeft={2}>
            <Typography variant="body2">
              Quorum: {quorum}, Threshold: {threshold}, Period: {period}
            </Typography>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default CommitteeRulesSelect;

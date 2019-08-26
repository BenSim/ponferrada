import { EnglishMnemonic } from "@iov/crypto";
import { FieldValidator } from "final-form";
import {
  Back,
  Block,
  Button,
  composeValidators,
  FieldInputValue,
  Form,
  FormValues,
  PageLayout,
  required,
  TextFieldForm,
  Typography,
  useForm,
} from "medulas-react-components";
import * as React from "react";

import { RESTORE_ACCOUNT } from "../../paths";

export const MNEMONIC_FIELD = "mnemonicField";

const englishMnemonicValidator: FieldValidator<FieldInputValue> = (value): FieldInputValue => {
  try {
    new EnglishMnemonic(value || "");
    return undefined; // valid
  } catch (_error) {
    return "Not a valid English mnemonic";
  }
};

const validator = composeValidators(required, englishMnemonicValidator);

interface Props {
  readonly onSetMnemonic: (values: FormValues) => void;
  readonly onBack: () => void;
}

const SetMnemonicForm = ({ onSetMnemonic, onBack }: Props): JSX.Element => {
  const onSubmit = async (values: object): Promise<void> => {
    const formValues = values as FormValues;
    onSetMnemonic(formValues);
  };

  const { form, handleSubmit, submitting, invalid } = useForm({ onSubmit });

  return (
    <PageLayout id={RESTORE_ACCOUNT} primaryTitle="Restore" title="Account">
      <Typography variant="subtitle1" inline>
        Restore your account with your recovery words. Enter your recovery words here.
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Block marginBottom={4}>
          <TextFieldForm
            multiline
            rows={5}
            placeholder="Recovery phrase"
            form={form}
            fullWidth
            name={MNEMONIC_FIELD}
            validate={validator}
          />
        </Block>
        <Block display="flex" justifyContent="space-between">
          <Block width={120}>
            <Back fullWidth onClick={onBack}>
              Back
            </Back>
          </Block>
          <Block width={120}>
            <Button fullWidth type="submit" disabled={invalid || submitting}>
              Continue
            </Button>
          </Block>
        </Block>
      </Form>
    </PageLayout>
  );
};

export default SetMnemonicForm;
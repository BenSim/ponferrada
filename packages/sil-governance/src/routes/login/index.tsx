import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  Block,
  Button,
  CircleImage,
  Form,
  ToastContext,
  ToastVariant,
  Typography,
  useForm,
} from "medulas-react-components";
import React, { useContext } from "react";
import * as ReactRedux from "react-redux";

import icon from "../../assets/iov-logo.svg";
import { getExtensionStatus, setExtensionStateAction } from "../../store/extension";
import { addProposalsAction, getProposals } from "../../store/proposals";
import { RootState } from "../../store/reducers";
import { history } from "../index";
import { DASHBOARD_ROUTE } from "../paths";

export const INSTALL_EXTENSION_MSG = "You need to install IOV extension.";
export const LOGIN_EXTENSION_MSG = "Please login to the IOV extension to continue.";

const useStyles = makeStyles((theme: Theme) => ({
  login: {
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    backgroundColor: theme.palette.primary.main,
    padding: "50px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Login = (): JSX.Element => {
  const classes = useStyles();
  const toast = useContext(ToastContext);
  const store = ReactRedux.useStore<RootState>();
  const dispatch = ReactRedux.useDispatch();

  const isExtensionConnected = async (): Promise<boolean> => {
    const result = await getExtensionStatus();
    dispatch(setExtensionStateAction(result.connected, result.installed, result.governor));

    if (!result.installed) {
      toast.show(INSTALL_EXTENSION_MSG, ToastVariant.ERROR);
      return false;
    }

    if (!result.connected) {
      toast.show(LOGIN_EXTENSION_MSG, ToastVariant.ERROR);
      return false;
    }

    return true;
  };

  const loadProposals = async (): Promise<void> => {
    const governor = store.getState().extension.governor;
    if (!governor) throw new Error("Governor not set in store. This is a bug.");
    const chainProposals = await getProposals(governor);
    dispatch(addProposalsAction(chainProposals));
  };

  const onLogin = async (): Promise<void> => {
    if (await isExtensionConnected()) {
      await loadProposals();
      history.push(DASHBOARD_ROUTE);
    }
  };

  const { handleSubmit, submitting } = useForm({
    onSubmit: onLogin,
  });

  return (
    <Block
      width="100vw"
      height="auto"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={classes.login}
    >
      <CircleImage alt="Logo" icon={icon} dia="200px" iconClasses={classes.icon} />
      <Block marginTop={5} marginBottom={5}>
        <Typography variant="h6">IOV Voting Dashboard</Typography>
      </Block>
      <Form onSubmit={handleSubmit}>
        <Button className={classes.button} type="submit" disabled={submitting}>
          LOG IN
        </Button>
      </Form>
    </Block>
  );
};

export default Login;
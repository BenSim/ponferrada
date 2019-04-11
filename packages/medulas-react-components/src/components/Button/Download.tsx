import { Fab, makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';
import Block from '../Block';
import CircleImage from '../Image/CircleImage';
import Typography from '../Typography';
import download from '../../theme/assets/download.svg';
import theme from '../../theme/utils/mui';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'auto',
    justifyContent: 'left',
    textTransform: 'inherit',
  },
  extended: {
    '&$sizeSmall': {
      padding: 0,
    },
  },
  sizeSmall: {
    height: theme.spacing(4),
  },
  secondary: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
    boxShadow: 'none',
    border: `1px solid #f3f3f3`,
    '&:hover': {
      background: theme.palette.background.default,
    },
  },
}));

export interface DownloadButtonProps {
  readonly onDownload: () => void;
  readonly children?: string;
}

const DownloadCSV = ({
  onDownload,
  children,
}: DownloadButtonProps): JSX.Element => {
  const fabClasses = useStyles();

  return (
    <Fab
      variant="extended"
      size="small"
      color="secondary"
      aria-label="Export as CSV"
      classes={fabClasses}
      onClick={onDownload}
    >
      <CircleImage
        icon={download}
        circleColor={theme.palette.primary.main}
        alt="Download"
        dia={theme.spacing(4)}
        width={theme.spacing(2)}
        height={theme.spacing(2)}
      />
      <Block paddingLeft={2} paddingRight={2}>
        <Typography variant="subtitle2" color="textPrimary">
          {children}
        </Typography>
      </Block>
    </Fab>
  );
};

export default DownloadCSV;

import React, { useEffect, useRef } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { setRefStatistic } from 'modules/TextBookPage/actions';
import {
  Content,
  Explanations,
  LearningWords,
  MarkedBlock,
  MarkedItem,
  Marker,
  Title,
} from './styled';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      // padding: theme.spacing(1),
      padding: 10,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {/* <Typography variant="h6">{children}</Typography> */}
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: 'none',
  },
}))(MuiDialogContent);

type StatisticModalProps = {
  countWords: number;
  correctPageStatistic: number;
  incorrectPageStatistic: number;
  correctSectionStatistic: number;
  incorrectSectionStatistic: number;
};

export const StatisticModal: React.FC<StatisticModalProps> = ({
  countWords,
  correctPageStatistic,
  incorrectPageStatistic,
  correctSectionStatistic,
  incorrectSectionStatistic,
}) => {
  const [open, setOpen] = React.useState(false);
  const refOpenStatistic = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refOpenStatistic.current)
      dispatch(setRefStatistic(refOpenStatistic.current as HTMLButtonElement));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        ref={refOpenStatistic}
        style={{ display: 'none' }}
      >
        Open dialog
      </button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Statistic
        </DialogTitle>

        <DialogContent dividers>
          <Content>
            <>
              <Title>Page</Title>
              <MarkedBlock>
                <MarkedItem length={33} color="#F79928" />
                <MarkedItem length={33} color="#0252CC" />
                <MarkedItem length={33} color="#FA5833" />
              </MarkedBlock>
              <Explanations>
                <LearningWords>
                  <Marker color="#F79928" />
                  <span>Learning words</span>
                  <span>{countWords}</span>
                </LearningWords>
                <LearningWords>
                  <Marker color="#0252CC" />
                  <span>Right answers</span>
                  <span>{correctPageStatistic}</span>
                </LearningWords>
                <LearningWords>
                  <Marker color="#FA5833" />
                  <span>Mistakes</span>
                  <span>{incorrectPageStatistic}</span>
                </LearningWords>
              </Explanations>
            </>

            <>
              <Title>Section</Title>
              <MarkedBlock>
                <MarkedItem length={33} color="#F79928" />
                <MarkedItem length={33} color="#0252CC" />
                <MarkedItem length={33} color="#FA5833" />
              </MarkedBlock>
              <Explanations>
                <LearningWords>
                  <Marker color="#F79928" />
                  <span>Learning words</span>
                  <span>{countWords}</span>
                </LearningWords>
                <LearningWords>
                  <Marker color="#0252CC" />
                  <span>Right answers</span>
                  <span>{correctSectionStatistic}</span>
                </LearningWords>
                <LearningWords>
                  <Marker color="#FA5833" />
                  <span>Mistakes</span>
                  <span>{incorrectSectionStatistic}</span>
                </LearningWords>
              </Explanations>
            </>
          </Content>
        </DialogContent>
      </Dialog>
    </div>
  );
};

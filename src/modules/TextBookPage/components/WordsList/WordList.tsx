import React, { FC } from 'react';
import { Word } from 'types';
import { SERVER_URL } from 'appConstants';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { WordListStyled, WordCard, WordListWrapper } from './styled';
import { NavigationSection } from './components';

type WordListProps = {
  words: Word[];
  changeGroupPage: Function;
};

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export const WordList: FC<WordListProps> = ({ words, changeGroupPage }) => {
  const classes = useStyles();

  return (
    <WordListWrapper>
      <WordListStyled>
        {words.map((word) => (
          <Card className={classes.root} key={word.id}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={`${word.word} - ${word.transcription}`}
              subheader="September 14, 2016"
            />
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`${SERVER_URL}${word.image}`}
                title={word.wordTranslate}
              />
              <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                  {word.textExample}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {word.textExampleTranslate}
                </Typography>

                <Typography variant="body2" color="textPrimary" component="p">
                  {word.textMeaning}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {word.textMeaningTranslate}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Difficult
              </Button>
              <Button size="small" color="primary">
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </WordListStyled>
      <NavigationSection changeGroupPage={changeGroupPage} />
    </WordListWrapper>
  );
};

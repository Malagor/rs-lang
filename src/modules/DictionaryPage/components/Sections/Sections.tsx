import { useTheme } from '@material-ui/core';
import {
  DELETED_SECTION,
  DIFFICULT_SECTION,
  DICTIONARY_TOPICS,
  LEARNING_SECTION,
} from 'appConstants';
import { LEVEL_COLORS } from 'appConstants/colors';
import React from 'react';
import { WordSectionType } from 'types';
import { Marker, Section, SectionsContainer } from './styled';

type SectionsProps = {
  handlers: Array<() => void>;
  group: number;
  activeSection: WordSectionType;
};

export const Sections: React.FC<SectionsProps> = ({
  handlers,
  group,
  activeSection,
}) => {
  const theme = useTheme();

  const sectionsMap = {
    [LEARNING_SECTION]: 0,
    [DIFFICULT_SECTION]: 1,
    [DELETED_SECTION]: 2,
  };

  const dictionarySections = DICTIONARY_TOPICS.map((name, i) => (
    <Section
      key={name}
      onClick={handlers[i]}
      active={i === sectionsMap[activeSection]}
      theme={theme}
    >
      <Marker
        colorGroup={i === sectionsMap[activeSection] ? LEVEL_COLORS[group] : ''}
        theme={theme}
      />
      <div>{name}</div>
    </Section>
  ));

  return (
    <SectionsContainer theme={theme}>{dictionarySections}</SectionsContainer>
  );
};

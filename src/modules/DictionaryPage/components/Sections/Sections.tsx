import { useTheme } from '@material-ui/core';
import { sectionNames } from 'appConstants';
import { LEVEL_COLORS } from 'appConstants/colors';
import React from 'react';
import { WordSectionType } from 'types';
import { Marker, Section, SectionsContainer } from './styled';

type SectionsProps = {
  handlers: Array<() => void>;
  group: number;
  wordSection: WordSectionType;
};

export const Sections: React.FC<SectionsProps> = ({
  handlers,
  group,
  wordSection,
}) => {
  const theme = useTheme();

  const getActiveSection = (i: number) => {
    let activeItem;

    if (i === 0 && wordSection === 'usual') activeItem = 0;

    if (i === 1 && wordSection === 'difficult') activeItem = 1;

    if (i === 2 && wordSection === 'deleted') activeItem = 2;

    return activeItem;
  };

  const dictionarySections = sectionNames.map((name, i) => (
    <Section
      key={name}
      onClick={handlers[i]}
      active={i === getActiveSection(i)}
      theme={theme}
    >
      <Marker
        colorGroup={i === getActiveSection(i) ? LEVEL_COLORS[group] : ''}
        theme={theme}
      />
      <div>{name}</div>
    </Section>
  ));

  return (
    <SectionsContainer theme={theme}>{dictionarySections}</SectionsContainer>
  );
};

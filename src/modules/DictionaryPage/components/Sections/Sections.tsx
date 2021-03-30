import React from 'react';
import { SectionsContainer } from './styled';

const sectionNames = ['Learning words', 'Difficult words', 'Deleted words'];

export const Sections: React.FC = () => {
  const dictionarySections = sectionNames.map((section) => (
    <div>{section}</div>
  ));
  return <SectionsContainer>{dictionarySections}</SectionsContainer>;
};

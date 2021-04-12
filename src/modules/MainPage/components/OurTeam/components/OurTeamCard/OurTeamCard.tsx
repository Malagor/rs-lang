import React, { FC } from 'react';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import { useTheme } from '@material-ui/core';
import {
  Card,
  Photo,
  Content,
  Name,
  Role,
  GitHubLink,
  Paragraph,
} from './styled';

type OurTeamCardProps = {
  name: string;
  role: string;
  description: string;
  photo: string;
  gitHub: string;
  isMobile?: boolean;
};

export const OurTeamCard: FC<OurTeamCardProps> = ({
  name,
  role,
  description,
  photo,
  gitHub,
  isMobile,
}) => {
  const theme = useTheme();

  return (
    <Card theme={theme} isMobile={isMobile}>
      <Photo theme={theme} isMobile={isMobile} image={photo} />
      <Content theme={theme} isMobile={isMobile}>
        <Name>{name}</Name>
        <Role>{role}</Role>
        <Paragraph theme={theme} isMobile={isMobile}>
          {description}
        </Paragraph>
        <GitHubLink href={gitHub} theme={theme}>
          <GitHubIcon />
        </GitHubLink>
      </Content>
    </Card>
  );
};

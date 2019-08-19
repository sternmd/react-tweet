import React from 'react';
import { Icon, Title, Subtitle } from 'bloomer';

const TwitterHeader = () => {
  return (
    <div>
      <Icon isSize='medium' className='fa fa-twitter fa-2x blue' />
      <Title isDisplay='inline-block'>Twitter Stream</Title>
      <Subtitle>Search tweets in real-time!</Subtitle>
    </div>
  );
};

export default TwitterHeader;

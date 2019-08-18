import React from 'react';
import {
  Card,
  CardContent,
  Media,
  MediaLeft,
  MediaContent,
  Image,
  Title,
  Subtitle,
  Content
} from 'bloomer';

const TwitterCard = () => {
  return (
    <Card>
      <CardContent>
        <Media>
          <MediaLeft>
            <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
          </MediaLeft>
          <MediaContent>
            <Title isSize={4}>John Wick</Title>
            <Subtitle isSize={6}>@John Wick</Subtitle>
          </MediaContent>
        </Media>
        <Content>
          People Keep Asking If I’m Back, And I Haven’t Really Had An Answer,
          But Now, Yeah, I’m Thinking I’m Back.
          <br />
          <small>11:09 PM - 30 October 2014</small>
        </Content>
      </CardContent>
    </Card>
  );
};

export default TwitterCard;

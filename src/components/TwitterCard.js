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

class TwitterCard extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <Card>
        <CardContent>
          <Media>
            <MediaLeft>
              <Image isSize='48x48' src={data.user.profile_image_url} />
            </MediaLeft>
            <MediaContent>
              <Title isSize={4}>{data.user.name}</Title>
              <Subtitle isSize={6}>@{data.user.screen_name}</Subtitle>
            </MediaContent>
          </Media>
          <Content>
            {data.text}
            <br />
            <small>{new Date(data.created_at).toLocaleTimeString()}</small>
          </Content>
        </CardContent>
      </Card>
    );
  }
}

export default TwitterCard;

import React from 'react';
import { Button, Card, Divider, InputNumber } from 'antd';

type Props = {
  setBoardSize: (boardSize: number) => void,
  onSizeSubmit: () => void
};

const WelcomeCard = (props: Props) => (
  <Card
    title="Welcome to Word Finder!"
    bordered={false}
    actions={[
      <Button type="primary" onClick={props.onSizeSubmit}>Start Game</Button>
    ]}
    style={{
      width: '30%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <Divider orientation="left">Enter a Board Size (N x N)</Divider>
    <InputNumber
      min={2}
      max={12}
      defaultValue={4}
      onChange={props.setBoardSize}
      style={{
        width: '100%'
      }}
    />
  </Card>
);

export default WelcomeCard;

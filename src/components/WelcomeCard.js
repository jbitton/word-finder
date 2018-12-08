import React from 'react';
import { Button, Card, Divider, InputNumber } from 'antd';

type Props = {
  setBoardSize: (boardSize: number) => void,
  setNumPlayers: (numPlayers: number) => void,
  setNumRounds: (numRounds: number) => void,
  onSizeSubmit: () => void
};

const styles = {
  card: {
    width: '30%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: {
    width: '100%',
  }
}

const WelcomeCard = (props: Props) => (
  <Card
    title="Welcome to Word Finder!"
    bordered={false}
    actions={[
      <Button type="primary" onClick={props.onSizeSubmit}>Start Game</Button>
    ]}
    style={styles.card}
  >
    <Divider orientation="left">Enter a Board Size (N x N)</Divider>
    <InputNumber
      min={2}
      max={12}
      defaultValue={4}
      onChange={props.setBoardSize}
      style={styles.input}
    />
    <Divider orientation="left">Enter the Number of Players (up to 4)</Divider>
    <InputNumber
      min={1}
      max={4}
      defaultValue={2}
      onChange={props.setNumPlayers}
      style={styles.input}
    />
    <Divider orientation="left">Enter the Number of Rounds (up to 100)</Divider>
    <InputNumber
      min={1}
      max={100}
      defaultValue={5}
      onChange={props.setNumRounds}
      style={styles.input}
    />
  </Card>
);

export default WelcomeCard;

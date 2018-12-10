import React from 'react';
import { Button, Card, Divider, InputNumber, Radio } from 'antd';

const RadioGroup = Radio.Group;

type Props = {
  addBot: boolean,
  setBoardSize: (boardSize: number) => void,
  setNumPlayers: (numPlayers: number) => void,
  setNumRounds: (numRounds: number) => void,
  onBotChange: (event: Event) => void,
  onSizeSubmit: () => void
};

const styles = {
  card: {
    width: '30%',
    minWidth: '353px',
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
    <Divider orientation="left">Add a Bot to Play Against?</Divider>
    <RadioGroup onChange={props.onBotChange} value={props.addBot}>
      <Radio value={true}>Yes</Radio>
      <Radio value={false}>No</Radio>
    </RadioGroup>
  </Card>
);

export default WelcomeCard;

import React from 'react';
import { List, Card, Divider } from 'antd';

type Player = {
  name: string,
  score: number
};

type Props = {
  players: Array<Player>,
  numRounds: number,
  roundNumber: number,
  turnIdx: number,
};

const styles = {
  card: {
    height: '412px',
    width: '200px',
    position: 'fixed',
    top: '50%',
    left: '20%',
    transform: 'translate(-50%, -50%)',
  },
  list: {
    overflowY: 'scroll',
    maxHeight: '231px'
  }
};

const ScoreTable = (props: Props) => (
  <Card
    title="Scores"
    bordered={false}
    style={styles.card}
  >
    <Divider orientation="left">
      Round {props.roundNumber}/{props.numRounds}
    </Divider>
    <List
      header={<strong>{props.players[props.turnIdx].name}'s Turn</strong>}
      footer={null}
      bordered
      dataSource={props.players.map(player => `${player.name}: ${player.score}`)}
      renderItem={item => (<List.Item>{item}</List.Item>)}
      style={styles.list}
    />
  </Card>
);

export default ScoreTable;

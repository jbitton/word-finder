import React from 'react';
import { Button, Card, Divider } from 'antd';

type Props = {
  mode: 'action' | 'swap' | 'word',
  selectedLetters: Array<Array<number>>,
  onControlSelected: (command: string) => void,
  onSkipWord: () => void,
  performAction: (currentAction: string) => void,
};

const styles = {
  card: {
    width: '200px',
    position: 'fixed',
    top: '50%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    marginBottom: '10px',
    width: '150px',
  }
};

const Controls = (props: Props) => (
  <Card
    title="Actions"
    bordered={false}
    style={styles.card}
  >
    <Divider orientation="left">
      {props.mode === 'action'
        ? 'Select an Action'
        : props.mode === 'swap'
          ? 'Select a Letter'
          : 'Select a Word'}
    </Divider>
    <Button
      type="primary"
      icon="arrow-up"
      disabled={props.mode !== 'action'}
      onClick={() => props.performAction('up')}
      style={styles.button}
    >
      Rotate Up
    </Button>
    <Button
      type="primary"
      icon="arrow-down"
      disabled={props.mode !== 'action'}
      onClick={() => props.performAction('down')}
      style={styles.button}
    >
      Rotate Down
    </Button>
    <Button
      type="primary"
      icon="arrow-left"
      disabled={props.mode !== 'action'}
      onClick={() => props.performAction('left')}
      style={styles.button}
    >
      Rotate Left
    </Button>
    <Button
      type="primary"
      icon="arrow-right"
      disabled={props.mode !== 'action'}
      onClick={() => props.performAction('right')}
      style={styles.button}
    >
      Rotate Right
    </Button>
    <Button
      type="primary"
      icon="swap"
      disabled={props.mode !== 'action' && props.mode !== 'swap'}
      onClick={() => props.performAction('swap')}
      style={styles.button}
    >
      Swap Letter
    </Button>
    <Button
      type="primary"
      icon="fast-forward"
      disabled={props.mode !== 'word'}
      onClick={() => props.onSkipWord()}
      style={styles.button}
    >
      Skip Word
    </Button>
  </Card>
);

export default Controls;

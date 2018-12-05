import React from 'react';
import { Button, Card, Divider } from 'antd';

type Props = {
  mode: 'action' | 'modal' | 'word',
  onControlSelected: (command: string) => void,
  onSkipWord: () => void
};

const Controls = (props: Props) => (
  <Card
    title="Actions"
    bordered={false}
    style={{
      width: '200px',
      position: 'fixed',
      top: '50%',
      left: '20%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <Divider orientation="left">
      {props.mode === 'action' ? 'Select an Action' : 'Select a Word'}
    </Divider>
    <Button
      type="primary"
      icon="arrow-up"
      disabled={props.mode !== 'action'}
      onClick={() => props.onControlSelected('up')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Up
    </Button>
    <Button
      type="primary"
      icon="arrow-down"
      disabled={props.mode !== 'action'}
      onClick={() => props.onControlSelected('down')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Down
    </Button>
    <Button
      type="primary"
      icon="arrow-left"
      disabled={props.mode !== 'action'}
      onClick={() => props.onControlSelected('left')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Left
    </Button>
    <Button
      type="primary"
      icon="arrow-right"
      disabled={props.mode !== 'action'}
      onClick={() => props.onControlSelected('right')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Right
    </Button>
    <Button
      type="primary"
      icon="swap"
      disabled={props.mode !== 'action'}
      onClick={() => props.onControlSelected('swap')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Swap Letter
    </Button>
    <Button
      type="primary"
      icon="fast-forward"
      disabled={props.mode !== 'word'}
      onClick={() => props.onSkipWord()}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Skip Word
    </Button>
  </Card>
);

export default Controls;

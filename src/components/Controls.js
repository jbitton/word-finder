import React from 'react';
import { Button, Card, Divider } from 'antd';

type Props = {
  onControlSelected: (command: string) => void
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
    <Divider orientation="left">Select an Action</Divider>
    <Button
      type="primary"
      icon="arrow-up"
      onClick={() => props.onControlSelected('up')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Up
    </Button>
    <Button
      type="primary"
      icon="arrow-down"
      onClick={() => props.onControlSelected('down')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Down
    </Button>
    <Button
      type="primary"
      icon="arrow-left"
      onClick={() => props.onControlSelected('left')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Left
    </Button>
    <Button
      type="primary"
      icon="arrow-right"
      onClick={() => props.onControlSelected('right')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Rotate Right
    </Button>
    <Button
      type="primary"
      icon="swap"
      onClick={() => props.onControlSelected('swap')}
      style={{marginBottom: '10px', width: '150px'}}
    >
      Swap Letter
    </Button>
  </Card>
);

export default Controls;

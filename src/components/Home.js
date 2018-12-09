// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import Game from './Game';
import AppBar from './AppBar';
import WelcomeCard from './WelcomeCard';

import type { configStateType } from '../reducers/types';

const { Content, Footer } = Layout;

const styles = {
  layout: {
    height: '100vh',
  },
  content: {
    padding: '0 50px',
    marginTop: 64,
  },
  footer: {
    textAlign: 'center',
  }
};

type Props = {
  setNewick: (fileName: string) => void,
  setPBS: (fileName: string) => void,
  setGeneToGo: (fileName: string) => void,
  setGoAnnotation: (fileName: string) => void,
  setSpecies: (fileName: string) => void,
  setGeneInfo: (fileName: string) => void,
  setProteinAlignments: (fileName: string) => void,
  setTermType: (termType: string) => void,
  setMeasureType: (measureType: string) => void,
  config: configStateType
};

type State = {
  boardSize: number,
  numPlayers: number,
  numRounds: number
}

export default class Home extends Component<Props, State> {
  props: Props;

  state: State = {
    boardSize: 4,
    numPlayers: 2,
    numRounds: 5,
    isBoardSizeSet: false,
  }

  constructor() {
    super();
    this.setBoardSize = this.setBoardSize.bind(this);
    this.setNumPlayers = this.setNumPlayers.bind(this);
    this.setNumRounds = this.setNumRounds.bind(this);
    this.onSizeSubmit = this.onSizeSubmit.bind(this);
  }

  setBoardSize(boardSize: number) {
    this.setState({ boardSize });
  }

  setNumPlayers(numPlayers: number) {
    this.setState({ numPlayers });
  }

  setNumRounds(numRounds: number) {
    this.setState({ numRounds });
  }

  onSizeSubmit() {
    this.setState({ isBoardSizeSet: true });
  }

  render() {
    const { boardSize, numPlayers, numRounds, isBoardSizeSet } = this.state;
    return (
      <div>
        <Layout style={styles.layout}>
          <AppBar />
          <Content style={styles.content}>
            {isBoardSizeSet
              ? <Game
                  boardSize={boardSize}
                  numPlayers={numPlayers}
                  numRounds={numRounds}
                />
              : <WelcomeCard
                  setBoardSize={this.setBoardSize}
                  setNumPlayers={this.setNumPlayers}
                  setNumRounds={this.setNumRounds}
                  onSizeSubmit={this.onSizeSubmit}
                />}
          </Content>
          <Footer style={styles.footer}>
            Word Finder ©2018 Created by Joanna Bitton
          </Footer>
        </Layout>
      </div>
    );
  }
}

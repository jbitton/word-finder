// @flow
import React, { Component } from 'react';
import { Layout } from 'antd';
import Game from './Game';
import AppBar from './AppBar';
import WelcomeCard from './WelcomeCard';

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

type Props = {};

type State = {
  boardSize: number,
  numPlayers: number,
  numRounds: number,
  addBot: boolean,
  areVarsSet: boolean
}

export default class Home extends Component<Props, State> {
  props: Props;

  state: State = {
    boardSize: 4,
    numPlayers: 2,
    numRounds: 5,
    addBot: true,
    areVarsSet: false,
  }

  constructor() {
    super();
    this.setBoardSize = this.setBoardSize.bind(this);
    this.setNumPlayers = this.setNumPlayers.bind(this);
    this.setNumRounds = this.setNumRounds.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.returnToHome = this.returnToHome.bind(this);
    this.onBotChange = this.onBotChange.bind(this);
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

  onSubmit() {
    this.setState({ areVarsSet: true });
  }

  onBotChange(event: Event) {
    this.setState({ addBot: event.target.value });
  }

  returnToHome() {
    this.setState({
      boardSize: 4,
      numPlayers: 2,
      numRounds: 5,
      addBot: true,
      areVarsSet: false
    });
  }

  render() {
    const { boardSize, numPlayers, numRounds, addBot, areVarsSet } = this.state;
    return (
      <div>
        <Layout style={styles.layout}>
          <AppBar />
          <Content style={styles.content}>
            {areVarsSet
              ? <Game
                  boardSize={boardSize}
                  numPlayers={numPlayers}
                  numRounds={numRounds}
                  returnToHome={this.returnToHome}
                />
              : <WelcomeCard
                  addBot={addBot}
                  setBoardSize={this.setBoardSize}
                  setNumPlayers={this.setNumPlayers}
                  setNumRounds={this.setNumRounds}
                  onSizeSubmit={this.onSubmit}
                  onBotChange={this.onBotChange}
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

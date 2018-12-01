// @flow
import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Game from './Game';
import AppBar from './AppBar';

import type { configStateType } from '../reducers/types';

const { Content, Footer } = Layout;

const styles = {
  content: {
    padding: '0 50px',
    marginTop: 64
  },
  breadcrumb: {
    margin: '16px 0'
  },
  footer: {
    textAlign: 'center'
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

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Layout style={{height: '100vh'}}>
          <AppBar />
          <Content style={styles.content}>
            <Breadcrumb style={styles.breadcrumb}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Setup</Breadcrumb.Item>
            </Breadcrumb>
            <Game/>
          </Content>
          <Footer style={styles.footer}>
            Word Finder ©2018 Created by Joanna Bitton
          </Footer>
        </Layout>
      </div>
    );
  }
}

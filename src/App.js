import React, { Component } from 'react';
import { Spin, Layout } from 'antd';
import 'antd/dist/antd.css';

import Header from './Header';

import './index';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    data: {},
    questions: null,
    selectedValue: null,
    searchResults: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const res = await fetch('./data.txt');
    const textRow = await res.text();
    const text = textRow.toLowerCase();

    const questions = text.match(/.+(?=\nОтвет:\n)/gim).map(q => q.trim());

    let startFromIndex = 0;
    const data = questions.reduce((data, question, i) => {
      const nextQuestion = questions[i + 1] || '';
      const questionIndex = text.indexOf(question, startFromIndex) + question.length;
      const nextQuestionIndex = text.indexOf(nextQuestion, startFromIndex);

      data[question] = text
        .substring(questionIndex, nextQuestionIndex + 1 ? nextQuestionIndex : text.length)
        .split(/\nОтвет:\n/gi)[1]
        .trim();

      return data;
    }, {});

    this.setState({ data, questions });
  }

  onSelect = selectedValue => {
    this.setState({ selectedValue });
  };

  render() {
    const text = this.state.data[this.state.selectedValue] || '';

    return (
      <Layout className="layout">
        <Header questions={this.state.questions} onSelect={this.onSelect} />

        <Content className="content">
          <div className="answer">
            <h3>{this.state.selectedValue}</h3>
            <p dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Created by <a href="https://github.com/z4o4z">z4o4z</a>
          <br />
          2017
        </Footer>

        {!this.state.questions && <Spin className="loader" spinning size="large" />}
      </Layout>
    );
  }
}

export default App;

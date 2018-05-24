import React, { Component } from 'react';
import { Icon, Layout, Button, Input, AutoComplete } from 'antd';
import 'antd/dist/antd.css';

import './index';

export default class Header extends Component {
  state = {
    value: '',
    searchResults: [],
  };

  onSearch = (value = '') => {
    const { questions } = this.props;
    let searchResults = [];

    if (!value || value.length < 3) {
      this.setState({ value, searchResults });
      return;
    }

    const qr = value.toLowerCase();

    searchResults = questions.filter(q => q.includes(qr));

    this.setState({ value, searchResults });
  };

  onSelect = value => {
    this.setState({ value });
    this.props.onSelect(value);
  };

  onClear = () => {
    this.setState({ value: '', searchResults: [] });
  };

  render() {
    return (
      <Layout.Header className="header">
        <AutoComplete
          size="large"
          value={this.state.value}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          autoFocus
          className="global-search"
          placeholder="Введите вопрос"
          dataSource={this.state.searchResults}
        >
          <Input
            suffix={
              <Button onClick={this.onClear} className="search-btn" size="large" type="primary">
                <Icon type="close" />
              </Button>
            }
          />
        </AutoComplete>
      </Layout.Header>
    );
  }
}

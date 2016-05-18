'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
 } from 'react-native';

export default class Feed extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentWillMount() {
    this.fetchFeed();
  }

  fetchFeed = () => {
    require('./AuthService').getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/'
          + authInfo.user.login
          + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((response) => response.json())
      .then((responseData) => {
        var feedItems =
            responseData.filter((ev) => ev.type == 'PushEvent');
            console.log(this.state.dataSource.cloneWithRows(feedItems), feedItems);
            console.log(feedItems[0].actor.login);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          showProgress: false
        });
      })
      .catch(function(err) {
        console.log(err);
      })
    });
  };
  renderRow = (rowData, sectionId, rowId) => {
    return (<Text style={{
      color: '#333',
      backgroundColor: '#fff',
      alignSelf: 'center'
    }}>
    {typeof rowData == 'object' ?
      rowData.actor.login : rowData
    }
    </Text>
    );
  }
  render() {
    if (this.state.showProgress) {
      return (
        <View style={{
            flex: 1,
            justifyContent: 'center'
          }}>
          <ActivityIndicatorIOS
            size="large"
            animating={true} />
        </View>
      )
    }
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start'
          }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
        </View>
      );
  }
}

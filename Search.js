import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import authService from './AuthService';
import SearchResults from './SearchResults';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSearchPressed = () => {
    console.log('dhjkshf jdfjkhas');
    this.props.navigator.push({
      component: SearchResults,
      title: 'Results',
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
    console.log(`Attempting to search for ${this.state.searchQuery}`);
  };

  render() {

    return (
      <View style={styles.container}>
        <TextInput
        onChangeText={(text) => {this.setState({searchQuery: text})}}
          style={styles.input}
          placeholder="Search Query"
          >
        </TextInput>
        <TouchableHighlight
          onPress={this.onSearchPressed}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});

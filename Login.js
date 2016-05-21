import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
ActivityIndicatorIOS } from 'react-native';

import buffer from 'buffer';
import authService from './AuthService';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    };
  }
  onLogginPressed() {
    this.setState({showProgress: true});
    authService.login({
      username: this.state.username,
      password: this.state.password
    }, (results)=> {
      this.setState(Object.assign({
        showProgress: false
      }, results));

      if(results.success && this.props.onLogin) {
        this.props.onLogin();
      }
    });
  }

  render() {
    var errorCtrl = <View />;
    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>;
    }
    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue
      </Text>;
    }
    return (
      <View style={styles.container}>
        <Image style={styles.logo}
        source={require('image!Octocat')} >
        </Image>
        <Text style={styles.heading}>
          Github browser
        </Text>
        <TextInput
          onChangeText={(text) => {this.setState({username: text})}}
          style={styles.input}
          placeholder="Github username">
        </TextInput>
        <TextInput
          onChangeText={(text) => {this.setState({password: text})}}
          style={styles.input}
          placeholder="Github password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight
          onPress={this.onLogginPressed.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicatorIOS
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
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
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});

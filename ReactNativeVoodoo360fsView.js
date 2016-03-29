'use strict'
let React = require('react-native')
let {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ProgressBarAndroid,
  TouchableOpacity
} = React

import RCTVoodoo360 from 'react-native-voodoo360'

let ReactNativeVoodoo360fsView = React.createClass({
  render() {
    let overlay
    let errMsgView
    let loadingCountView
    if (!this.props.allLoaded){
      if (this.props.errMsg){
        errMsgView = 
          <View style={styles.errMsgView}>
            <Text>{this.props.errMsg}</Text>
            <TouchableOpacity style={styles.retry} onPress={this.props.onRetryDownloadFiles}>
              <Text>Retry</Text>
            </TouchableOpacity>
          </View>
      }

      if (this.props.action == 'Download'){
        loadingCountView = 
          <Text>{`${this.props.action} ${this.props.index + 1} / ${this.props.imageURIs.length}`}</Text>
      }

      overlay = 
        <View style={styles.progressContainer}>
          <View style={styles.progressWrapper}>
            <ProgressBarAndroid />
            {loadingCountView}
            {errMsgView}
          </View>
        </View>
    }
    return (
      <View style={styles.container}>
        <RCTVoodoo360
          sources={this.props.images}
          style={styles.voodoo360}
          onIndexChange={this.props.onVoodoo360IndexChange}
          />
        <Text style={styles.voodoo360IndexText}>{`${this.props.voodoo360Index + 1} / ${this.props.images.length}`}</Text>
        {overlay}
      </View>
    );
  }
})

let SCREEN_HEIGHT = Dimensions.get('window').height
let SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  progressWrapper: {
    width: SCREEN_WIDTH * 0.8,
    height: 100,
    alignItems: 'center'
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
    position: 'absolute'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  retry: {
    height: 25,
    alignItems: 'center',
    width: 75
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  errMsgView: {
    alignItems: 'center'
  },
  voodoo360: {
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
    position: 'absolute'
  }, 
  voodoo360IndexText: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    textAlign: 'center'
  }
})

module.exports = ReactNativeVoodoo360fsView
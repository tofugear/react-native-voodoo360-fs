/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ProgressBarAndroid,
  TouchableOpacity
} from 'react-native';

import RCTVoodoo360 from 'react-native-voodoo360';
var RNFS = require('react-native-fs');

const IMGS = [
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img01.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img02.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img03.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img04.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img05.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img06.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img07.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img08.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img09.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img10.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img11.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img12.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img13.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img14.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img15.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img16.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img17.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img18.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img19.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img20.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img21.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img22.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img23.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img24.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img25.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img26.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img27.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img28.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img29.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img30.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img31.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img32.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img33.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img34.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img35.jpg",
"https://omnitech-demo-static360.azureedge.net/360/CFWB5005-B_SLB/Lv2/img36.jpg"
];
let SCREEN_HEIGHT = Dimensions.get('window').height
let SCREEN_WIDTH = Dimensions.get('window').width

let voodoo360fs = React.createClass({
  getInitialState(){
    return {
      index: 0,
      images: [],
      allLoaded: false,
      errMsg: null
    }
  },

  getFilename(index){
    return `/voodoo360_${index}.jpg`
  },

  deleteCurrentFiles(index, cb){
    if (index >= IMGS.length){
      cb()
      return
    }
    this.setState({index: index})
    var path = RNFS.DocumentDirectoryPath + this.getFilename(index);

    RNFS.unlink(path)
      // spread is a method offered by bluebird to allow for more than a
      // single return value of a promise. If you use `then`, you will receive
      // the values inside of an array
      .spread((success, path) => {
        console.log('FILE DELETED', success, path)
        this.deleteCurrentFiles(index + 1, cb)
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch((err) => {
        console.log(err.message)
        if (err.message == 'File does not exist'){
          this.deleteCurrentFiles(index + 1, cb)
        }
    });
  },

  retryDownloadFiles(){
    this.setState({errMsg: null})
    this.startDownloadFiles(this.state.index)
  },

  startDownloadFiles(index){
    this.downloadFiles(index, () => {
        this.setState({allLoaded: true})
    })
  },

  downloadFiles(index, cb){
    if (index >= IMGS.length){
      cb()
      return
    }
    this.setState({index: index})
    let filepath = RNFS.DocumentDirectoryPath + this.getFilename(index)
    console.log("filepath", filepath)
    RNFS.downloadFile(IMGS[index], filepath, 
      (res) => {
        console.log("begin", res)
      }, (res) => {
        console.log("process", res)
      }).then(res => {
        console.log("success", res)
        let images = this.state.images.slice(0)
        images.push(filepath)
        this.setState({images: images})
        this.downloadFiles(index + 1, cb)
    }).catch((err) => {
      console.log("err", err)
      this.setState({errMsg: "Something wrong."})
    });
  },

  componentDidMount(){
    this.deleteCurrentFiles(0, () => {
      this.startDownloadFiles(0)
    })
  },

  render() {
    let overlay
    let errMsgView
    if (!this.state.allLoaded){
      if (this.state.errMsg){
        errMsgView = 
          <View style={styles.errMsgView}>
            <Text>{this.state.errMsg}</Text>
            <TouchableOpacity style={styles.retry} onPress={this.retryDownloadFiles}>
              <Text>Retry</Text>
            </TouchableOpacity>
          </View>
      }
      overlay = 
        <View style={styles.progressContainer}>
          <View style={styles.progressWrapper}>
            <ProgressBarAndroid />
            <Text>{`${this.state.index + 1} / ${IMGS.length}`}</Text>
            {errMsgView}
          </View>
        </View>
    }
    return (
      <View style={styles.container}>
        <RCTVoodoo360
          sources={this.state.images}
          style={styles.voodoo360}
          />
        {overlay}
      </View>
    );
  }
})

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
  }
});

AppRegistry.registerComponent('voodoo360fs', () => voodoo360fs);

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
var asyncFunc = require('async')

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

let Voodoo360fs = React.createClass({
  getInitialState(){
    return {
      index: 0,
      images: [],
      allLoaded: false,
      errMsg: null,
      action: null,
      voodoo360Index: 0
    }
  },

  getBaseFolderName(){
    return `${RNFS.DocumentDirectoryPath}/voodoo_360`
  },

  getFolderName(){
    return `${this.getBaseFolderName()}/CFWB5005-B_SLB`
  },

  getFilename(index){
    return `${this.getFolderName()}/${index}.jpg`
  },

  deleteCurrentFiles(index, cb){
    if (index >= IMGS.length){
      cb()
      return
    }
    this.setState({index: index})
    var path =  this.getFilename(index);

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

  imagesLoaded(){
    this.setState({allLoaded: true})
  },

  retryDownloadFiles(){
    this.setState({errMsg: null})
    this.startDownloadFiles(this.state.index)
  },

  startDownloadFiles(index){
    this.downloadFiles(index, () => {
        this.imagesLoaded()
    })
  },

  downloadFiles(index, cb){
    if (index >= IMGS.length){
      cb()
      return
    }
    this.setState({index: index})
    let filepath = this.getFilename(index)

    let successFunc = () => {
      let images = this.state.images.slice(0)
      images.push(filepath)
      this.setState({images: images})
      this.downloadFiles(index + 1, cb)
    }

    RNFS.exists(filepath).then(result => {
      if (result){
        console.log("file exist, skip file")
        successFunc()
      } else {
        console.log("file not exist, download file")
        RNFS.downloadFile(IMGS[index], filepath, 
          (res) => {
            console.log("begin", res)
          }, (res) => {
            console.log("process", res)
          }).then(res => {
            successFunc()
        }).catch((err) => {
          console.log("err", err)
          this.setState({errMsg: "Something wrong."})
        });
      }
    })
  },

  componentDidMount(){
    asyncFunc.waterfall([
      // create base folder
      (cb) => {
        RNFS.mkdir(this.getBaseFolderName()).then(result => {
          console.log("mkdir", result[0])
          console.log("mkdir", result[1])
          if (result[0]){
            cb(null)
          } else {
            cb("Cannot create base folder")
          }
        })
      }, 
      // check item folder exist
      (cb) => {
        RNFS.exists(this.getFolderName()).then(result => {
          cb(null, result)
        })
      },
      // check folders number >= 3
      (folderExist, cb) => {
        // if (folderExist)
        if (folderExist){ // debug
          cb(null, null)
        } else {
          RNFS.readDir(this.getBaseFolderName()).then(result => {
            console.log("readDir", result)
            if (result.length >=3){
            // if (true){ // debug
              cb(null, result[0].path)
            } else {
              cb(null, null)
            }
          })
        }
      },
      // delete folder
      (path, cb) => {
        if (path){
          RNFS.unlink(path).then(result => {
            console.log("unline", result)
            cb(null)
          })
        } else {
          cb(null)
        }
      },
      // create folder
      (cb) => {
        RNFS.mkdir(this.getFolderName()).then(result => {
          console.log("create folder", result)
          if (result[0]){
            cb(null)
          } else {
            cb("Cannot create product folder")
          }
        })
      },
      // check images exist
      (cb) => {
        RNFS.readDir(this.getFolderName()).then(result => {
          console.log("files", result)
          if (result.length == 36){
            let images = result.map((file) => {
              return file.path
            })
            this.setState({images: images})
            cb(null, false)
          } else {
            cb(null, true)
          }
        })
      },
    ], (err, result) => {
      if (err){
        console.log("Init images fail", err)
      } else {
        console.log("Done", result)
        // download files
        if(result){
          this.setState({action: 'Download'})
          this.startDownloadFiles(0)
        } else {
          this.imagesLoaded()
        }
      }
    })
  },

  handleVoodoo360IndexChange(index){
    console.log("handleVoodoo360IndexChange", index)
    this.setState({voodoo360Index: index})
  },

  render() {
    let overlay
    let errMsgView
    let loadingCountView
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

      if (this.state.action == 'Download'){
        loadingCountView = 
          <Text>{`${this.state.action} ${this.state.index + 1} / ${IMGS.length}`}</Text>
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
          sources={this.state.images}
          style={styles.voodoo360}
          onIndexChange={this.handleVoodoo360IndexChange}
          />
        <Text style={styles.voodoo360IndexText}>{`${this.state.voodoo360Index + 1} / ${this.state.images.length}`}</Text>
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
  }, 
  voodoo360IndexText: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    textAlign: 'center'
  }
});

module.exports = Voodoo360fs
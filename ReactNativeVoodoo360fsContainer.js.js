'use strict';

let React = require('react-native')
let RNFS = require('react-native-fs')
let asyncFunc = require('async')
let ReactNativeVoodoo360fsView = require('./ReactNativeVoodoo360fsView.js')

let ReactNativeVoodoo360fsContainer = React.createClass({
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
    return `${this.getBaseFolderName()}/${this.props.folderName}`
  },

  getFilename(index){
    return `${this.getFolderName()}/${index}.jpg`
  },

  deleteCurrentFiles(index, cb){
    if (index >= this.props.imageURIs.length){
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

  handleRetryDownloadFiles(){
    this.setState({errMsg: null})
    this.startDownloadFiles(this.state.index)
  },

  startDownloadFiles(index){
    this.downloadFiles(index, () => {
        this.imagesLoaded()
    })
  },

  downloadFiles(index, cb){
    if (index >= this.props.imageURIs.length){
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
        RNFS.downloadFile(this.props.imageURIs[index], filepath, 
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
          console.log("Create Base Folder", result[0])
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
            console.log("Delete folder", result)
            cb(null)
          })
        } else {
          cb(null)
        }
      },
      // create folder
      (cb) => {
        RNFS.mkdir(this.getFolderName()).then(result => {
          console.log("Create folder", result)
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
    this.setState({voodoo360Index: index})
    if (this.props.onVoodoo360IndexChange){
      this.props.onVoodoo360IndexChange(index)
    }
  },

  render(){
    return (
      <ReactNativeVoodoo360fsView
        {...this.state}
        resizeMode={this.props.resizeMode}
        downloadText={this.props.downloadText}
        imageURIs={this.props.imageURIs}
        onRetryDownloadFiles={this.handleRetryDownloadFiles}
        onVoodoo360IndexChange={this.handleVoodoo360IndexChange}
        />
    )
  }
})

module.exports = ReactNativeVoodoo360fsContainer
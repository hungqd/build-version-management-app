import React from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, Linking, Picker, SafeAreaView, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { NavigationHeader } from '../../components/Navigation'
import { Images, LayoutUtils } from '../../utils'
import { ProjectBannerCard, ProjectDetailCard } from '../../components/Card'
import { VersionListItem } from '../../components/ListItem'

import injectReducer from '../../utils/injectReducer'
import injectSaga from '../../utils/injectSaga'
import reducer from './reducers'
import saga from './saga'

import { getVersionsRequest } from './actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141e29',
  },
  verionList: {
    // padding: 10
  },
  contentPadding: {
    flex: 0.9,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  content: {
    flex: 0.9,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    borderBottomColor: '#3D5AFE',
    borderBottomWidth: 1,
    // opacity: 0.09,
    // backgroundColor:'rgba(255,0,0,0.5)',
    // backgroundColor: '#3D5AFE',
    // borderStyle: 'dashed',
  },
});

const marginTop = LayoutUtils.getExtraTop()

class VersionListScreenClass extends React.Component {

  constructor(props) {
    super(props);
    this.props.getVersions(this.props.navigation.getParam('projectId', -1), 1);
  }

  _download(item) {
    Linking.canOpenURL('https://s3.us-east-2.amazonaws.com/drone-learning-s3/ROOFER.plist').then(supported => {
      if (supported) {
        Linking.openURL('itms-services://?action=download-manifest&amp;url=https://s3.us-east-2.amazonaws.com/drone-learning-s3/ROOFER.plist');
      } else {
        console.log('Can open link', item.link);
      }
    });
  }

  _renderVersionListItem(item) {
    return (
      <VersionListItem
        item={item}
        icon="people"
        onDownload={ () => this._download(item) } />
    );
  }

  _renderVersionList() {
    return (
      <FlatList style={styles.verionList}
        data={this.props.project.versions}
        keyExtractor={(item, index) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => this._renderVersionListItem(item)} />
    );
  }

  render() {
    let content;

    if (this.props.loading) {
      content = <ActivityIndicator style={styles.container} size="large" color="#FFFFFF" />
    } else {
      content = this._renderVersionList()
    }

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(7,46,89,0.8)', 'transparent']}
          start={[0, 0]}
          end={[1, 1]}
          location={[0.25, 0.6, 1]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
        <View
          style={styles.toolbarBackground}
          // source={Images.projectDetailBanner}
        />
        <NavigationHeader
          style={{ marginTop: marginTop + 20 }}
          headerItem={{
            title: `Versions`,
            icon: null,
            button: Images.closeButton
          }}
          action={() => this.props.navigation.goBack()}
          rightView={{
            rightViewIcon: Images.closeButton,
            rightViewAction: this.goBack,
            rightViewTitle: '4'
          }}
        />
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <ProjectDetailCard text="PROJECT A" icon="compare-arrows" number="5"/>
            {content}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.versions.loading,
    type: state.versions.type,
    project: state.versions.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  getVersions: (projectId, type) => dispatch(getVersionsRequest(projectId, type)),
})

const withReducer = injectReducer({ key: 'versions', reducer })
const withSaga = injectSaga({ key: 'versions', saga })
const withConnect = connect(mapStateToProps, mapDispatchToProps)
const VersionListScreen = compose(withReducer, withSaga, withConnect)(VersionListScreenClass)

export { VersionListScreen }

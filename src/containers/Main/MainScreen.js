import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  StatusBar,
  SafeAreaView,
} from 'react-native'
import { BottomNavigation } from 'react-native-material-ui'
import { LinearGradient } from 'expo'

import { NavigationHeader } from '../../components/Navigation'
import { Images, LayoutUtils } from '../../utils'
import { H1Text } from '../../components/Text'
import { ProjectCard } from '../../components/Card'
import { HorizontalList } from '../../components/ListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141e29',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  content: {
    flex: 0.9,
    flexDirection: 'column',
  },
});

const stylesBottomNavigation = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#161F47',
  },
})

const marginTop = LayoutUtils.getExtraTop()

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
    this.state = {
      active: `dashboard`
    }
  }

  _bootstrapAsync = async() => {
    const userToken = await AsyncStorage.removeItem('userToken');
  }

  render() {
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
        <StatusBar barStyle='light-content' />
        <NavigationHeader
          style={{ marginTop: marginTop + 20 }}
          headerItem={{
            title: `Dashboard`,
            icon: null,
            button: Images.closeButton
          }}
          action={this.goBack}
        />
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <H1Text>Welcome,</H1Text>
            <H1Text>to Maverapp</H1Text>
            <HorizontalList title="Project" number="4">
              <ProjectCard text="SURVEY" icon="compare-arrows" number="5"/>
              <ProjectCard text="ROOFER" icon="details" number="4"/>
              <ProjectCard text="REFORM" icon="polymer" number="10"/>
              <ProjectCard text="DATING CALLING" icon="favorite-border" number="15"/>
            </HorizontalList>
            <HorizontalList title="Device" number="5">
              <ProjectCard text="iPhone 4" icon="compare-arrows" number="5"/>
              <ProjectCard text="iPhone 5" icon="details" number="4"/>
              <ProjectCard text="iPhone X" icon="polymer" number="10"/>
              <ProjectCard text="Samsung S9" icon="favorite-border" number="15"/>
            </HorizontalList>
          </View>
        </SafeAreaView>
        <BottomNavigation active={this.state.active} hidden={false} style={stylesBottomNavigation}>
          <BottomNavigation.Action
              key="dashboard"
              icon="developer-board"
              label="Dashboard"
              onPress={() => this.setState({ active: 'dashboard' })}
          />
          <BottomNavigation.Action
              key="project"
              icon="developer-mode"
              label="Project"
              onPress={() => this.setState({ active: 'project' })}
          />
          <BottomNavigation.Action
              key="device"
              icon="phonelink-setup"
              label="Device"
              onPress={() => this.setState({ active: 'device' })}
          />
          <BottomNavigation.Action
              key="settings"
              icon="more-horiz"
              label="Settings"
              onPress={() => this.setState({ active: 'settings' })}
          />
        </BottomNavigation>
      </View>
    )
  }
}

export { MainScreen }

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import {
  transformOrigin,
  onGestureEvent,
  withTimingTransition,
} from 'react-native-redash';
import Animated, {
  cond,
  Easing,
  eq,
  interpolate,
  set,
  useCode,
} from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

const VIEW_HEIGHT = height;
const VIEW_WIDTH = width;

export default function GuillotineMenu() {
  const startRotation = useRef(new Animated.Value(0)).current;
  const rotationAnimation = withTimingTransition(startRotation, {
    duration: 500,
    easing: Easing.bounce,
  });

  const gestureState = useRef(new Animated.Value(State.UNDETERMINED)).current;
  const gestureHandler = onGestureEvent({
    state: gestureState,
  });

  useCode(() =>
    cond(eq(gestureState, State.END), [
      cond(eq(startRotation, 0), set(startRotation, 1), set(startRotation, 0)),
    ])
  );

  const rotateZ = interpolate(rotationAnimation, {
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const rotateButton = interpolate(rotationAnimation, {
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const opacity = interpolate(rotationAnimation, {
    inputRange: [0, 0.5, 0.6, 1],
    outputRange: [1, 1 , 0,0],
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          width,
          height: 30,
          backgroundColor: '#454545',
          position: 'absolute',
          top: 0,
        }}
      />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 30,
            left: 20,
            zIndex: 1,
            transform: [{ rotateZ: rotateButton }],
          }}
        >
          <FontAwesome name="bars" size={25} color="#fff" />
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={{
          width: VIEW_WIDTH,
          height: VIEW_HEIGHT,
          backgroundColor: '#454545',
          transform: transformOrigin(
            { x: -VIEW_WIDTH / 2 + 20, y: -VIEW_HEIGHT / 2 + 50 },
            { rotateZ }
          ),
        }}
      >
        <View style={{ flexDirection: 'row', width, height: 600 }}>
          <Animated.View
            style={{
              marginTop: 250,
              opacity,
              transform: transformOrigin(
                { x: 0, y: -190 },
                { rotateZ: '90deg' }
              ),
            }}
          >
            <Text style={styles.title}>ACTIVITY</Text>
          </Animated.View>

          <View
            style={{ marginLeft: 30, marginTop: 100, alignItems: 'flex-start' }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Feather name="user" size={20} color="#fff" />
              <Text style={[styles.title, { marginLeft: 10 }]}>PROFILE</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Feather name="rss" size={20} color="#fff" />
              <Text style={[styles.title, { marginLeft: 10 }]}>FEED</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Feather name="activity" size={20} color="#fff" />
              <Text
                style={[styles.title, { marginLeft: 10, color: '#0f93f2' }]}
              >
                ACTIVITY
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}
            >
              <Feather name="settings" size={20} color="#fff" />
              <Text style={[styles.title, { marginLeft: 10 }]}>SETTINGS</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
  },
});

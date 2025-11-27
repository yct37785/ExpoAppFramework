import React, { memo, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Screen } from 'framework';
import { Text } from 'react-native-paper';
import { KeyboardProvider, KeyboardAwareScrollView, KeyboardAvoidingView } from "react-native-keyboard-controller";
import { StatusBar } from 'expo-status-bar';

/******************************************************************************************************************
 * Home screen
 ******************************************************************************************************************/
const HomeScreen: Screen.ScreenType = ({ navigation, route }) => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [bottomInput, setBottomInput] = useState('');

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

  return (
    <Screen.ScreenLayout>
      <KeyboardProvider>
        <View style={styles.root}>
          <StatusBar style="auto" />

          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <KeyboardAwareScrollView ScrollViewComponent={ScrollView}
              style={styles.flex}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Keyboard Avoiding Demo</Text>
              <Text style={styles.subtitle}>
                Focus the fields below and check if the keyboard pushes content up.
              </Text>

              {/* Top inputs */}
              <View style={styles.section}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  placeholder="Enter your name"
                  onChangeText={setName}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholder="you@example.com"
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Multiline notes */}
              <View style={styles.section}>
                <Text style={styles.label}>Notes (multiline)</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  value={notes}
                  placeholder="Write some notes..."
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top" // top-left for multiline
                />
              </View>

              {/* Spacer so last input is clearly near bottom */}
              <View style={{ height: 200 }} />

              {/* Bottom input to test keyboard overlap */}
              <View style={styles.section}>
                <Text style={styles.label}>Bottom input</Text>
                <TextInput
                  style={styles.input}
                  value={bottomInput}
                  placeholder="Focus me near the bottom"
                  onChangeText={setBottomInput}
                />
              </View>
            </KeyboardAwareScrollView>
          </KeyboardAvoidingView>
        </View>
      </KeyboardProvider>
    </Screen.ScreenLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  multilineInput: {
    minHeight: 100,
  },
});

export default memo(HomeScreen);

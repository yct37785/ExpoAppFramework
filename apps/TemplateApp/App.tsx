import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SampleClass, sampleFunction, fetchSampleUser } from "framework/sampleModule";

export default function App() {
  const [greeting, setGreeting] = useState("Loading...");

  useEffect(() => {
    async function loadData() {
      try {
        // demo using fetchSampleUser (Axios)
        const user: SampleClass = await fetchSampleUser();

        // demo the existing sampleFunction
        const transformed = sampleFunction({ id: user.id, name: user.name });

        setGreeting(`Hello, ${transformed.name}! (ID: ${transformed.id})`);
      } catch (err) {
        console.error(err);
        setGreeting("Failed to fetch user.");
      }
    }

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

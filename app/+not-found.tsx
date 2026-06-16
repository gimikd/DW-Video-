import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../constants/Colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Screen not found</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Camera</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  code: {
    fontSize: 64,
    fontWeight: '900',
    color: Colors.orange,
  },
  title: {
    color: Colors.textSecondary,
    fontSize: 16,
    letterSpacing: 2,
  },
  link: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linkText: {
    color: Colors.orange,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

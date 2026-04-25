import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useFitness } from '../ExerciseContext';

export default function ExerciseDetailScreen({ route }) {
  const { id } = route.params;
  const { workouts, markDone } = useFitness();
  const item = workouts.find((w) => w.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Workout not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.heading}>{item.name}</Text>
        <Text style={[styles.badge, item.done ? styles.done : styles.pending]}>
          {item.done ? 'Finished' : 'Pending'}
        </Text>
        <Text style={styles.about}>{item.description}</Text>
      </View>
      
      <View style={styles.imgWrap}>
        <Image source={{ uri: item.image }} style={styles.img} />
      </View>

      <View style={styles.action}>
        <Button
          title={item.done ? 'Undo' : 'Complete'}
          onPress={() => markDone(id)}
          color={item.done ? '#757575' : '#673AB7'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  info: {
    padding: 18,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  done: {
    backgroundColor: '#4CAF50',
  },
  pending: {
    backgroundColor: '#9E9E9E',
  },
  about: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  imgWrap: {
    paddingHorizontal: 12,
  },
  img: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  action: {
    margin: 12,
    marginTop: 16,
  },
});
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useFitness } from '../ExerciseContext';

export default function AddExerciseScreen({ navigation }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [pic, setPic] = useState('');
  const { addWorkout } = useFitness();

  const save = () => {
    if (name === '' || about === '') {
      alert('Fill required fields');
      return;
    }
    addWorkout({
      name: name.trim(),
      description: about.trim(),
      image: pic.trim() || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400',
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.field}
          value={name}
          onChangeText={setName}
          placeholder="Workout name"
        />

        <Text style={styles.label}>About *</Text>
        <TextInput
          style={[styles.field, styles.tall]}
          value={about}
          onChangeText={setAbout}
          placeholder="How to do it properly"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.field}
          value={pic}
          onChangeText={setPic}
          placeholder="Optional link"
        />

        <View style={styles.gap}>
          <Button title="Save Workout" onPress={save} color="#673AB7" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  form: {
    padding: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 5,
    color: '#333',
  },
  field: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1C4E9',
    borderRadius: 6,
    padding: 10,
  },
  tall: {
    height: 90,
    textAlignVertical: 'top',
  },
  gap: {
    marginTop: 25,
  },
});
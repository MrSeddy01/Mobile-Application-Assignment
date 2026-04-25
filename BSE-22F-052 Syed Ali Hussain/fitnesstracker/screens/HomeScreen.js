import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useFitness } from '../ExerciseContext';

export default function HomeScreen({ navigation }) {
  const { workouts } = useFitness();
  const [tip, setTip] = useState('');
  const [busy, setBusy] = useState(true);

  const fetchTip = async () => {
    setBusy(true);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setTip(data.content);
    } catch (e) {
      setTip('Consistency is the key to progress.');
    }
    setBusy(false);
  };

  useEffect(() => {
    fetchTip();
  }, []);

  const renderRow = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <View style={styles.top}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
      {item.done ? <Text style={styles.tag}>Completed</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.btnWrap}>
        <Button 
          title="Add Workout" 
          onPress={() => navigation.navigate('AddExercise')} 
          color="#673AB7"
        />
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        contentContainerStyle={styles.list}
      />

      <View style={styles.quoteArea}>
        <Text style={styles.quoteHead}>Motivation</Text>
        {busy ? (
          <ActivityIndicator color="#673AB7" />
        ) : (
          <Text style={styles.quoteBody}>{tip}</Text>
        )}
        <TouchableOpacity onPress={fetchTip} style={styles.quoteBtn}>
          <Text style={styles.quoteBtnText}>Get New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  btnWrap: {
    margin: 12,
    marginBottom: 6,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#673AB7',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  arrow: {
    fontSize: 22,
    color: '#673AB7',
  },
  tag: {
    color: '#4CAF50',
    marginTop: 4,
    fontSize: 13,
  },
  quoteArea: {
    backgroundColor: '#fff',
    margin: 12,
    marginTop: 0,
    padding: 14,
    borderRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#673AB7',
  },
  quoteHead: {
    fontWeight: 'bold',
    color: '#673AB7',
    marginBottom: 6,
  },
  quoteBody: {
    color: '#555',
    fontSize: 14,
    fontStyle: 'italic',
  },
  quoteBtn: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  quoteBtnText: {
    color: '#673AB7',
    fontWeight: 'bold',
  },
});
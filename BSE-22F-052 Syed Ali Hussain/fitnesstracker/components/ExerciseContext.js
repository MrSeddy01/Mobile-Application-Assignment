import React, { createContext, useState, useContext } from 'react';

// Create the context
const ExerciseContext = createContext();

// This component wraps your app and provides the data
export function ExerciseProvider({ children }) {
  // Start with 3 sample exercises
  const [exercises, setExercises] = useState([
    { 
      id: '1', 
      name: 'Push Ups', 
      description: 'A classic exercise that strengthens your chest, shoulders, and triceps. Keep your body straight and lower yourself until your chest nearly touches the floor.', 
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400', 
      completed: false 
    },
    { 
      id: '2', 
      name: 'Morning Run', 
      description: 'Running is excellent for cardiovascular health. Start with a light jog for 20 minutes and gradually increase your pace and distance.', 
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400', 
      completed: false 
    },
    { 
      id: '3', 
      name: 'Squats', 
      description: 'Stand with feet shoulder-width apart. Lower your hips back and down as if sitting in a chair, then stand back up. Great for legs and glutes.', 
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400', 
      completed: false 
    },
  ]);

  // Function to add a new exercise
  const addExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now().toString(), // Create unique ID using current time
      completed: false,
    };
    setExercises([...exercises, newExercise]);
  };

  // Function to mark exercise as completed or not
  const toggleComplete = (id) => {
    setExercises(
      exercises.map((ex) => 
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, toggleComplete }}>
      {children}
    </ExerciseContext.Provider>
  );
}

// Custom hook to use the exercise data in any screen
export function useExercises() {
  return useContext(ExerciseContext);
}
import React, { createContext, useState, useContext } from 'react';

const FitnessContext = createContext();

export function FitnessProvider({ children }) {
  const [workouts, setWorkouts] = useState([
    { 
      id: '1', 
      name: 'Bench Press', 
      description: 'Lie flat on bench, grip bar shoulder width, lower to chest and push up. Builds chest and arms.', 
      image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400', 
      done: false 
    },
    { 
      id: '2', 
      name: 'Treadmill Run', 
      description: 'Set speed to comfortable pace. Run for 20 to 40 minutes. Keep posture straight.', 
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400', 
      done: false 
    },
    { 
      id: '3', 
      name: 'Deadlift', 
      description: 'Stand with feet under bar, grip tight, lift by straightening legs and back together.', 
      image: 'https://images.unsplash.com/photo-1517963879466-e1b54ebd0642?w=400', 
      done: false 
    },
  ]);

  const addWorkout = (item) => {
    const entry = {
      ...item,
      id: Date.now().toString(),
      done: false,
    };
    setWorkouts([entry, ...workouts]);
  };

  const markDone = (id) => {
    setWorkouts(
      workouts.map((w) => 
        w.id === id ? { ...w, done: !w.done } : w
      )
    );
  };

  return (
    <FitnessContext.Provider value={{ workouts, addWorkout, markDone }}>
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  return useContext(FitnessContext);
}
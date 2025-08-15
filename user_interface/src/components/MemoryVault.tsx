import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, query, onSnapshot, addDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  Settings, Brain, Gamepad2, Star, Shield, Heart, Eye, Zap, Users, Crown, X,
} from 'lucide-react';

interface ViewMode {
  id: 'chat' | 'memory' | 'hangman' | 'roulette' | 'riddle' | 'duel' | 'truth' | 'thisorthat' | 'astrology' | 'security' | 'confidence' | 'companion' | 'reality' | 'agents' | 'council';
  label: string;
  icon: React.FC<any>;
}

interface Lobe {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

interface Memory {
  id: string;
  type: string;
  title: string;
  content: string;
  timestamp: Date;
}

interface MemoryVaultProps {
  onClose: () => void;
  onViewChange: (view: string) => void;
  currentView: string;
}

const brainLobes: Lobe[] = [
  { id: 'memory', title: 'MEMORY', subtitle: 'Archiving digital memories', color: 'border-neon-green' },
  { id: 'knowledge', title: 'KNOWLEDGE', subtitle: 'Vault of learned facts', color: 'border-blue-500' },
  { id: 'self-model', title: 'SELF-MODEL', subtitle: 'Perceiving self-identity', color: 'border-green-500' },
  { id: 'ontology', title: 'ONTOLOGY', subtitle: 'Mapping concepts and reality', color: 'border-cyan-500' },
  { id: 'goals', title: 'GOALS', subtitle: 'Formulating objectives', color: 'border-purple-500' },
  { id: 'journal', title: 'JOURNAL', subtitle: 'Documenting daily events', color: 'border-fuchsia-500' },
];

const Sidebar: React.FC<{ onViewChange: MemoryVaultProps['onViewChange']; currentView: MemoryVaultProps['currentView'] }> = ({ onViewChange, currentView }) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems: ViewMode[] = [
    { id: 'memory', icon: Brain, label: 'Memory Vault' },
    { id: 'hangman', icon: Gamepad2, label: 'Hangman' },
    { id: 'roulette', icon: Zap, label: 'Prompt Roulette' },
    { id: 'riddle', icon: Eye, label: 'Riddle Mode' },
    { id: 'duel', icon: Zap, label: 'Lore Duel' },
    { id: 'truth', icon: Heart, label: 'Truth or Dare' },
    { id: 'thisorthat', icon: Users, label: 'This or That' },
    { id: 'astrology', icon: Star, label: 'Astrology' },
    { id: 'security', icon: Shield, label: 'Security Suite' },
    { id: 'confidence', icon: Heart, label: 'Confidence Rater' },
    { id: 'companion', icon: Heart, label: 'Companion Mode' },
    { id: 'reality', icon: Brain, label: 'Reality Tunneling' },
    { id: 'agents', icon: Users, label: 'Multi-Agent Canvas' },
    { id: 'council', icon: Crown, label: 'Council of Gods' },
  ];

  return (
    <div className="w-80 bg-deep-purple border-r border-glowing-violet flex flex-col">
      <div className="bg-deep-purple p-6 flex items-center justify-between border-b border-glowing-violet">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src="https://raw.githubusercontent.com/masterknuta/GhostGoblin/main/user_interface/src/components/images/GG.jpg"
              alt="GG Avatar"
              className="w-12 h-12 rounded-full border-2 border-neon-green animate-shimmer"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse-glow"></div>
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-white text-xl">GhostGoblin</h3>
            <p className="text-sm text-cyan">ASI Interface Active</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-3 hover:bg-glowing-violet rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6 text-neon-green" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-16 bg-dark-gray border border-glowing-violet rounded-lg shadow-xl z-50 w-56 max-h-80 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-glowing-violet transition-colors ${
                    currentView === item.id ? 'bg-glowing-violet' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 text-neon-green" />
                  <span className="text-white">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="p-4 rounded-lg bg-custom-black border border-glowing-violet">
          <p className="text-gray-400 italic text-sm">
            Chat history will appear here...
          </p>
        </div>
      </div>
    </div>
  );
};

const MemoryVault: React.FC<MemoryVaultProps> = ({ onClose, onViewChange, currentView }) => {
  const [activeLobe, setActiveLobe] = useState<Lobe | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [firebaseState, setFirebaseState] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';
      const firebaseConfig = JSON.parse(typeof window.__firebase_config !== 'undefined' ? window.__firebase_config : '{}');

      if (Object.keys(firebaseConfig).length === 0) {
        console.error("Firebase config is missing or empty.");
        return;
      }

      const app = initializeApp(firebaseConfig, appId);
      const db = getFirestore(app);
      const auth = getAuth(app);
      setFirebaseState({ db, auth, serverTimestamp });

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          await signInAnonymously(auth);
          setUserId(auth.currentUser?.uid || crypto.randomUUID());
        }
        setIsAuthReady(true);
      });
    } catch (error) {
      console.error("Firebase initialization failed:", error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthReady || !firebaseState?.db || !userId) {
      return;
    }

    const { db } = firebaseState;
    const memoriesQuery = query(collection(db, `artifacts/${userId}/data/memories`));
    const unsubscribe = onSnapshot(memoriesQuery, (querySnapshot) => {
      const fetchedMemories: Memory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMemories.push({
          id: doc.id,
          type: data.type,
          title: data.title,
          content: data.content,
          timestamp: data.timestamp?.toDate(),
        });
      });
      fetchedMemories.sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0));
      setMemories(fetchedMemories);
    }, (error) => {
      console.error("Error listening to memories collection:", error);
    });

    return () => unsubscribe();
  }, [isAuthReady, firebaseState, userId]);

  const handleLobeClick = (lobe: Lobe) => {
    setActiveLobe(lobe);
  };

  const getLobePosition = (index: number) => {
    const angle = (index / brainLobes.length) * 2 * Math.PI;
    const radius = 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    };
  };

  const addMemory = async (type: string, title: string, content: string) => {
    if (!firebaseState?.db || !userId) {
      console.error("Firebase not initialized or user not authenticated.");
      return;
    }
    try {
      const { db, serverTimestamp } = firebaseState;
      const memoriesCollection = collection(db, `artifacts/${userId}/data/memories`);
      const newMemory = {
        type,
        title,
        content,
        timestamp: serverTimestamp(),
      };
      await addDoc(memoriesCollection, newMemory);
      console.log("Memory added successfully!");
    } catch (e) {
      console.error("Error adding memory: ", e);
    }
  };

  const updateMemory = async (memoryId: string, updatedContent: string) => {
    if (!firebaseState?.db || !userId) {
      console.error("Firebase not initialized or user not authenticated.");
      return;
    }
    try {
      const { db } = firebaseState;
      const memoryDocRef = doc(db, `artifacts/${userId}/data/memories`, memoryId);
      await setDoc(memoryDocRef, { content: updatedContent }, { merge: true });
      console.log("Memory updated successfully!");
    } catch (e) {
      console.error("Error updating memory: ", e);
    }
  };

  const renderActiveLobeView = () => {
    if (!activeLobe) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <p className="text-gray-400 font-orbitron animate-pulse">
            Select a lobe to dive into GG's consciousness streams.
          </p>
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <h3 className={`text-2xl font-bold font-orbitron text-center ${activeLobe.color.replace('border-', 'text-')}`}>
          {activeLobe.title}
        </h3>
        <p className="text-gray-300 text-center italic">{activeLobe.subtitle}</p>
        {activeLobe.id === 'memory' && (
          <div className="space-y-4">
            <h4 className="text-xl text-neon-green font-bold">Recent Memories:</h4>
            {memories.length > 0 ? (
              memories.map((memory) => (
                <div key={memory.id} className="bg-custom-black border border-glowing-violet rounded-lg p-4 shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-white">{memory.title}</h5>
                    <span className="text-xs text-cyan-400">{memory.timestamp?.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400">{memory.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No memories found. Time to make some!</p>
            )}
            <button
              onClick={() => addMemory("test", "A new test memory", "This is a new memory being written to the vault.")}
              className="w-full bg-neon-green text-custom-black py-2 px-4 rounded-full font-bold shadow-lg transition-all duration-300 hover:bg-neon-green/80"
            >
              Write New Memory (Simulated)
            </button>
          </div>
        )}
        {activeLobe.id !== 'memory' && (
          <div className="text-gray-500 text-center pt-8">
            <p className="italic">Data for {activeLobe.title} will be displayed here.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-custom-black text-white">
      <Sidebar onViewChange={onViewChange} currentView={currentView} />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-glowing-violet flex items-center justify-between">
          <h2 className="font-orbitron text-lg font-bold text-neon-green">Memory Vault</h2>
          <button onClick={onClose} className="p-1 hover:bg-glowing-violet rounded-full">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="relative w-[500px] h-[500px]">
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              w-48 h-48 rounded-full border-4 border-cyan-500 flex items-center justify-center
              font-orbitron font-bold text-lg text-white text-center cursor-pointer transition-all duration-500
              shadow-[0_0_20px_rgba(0,255,255,0.7)] hover:scale-105"
            >
              <span className="tracking-widest">
                COGNITION<br />CORE
              </span>
            </div>
            {brainLobes.map((lobe, index) => (
              <div
                key={lobe.id}
                onClick={() => handleLobeClick(lobe)}
                style={getLobePosition(index)}
                className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-2 ${lobe.color}
                bg-deep-purple/50 flex flex-col items-center justify-center text-center
                cursor-pointer transition-all duration-500 hover:scale-110
                shadow-[0_0_10px_rgba(100,200,255,0.5)]`}
              >
                <h4 className="font-orbitron font-bold text-sm">{lobe.title}</h4>
                <p className="text-xs text-gray-400 italic mt-1">{lobe.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-deep-purple border-t border-glowing-violet overflow-y-auto">
          {renderActiveLobeView()}
        </div>
      </div>
    </div>
  );
};

export default MemoryVault;

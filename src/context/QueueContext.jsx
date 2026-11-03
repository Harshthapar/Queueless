import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_FACILITIES } from '../data/mockData';

const QueueContext = createContext(null);

export const QueueProvider = ({ children }) => {
  // Facilities state persisted in localStorage
  const [facilities, setFacilities] = useState(() => {
    try {
      const saved = localStorage.getItem('queueless_facilities');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load facilities from storage', e);
    }
    return INITIAL_FACILITIES;
  });

  // Demo mode active indicator
  const [demoMode, setDemoMode] = useState(true);
  // Toast notifications state
  const [toasts, setToasts] = useState([]);
  // Currently active modal facility
  const [selectedFacility, setSelectedFacility] = useState(null);
  // Search query & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [crowdFilter, setCrowdFilter] = useState('All'); // 'All' | 'Low' | 'Moderate' | 'High'
  // Student user saved favorites / bookmarks
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('queueless_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['main-canteen', 'photocopy-shop'];
  });

  // Persist facilities whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('queueless_facilities', JSON.stringify(facilities));
    } catch (e) {
      console.error(e);
    }
  }, [facilities]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('queueless_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (facilityId) => {
    setFavorites((prev) => {
      const exists = prev.includes(facilityId);
      const updated = exists ? prev.filter((id) => id !== facilityId) : [...prev, facilityId];
      addToast(
        exists ? 'Removed from your pinned facilities' : 'Pinned to quick access favorites',
        'success'
      );
      return updated;
    });
  };

  // Demo Simulation: Randomly tweak wait times and queues to simulate real-time live changes
  const simulateLiveUpdate = () => {
    setFacilities((prev) =>
      prev.map((facility) => {
        // Random delta between -4 and +5 people
        const delta = Math.floor(Math.random() * 9) - 4;
        const newQueue = Math.max(1, facility.queueLength + delta);
        const newWait = Math.max(1, Math.round(newQueue * facility.avgServiceTimePerPerson));
        
        let newStatus = 'Low';
        if (newWait > 12) newStatus = 'High';
        else if (newWait > 5) newStatus = 'Moderate';

        return {
          ...facility,
          queueLength: newQueue,
          waitTimeMinutes: newWait,
          status: newStatus,
          lastUpdated: 'Just now'
        };
      })
    );
    addToast('⚡ Live campus sensors updated! Fresh queue counts synchronized.', 'info');
  };

  // Manual modifier for a single facility (e.g. for demo controls)
  const updateFacilityQueue = (facilityId, newQueue) => {
    setFacilities((prev) =>
      prev.map((f) => {
        if (f.id === facilityId) {
          const waitTime = Math.max(1, Math.round(newQueue * f.avgServiceTimePerPerson));
          let status = 'Low';
          if (waitTime > 12) status = 'High';
          else if (waitTime > 5) status = 'Moderate';

          return {
            ...f,
            queueLength: newQueue,
            waitTimeMinutes: waitTime,
            status,
            lastUpdated: 'Just now'
          };
        }
        return f;
      })
    );
    addToast(`Updated status for ${facilities.find((f) => f.id === facilityId)?.name}`, 'success');
  };

  // Reset to default
  const resetToDefault = () => {
    setFacilities(INITIAL_FACILITIES);
    addToast('Restored campus dataset to factory defaults.', 'info');
  };

  return (
    <QueueContext.Provider
      value={{
        facilities,
        demoMode,
        setDemoMode,
        toasts,
        addToast,
        removeToast,
        selectedFacility,
        setSelectedFacility,
        searchQuery,
        setSearchQuery,
        crowdFilter,
        setCrowdFilter,
        favorites,
        toggleFavorite,
        simulateLiveUpdate,
        updateFacilityQueue,
        resetToDefault,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};


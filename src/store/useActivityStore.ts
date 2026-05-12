// store/useActivityStore.ts
// DROP THIS FILE IN: src/store/useActivityStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivityStore = {
  // Progress tracking
  completed: string[];                      // activity IDs fully completed
  stepProgress: Record<string, number>;     // { activityId: lastCompletedStep }
  streak: number;                           // day streak
  lastActive: string | null;               // ISO date string

  // Actions
  markStepComplete: (activityId: string, step: number) => void;
  markActivityComplete: (activityId: string) => void;
  getProgress: (activityId: string, totalSteps: number) => number; // returns 0-100
  isCompleted: (activityId: string) => boolean;
  getLastStep: (activityId: string) => number;
  resetActivity: (activityId: string) => void;
  resetAll: () => void;
  _updateStreak: () => void;
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set, get) => ({
      completed: [],
      stepProgress: {},
      streak: 0,
      lastActive: null,

      // Called every time user moves to next step
      markStepComplete: (activityId, step) => {
        const current = get().stepProgress[activityId] ?? 0;
        if (step <= current) return; // don't go backwards
        set((state) => ({
          stepProgress: {
            ...state.stepProgress,
            [activityId]: step,
          },
        }));
        get()._updateStreak();
      },

      // Called when user finishes the last step
      markActivityComplete: (activityId) => {
        set((state) => ({
          completed: state.completed.includes(activityId)
            ? state.completed
            : [...state.completed, activityId],
        }));
        get()._updateStreak();
      },

      // Returns 0-100 percentage based on last completed step
      getProgress: (activityId, totalSteps) => {
        if (get().completed.includes(activityId)) return 100;
        const lastStep = get().stepProgress[activityId] ?? 0;
        return Math.round((lastStep / (totalSteps - 1)) * 100);
      },

      isCompleted: (activityId) => get().completed.includes(activityId),

      getLastStep: (activityId) => get().stepProgress[activityId] ?? 0,

      resetActivity: (activityId) => {
        set((state) => ({
          completed: state.completed.filter((id) => id !== activityId),
          stepProgress: Object.fromEntries(
            Object.entries(state.stepProgress).filter(([k]) => k !== activityId)
          ),
        }));
      },

      resetAll: () => set({ completed: [], stepProgress: {}, streak: 0, lastActive: null }),

      // Internal: updates streak based on lastActive date
      _updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActive, streak } = get();

        if (lastActive === today) return; // already active today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const isConsecutive = lastActive === yesterday;

        set({
          lastActive: today,
          streak: isConsecutive ? streak + 1 : 1,
        });
      },
    }),
    {
      name: 'activity-store', // localStorage key
      // Only persist these fields, not the function references
      partialize: (state) => ({
        completed: state.completed,
        stepProgress: state.stepProgress,
        streak: state.streak,
        lastActive: state.lastActive,
      }),
    }
  )
);
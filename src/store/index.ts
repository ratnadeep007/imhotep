import create from "zustand";

interface Store {
  schedules: Array<Record<string, unknown>>;
  doctors: Array<Record<string, unknown>>;
  consultancy: Array<Record<string, unknown>>;
  updateSchedules: (payload: Record<string, unknown>) => void;
  updateDoctors: (payload: Record<string, unknown>) => void;
  updateConsultancy: (payload: Record<string, unknown>) => void;
  newConsultancyList: (payload: Array<Record<string, unknown>>) => void;
  newDoctorsList: (payload: Array<Record<string, unknown>>) => void;
}

const useStore = create<Store>((set) => ({
  schedules: [],
  doctors: [],
  consultancy: [],
  updateSchedules: (payload) => {
    set((state) => ({
      schedules: [...state.schedules, payload]
    }));
  },
  updateDoctors: (payload) => {
    set((state) => ({
      doctors: [...state.doctors, payload]
    }));
  },
  updateConsultancy: (payload) => {
    set((state) => ({
      consultancy: [...state.consultancy, payload]
    }));
  },
  newConsultancyList: (payload) => {
    set(() => ({
      consultancy: payload
    }));
  },
  newDoctorsList: (payload) => {
    set(() => ({
      doctors: payload
    }));
  }
}));

export default useStore;

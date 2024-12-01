import { create } from 'zustand';
import { Device } from '../types/device';
import { supabase } from '../lib/supabase';

interface DeviceStore {
  devices: Device[];
  loading: boolean;
  error: string | null;
  fetchDevices: () => Promise<void>;
  addDevice: (device: Omit<Device, 'id'>) => Promise<void>;
  updateDevice: (id: string, device: Partial<Device>) => Promise<void>;
  deleteDevice: (id: string) => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],
  loading: false,
  error: null,

  fetchDevices: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('name');
      
      if (error) throw error;
      set({ devices: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addDevice: async (device) => {
    try {
      const { data, error } = await supabase
        .from('devices')
        .insert([device])
        .select();
      
      if (error) throw error;
      set((state) => ({ devices: [...state.devices, data[0]] }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateDevice: async (id, device) => {
    try {
      const { error } = await supabase
        .from('devices')
        .update(device)
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        devices: state.devices.map((d) => (d.id === id ? { ...d, ...device } : d)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteDevice: async (id) => {
    try {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        devices: state.devices.filter((d) => d.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
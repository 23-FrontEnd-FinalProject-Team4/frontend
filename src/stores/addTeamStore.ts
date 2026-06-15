import { create } from 'zustand';

const DEFAULT_IMAGE_PREVIEW = '/profile.svg';

interface AddTeamState {
  imagePreview: string;
  imageFile: File | null;
  setImage: (file: File) => void;
  reset: () => void;
}

export const useAddTeamStore = create<AddTeamState>((set, get) => ({
  imagePreview: DEFAULT_IMAGE_PREVIEW,
  imageFile: null,
  setImage: (file) => {
    const previewUrl = URL.createObjectURL(file);
    const prev = get().imagePreview;

    if (prev.startsWith('blob:')) {
      URL.revokeObjectURL(prev);
    }

    set({ imageFile: file, imagePreview: previewUrl });
  },
  reset: () => {
    const prev = get().imagePreview;

    if (prev.startsWith('blob:')) {
      URL.revokeObjectURL(prev);
    }

    set({ imagePreview: DEFAULT_IMAGE_PREVIEW, imageFile: null });
  },
}));

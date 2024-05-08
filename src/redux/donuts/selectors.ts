import { RootState } from '../store';

// селект для более удобного использования, если нужно
export const selectDonuts = (state: RootState) => state.donuts;

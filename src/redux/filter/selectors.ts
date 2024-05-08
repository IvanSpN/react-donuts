import { RootState } from '../store';

// селект для более удобного использования, если нужно
export const selectFilter = (state: RootState) => state.filter;

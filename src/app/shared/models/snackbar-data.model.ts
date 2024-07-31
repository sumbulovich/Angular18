export interface SnackbarData {
  component?: any;
  componentInputs?: Record<string, any>,
  title?: string;
  content?: string;
  type?: 'info' | 'success' | 'error';
}

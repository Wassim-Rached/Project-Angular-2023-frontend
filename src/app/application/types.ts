export type Token = {
  access: string;
};

export type MessageText = {
  text: string;
  status: 'success' | 'error' | 'warning';
};

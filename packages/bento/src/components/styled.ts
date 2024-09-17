import { SxProps, Theme } from '@mui/material';

export const sx =
  (props: SxProps<Theme>) =>
  ({ theme }: { theme: Theme }) => {
    return theme.unstable_sx(props);
  };

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import PositionCard from './PositionCard'; // Adjust the import path as needed
import { Position } from '../Settings/Position';

interface ClosePositionDialogProps {
  open: boolean;
  position: Position | null;
  onClose: () => void;
  onClosePosition: (closeEntirePair: boolean) => void;
}

const ClosePositionDialog: React.FC<ClosePositionDialogProps> = ({
  open,
  position,
  onClose,
  onClosePosition
}) => {
  if (!position) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#1e222d',
          color: 'white',
        },
      }}
    >
      <DialogTitle>Close Position</DialogTitle>
      <DialogContent>
        <PositionCard position={position} />
        <Typography>
          Do you want to close the entire position execution pair (both short and long sides) or just this side?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={() => onClosePosition(false)} color="primary">Close This Side</Button>
        <Button onClick={() => onClosePosition(true)} color="primary">Close Entire Pair</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClosePositionDialog;
import { Box, Typography, CircularProgress } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TextA from '../../styledComponent/Text/TextA';

const BotStatusIndicator = ({ isConnected }: { isConnected: boolean }) => {
  return (
      <Box display="flex" alignItems="center" gap={2}>
        <TextA variant="body1" fontWeight="bold" minWidth="80px">
          Bot Status:
        </TextA>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          bgcolor={isConnected ? 'success.light' : 'warning.light'}
          px={2}
          py={1}
          borderRadius="16px"
        >
          {isConnected ? (
            <FiberManualRecordIcon
              sx={{
                color: 'success.main',
                fontSize: 16,
              }}
            />
          ) : (
            <CircularProgress
              size={16}
              thickness={6}
              sx={{ color: 'warning.main' }}
            />
          )}
          <Typography
            variant="body2"
            color={isConnected ? 'success.main' : 'warning.main'}
            fontWeight="medium"
          >
            {isConnected ? 'Connected' : 'Connecting...'}
          </Typography>
        </Box>
      </Box>
  );
};

export default BotStatusIndicator;
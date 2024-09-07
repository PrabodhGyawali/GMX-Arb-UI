import React, {useState} from 'react'
import { Box, Typography, Paper, Button, TextField, Snackbar } from '@mui/material'
import BotStatusIndicator from '../../components/NavBarSide/BotStatusIndicator'
import { useSocket } from '../../Context/SocketContext'

export const TerminalBox: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <Paper elevation={3} sx={{ bgcolor: '#000', color: '#0f0', p: 2, my: 2, fontFamily: 'monospace' }}>
        <Typography variant="body2">{children}</Typography>
    </Paper>
)

const InstallationSteps = () => {
    const {connected, setBackendUrl} = useSocket();
    const [url, setUrl] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)


    

    const handleUrlSubmit = () => {
        setBackendUrl(url)
        setSnackbarOpen(true)
    }

    return (
        <Box>
            <Typography variant='h4' gutterBottom>Installation Steps</Typography>
            <BotStatusIndicator isConnected={connected} />

            <Typography variant='h6' mt={4}>1. Install Git</Typography>
            <Typography>
                Download Git from <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer">git-scm.com</a> (Windows) or use Homebrew on Mac:
            </Typography>
            <TerminalBox>brew install git</TerminalBox>

            <Typography variant='h6' mt={3}>2. Open a Terminal</Typography>
            <Typography>
                On Windows: Press Win + X and select "Windows PowerShell" or "Command Prompt"<br />
                On Mac: Open the "Terminal" app from Applications {`>`} Utilities
            </Typography>
            <Typography mt={2}>Navigate to your desired folder:</Typography>
            <TerminalBox>
                cd C:\your-folder-path\  # Windows example<br />
                cd ~/Desktop/            # Mac example
            </TerminalBox>

            <Typography variant='h6' mt={3}>3. Clone the Repository</Typography>
            <TerminalBox>
                git clone https://github.com/50shadesofgwei/SynthetixFundingRateArbitrage.git
            </TerminalBox>

            <Typography variant='h6' mt={3}>4. Navigate to the Project Directory</Typography>
            <TerminalBox>cd SynthetixFundingRateArbitrage</TerminalBox>

            <Typography variant='h6' mt={3}>5. Install Python</Typography>
            <Typography>
                Install Python from the Microsoft Store (Windows) or from <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">python.org</a> (Mac).
            </Typography>

            <Typography variant='h6' mt={3}>6. Create a Virtual Environment</Typography>
            <TerminalBox>python -m venv venv</TerminalBox>

            <Typography variant='h6' mt={3}>7. Activate the Virtual Environment</Typography>
            <Typography>For Windows:</Typography>
            <TerminalBox>.\venv\Scripts\Activate.ps1</TerminalBox>
            <Typography mt={2}>For Mac OS:</Typography>
            <TerminalBox>source venv/bin/activate</TerminalBox>

            <Typography variant='h6' mt={3}>8. Install Dependencies</Typography>
            <TerminalBox>pip install -e .</TerminalBox>

            <Typography variant='h6' mt={3}>9. Run the Project UI</Typography>
            <TerminalBox>project-run-ui</TerminalBox>

            <Typography variant='h6' mt={3}>10. Find the </Typography>
            <Typography>
                Check the terminal console output for a url like `http://127.0.0.1:5000`.
                Copy that url as it is the address of the bot's web interface.
            </Typography>

            <Box mt={2} display="flex" alignItems="center">
                <TextField
                    label="Paste URL here"
                    variant="outlined"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={handleUrlSubmit}>
                    Connect
                </Button>
            </Box>

            <Typography variant='h6' mt={3}>11. Check Bot Connection</Typography>
            <Typography>
                Look for the green indicator above showing that the bot is connected.
            </Typography>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="URL submitted successfully!"
            />

        </Box>
    )
}

export default InstallationSteps
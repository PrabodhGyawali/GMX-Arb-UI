import React, { useState } from 'react'
import { Box, Typography, Paper, Button, TextField, Snackbar, ToggleButton, ToggleButtonGroup, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import BotStatusIndicator from '../../components/NavBarSide/BotStatusIndicator'
import { useSocket } from '../../Context/SocketContext'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



export const TerminalBox: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children as string);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                bgcolor: '#000', 
                color: '#0f0', 
                p: 2, 
                my: 2, 
                position: 'relative',
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#0f0',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#333',
                },
            }}
        >
            <Typography 
                variant="body2" 
                sx={{ 
                    fontFamily: 'monospace', 
                    whiteSpace: 'nowrap', 
                    paddingRight: '30px', 
                    overflowX: 'auto',
                    width: '95%',
                }}
            >
                {children}
            </Typography>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} placement="top">
                <IconButton 
                    onClick={handleCopy}
                    sx={{ 
                        position: 'absolute', 
                        top: 5, 
                        right: 5, 
                        color: '#0f0',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <ContentCopyIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Paper>
    )
}

const InstallationSteps = () => {
    const {connected, setBackendUrl} = useSocket();
    const [url, setUrl] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [os, setOs] = useState<'mac' | 'windows'>('windows')
    

    const handleUrlSubmit = () => {
        localStorage.setItem('backendURL', url)
        setBackendUrl(url)
        setSnackbarOpen(true)
    }

    const handleOsChange = () => {
        const newOs = os === "windows" ? "mac" : "windows"
        setOs(newOs);
    };

    return (
        <Box>
            <Typography variant='h4' gutterBottom>Installation Steps</Typography>
            
            <Box mb={2}>
                <Typography variant='body1' gutterBottom>Select your operating system:</Typography>
                <ToggleButtonGroup
                    value={os}
                    exclusive
                    onChange={() => handleOsChange()}
                    aria-label="operating system"
                >
                    <ToggleButton value="windows" aria-label="windows">
                        Windows
                    </ToggleButton>
                    <ToggleButton value="mac" aria-label="mac">
                        Mac
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Typography variant='h5' mt={4}>Install Git</Typography>
            {os === 'windows' ? (
                <Typography>
                    Download Git from <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer">git-scm.com/download/win</a>.
                </Typography>
            ) : (
                <>
                    <Typography>
                        Follow the steps in <a href="https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac" target="_blank" rel="noopener noreferrer">support.apple.com/...</a> to open your terminal.
                    </Typography>
                    <Typography>
                        Download Git through the terminal by following the steps in <a href="https://git-scm.com/download/mac" target="_blank" rel="noopener noreferrer">git-scm.com/download/mac</a>.
                    </Typography>
                </>
            )}

            {os === 'windows' ? (
                <>
                    <Typography variant='h5' mt={3}>Open a Powershell Terminal</Typography>
                    <Typography>
                        Press <strong>Win + X</strong> and select <strong>Terminal</strong>
                    </Typography>
                </>
            ) : (
                <></>
            )}
            
            {os === 'windows' ? (
                <TerminalBox>
                    cd C:\your-folder-path\
                </TerminalBox>
            ) : (
                <TerminalBox>
                    cd ~/your-folder-path/
                </TerminalBox>
            )}

            <Typography variant='h5' mt={3}>Clone the Repository</Typography>
            <TerminalBox>
                git clone https://github.com/50shadesofgwei/SynthetixFundingRateArbitrage.git
            </TerminalBox>

            <Typography variant='h5' mt={3}>Navigate to the Project Directory</Typography>
            <TerminalBox>cd SynthetixFundingRateArbitrage</TerminalBox>

            <Typography variant='h5' mt={3}>Install Python</Typography>
            {os === 'windows' ? (
                <Typography>
                    Install Python from the <a href="https://www.python.org/downloads/windows/" target="_blank" rel="noopener noreferrer">Python website</a> or through the Microsoft Store.
                </Typography>
            ) : (
                <Typography>
                    Install Python from <a href="https://www.python.org/downloads/macos/" target="_blank" rel="noopener noreferrer">python.org/downloads/macos/</a>
                </Typography>
            )}

            <Typography variant='h5' mt={3}>Create a Virtual Environment</Typography>
            <TerminalBox>python -m venv venv</TerminalBox>

            <Typography variant='h5' mt={3}>Activate the Virtual Environment<span><Tooltip
                title={
                    <Typography>
                        You must always activate your terminal or else the <strong>project-run-ui</strong> command won't work.
                    </Typography>
                }
            >
                <IconButton>
                    <InfoOutlinedIcon />
                </IconButton>   
            </Tooltip></span></Typography>
            {os === 'windows' ? (
                <TerminalBox>.\venv\Scripts\Activate.ps1</TerminalBox>
            ) : (
                <TerminalBox>source venv/bin/activate</TerminalBox>
            )}

            <Typography variant='h5' mt={3}>Install Dependencies</Typography>
            <TerminalBox>pip install -e .</TerminalBox>

            <Typography variant='h5' mt={3}>Run the Project UI</Typography>
            <TerminalBox>project-run-ui</TerminalBox>

            <Typography>
                Run the code below to rename the <strong>example.env</strong> file to <strong>.env<Tooltip
                title={
                    <Typography>
                        The .env file is where your settings are going to be stored on your local computer. It will contains your API keys, private key and bot settings. It is important to keep this file secure.
                    </Typography>
                }
            >
                <IconButton>
                    <InfoOutlinedIcon />
                </IconButton>   
            </Tooltip></strong>.
            </Typography>
            {os === 'windows' ? (
                <TerminalBox>
                    Rename-Item -Path "example.env" -NewName ".env"
                </TerminalBox>
            ) : (
                <TerminalBox>
                    mv "example.env" ".env"
                </TerminalBox>
            )}
    

            <Typography variant='h5' mt={3}>Find the URL</Typography>
            <Typography>
                Check the terminal console output for a url like <strong>http://127.0.0.1:5000</strong>.
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
                Look for the green below showing if the bot is connected.
            </Typography>
            <BotStatusIndicator isConnected={connected} />

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
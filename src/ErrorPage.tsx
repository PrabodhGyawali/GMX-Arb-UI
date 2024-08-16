import { Box } from "@mui/material";

function ErrorPage() {
    return (
        <Box className="error-404" sx={{
            
        }}>
            <h1>Oops</h1>
            <h2>404 Error</h2>
            <p>Page Not Found</p>
        </Box>
    )
}

export default ErrorPage;
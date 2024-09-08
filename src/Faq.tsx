import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const questions = [
  {
    section: 'Setup',
    question: 'What to do if the python bot is not running?',
    answer: 'Repeat onboarding or make sure correct API keys are added.'
  },
  {
    section: 'Trade Mechanics',
    question: 'How does the bot make trades?',
    answer: 'By executing trade algorithms based on the strategies configured by the user.'
  },
  {
    section: 'Other',
    question: 'What should I do if I encounter an error?',
    answer: 'Check the logs for details and ensure your configurations are correct.'
  }
];

const FAQPage = () => {
  const sections = [...new Set(questions.map(q => q.section))];

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#f5f5f5', borderRadius: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">FAQ</Typography>
      
      {sections.map(section => (
        <Box key={section} sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h5" gutterBottom>{section}</Typography>
          {questions
            .filter(q => q.section === section)
            .map((q, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{q.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{q.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </Box>
      ))}
    </Container>
  );
};

export default FAQPage;
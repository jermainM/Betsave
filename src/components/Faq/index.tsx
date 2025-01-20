import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from '@mui/material';

interface FAQItemProps {
  title: string;
  content: string;
  expanded: boolean;
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const FAQItem = (props: FAQItemProps) => {
  const { title, content, expanded, handleChange } = props;
  return (
    <FAQAccordion expanded={expanded} onChange={handleChange}>
      <FAQAccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        {title}
      </FAQAccordionSummary>
      <FAQAccordionDetails>{content}</FAQAccordionDetails>
    </FAQAccordion>
  );
};

const FAQAccordion = styled(Accordion)(({ theme }) => ({
  border: '2px solid #141c30',
  borderRadius: '15px',
  backgroundColor: 'transparent',
  backgroundImage: 'inherit',
  width: '100%',
  padding: '10px',

  '::before': {
    position: 'relative',
  },
}));

const FAQAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  fontSize: '18px',
  color: '#fff',
  [theme.breakpoints.down(640)]: {
    fontSize: '16px',
  },
}));

const FAQAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  fontSize: '14px',
  [theme.breakpoints.down(640)]: {
    fontSize: '12px',
  },
}));

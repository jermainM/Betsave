import React, { useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import { DropableUpload } from "../../components/upload/dropable";
import { FAQItem } from "../../components/Faq";

export const HelpCenter = () => {
  const [data, setData] = useState({
    search: "",
    email: "",
    userName: "",
    description: "",
  });

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleDataChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFAQChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container>
      <HelpCenterContainer>
        <HelpCenterTitle>How can we help you?</HelpCenterTitle>
        <SearchInputContainer>
          <IoSearchOutline style={{ color: "#627691", fontSize: "20px" }} />
          <SearchInput
            placeholder="Ask a question..."
            name={"search"}
            value={data.search}
            onChange={handleDataChange}
          />
          <SearchButton>Search</SearchButton>
        </SearchInputContainer>
        <RequestText>Submit a request</RequestText>
        <TextField
          type="text"
          title="Enter your email"
          name={"email"}
          value={data.email}
          onChange={handleDataChange}
        />
        <TextField
          type="text"
          title="Enter your username"
          name={"userName"}
          value={data.userName}
          onChange={handleDataChange}
        />
        <TextField
          type="textarea"
          title="Description"
          name={"description"}
          value={data.description}
          onChange={handleDataChange}
        />
        <DropableUpload />
        <SubmitButton>Submit Now</SubmitButton>
      </HelpCenterContainer>

      <FAQContainer>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQItemWrapper>
          <FAQItem
            expanded={expanded === "panel1"}
            handleChange={handleFAQChange("panel1")}
            title="How do I receive cashback?"
            content="Cashback is credited to your account in coin monthly based on your betting activity. To redeem your coinds into cash, simply cashout and enjoy!"
          />
          <FAQItem
            expanded={expanded === "panel2"}
            handleChange={handleFAQChange("panel2")}
            title="How do I receive cashback?"
            content="Cashback is credited to your account in coin monthly based on your betting activity. To redeem your coinds into cash, simply cashout and enjoy!"
          />
          <FAQItem
            expanded={expanded === "panel3"}
            handleChange={handleFAQChange("panel3")}
            title="How do I receive cashback?"
            content="Cashback is credited to your account in coin monthly based on your betting activity. To redeem your coinds into cash, simply cashout and enjoy!"
          />
        </FAQItemWrapper>
        <LearnMoreButton>Find More Answers</LearnMoreButton>
      </FAQContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const HelpCenterContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "640px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const HelpCenterTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  [theme.breakpoints.down(640)]: {
    fontSize: "24px",
  },
}));

const SearchInputContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "12px",
  height: "48px",
  backgroundColor: "#0f1629",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px",
  paddingLeft: "12px",
}));

const SearchInput = styled("input")(({ theme }) => ({
  outline: "none",
  height: "36px",
  fontSize: "16px",
  color: "#fff",
  background: "none",
  border: "none",
  width: "80%",
  marginLeft: "12px",
  "::placeholder": {
    color: "#627691",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  width: "95px",
  height: "36px",
  backgroundColor: "#1AE5A1",
  color: "#000",
  fontSize: "14px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  marginRight: "4px",
}));

const RequestText = styled(Typography)(({ theme }) => ({
  marginTop: "20px",
  marginBottom: "20px",
  fontSize: "28px",
}));

interface TextFieldProps {
  title: string;
  name: string;
  value: string;
  type: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

const TextField = (props: TextFieldProps) => {
  const { title, name, value, type, onChange } = props;
  return (
    <TextFieldContainer>
      <TextFieldTitle>
        {title} <span>*</span>
      </TextFieldTitle>
      {type === "textarea" ? (
        <TextArea name={name} value={value} onChange={onChange} />
      ) : (
        <TextInput name={name} value={value} onChange={onChange} />
      )}
    </TextFieldContainer>
  );
};

const TextFieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));

const TextFieldTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  span: {
    color: "#1AE5A1",
  },
}));

const TextArea = styled("textarea")(({ theme }) => ({
  width: "100%",
  height: "240px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#fff",
  background: "none",
  padding: "12px",
  fontSize: "18px",
  fontFamily: "SpaceGrotesk, sans-serif",
}));

const TextInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "48px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#fff",
  background: "none",
  padding: "4px 12px",
  fontSize: "18px",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1AE5A1",
  color: "#000",
  fontSize: "18px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  width: "100%",
  height: "48px",
  borderRadius: "10px",
}));

const FAQContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "center",
  marginTop: "110px",
  width: "100%",
  [theme.breakpoints.down(640)]: {
    marginTop: "70px",
  },
}));

const FAQTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  [theme.breakpoints.down(640)]: {
    fontSize: "24px",
  },
}));

const FAQItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  color: "#0d1321",
  borderRadius: "10px",
  backgroundColor: "#1ae5a1",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "bold",
  marginTop: "18px",
  width: "185px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(640)]: {
    width: "100%",
    fontSize: "18px",
  },
}));

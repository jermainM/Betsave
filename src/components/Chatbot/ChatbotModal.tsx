import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Modal,
  IconButton,
  TextField,
  Button,
  styled,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import { Send, Close, SmartToy } from "@mui/icons-material";
import { API_CONFIG } from "../../config/api.config";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      fetchTestMessage();
    }
  }, [open]);

  const fetchTestMessage = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.AI_BACKEND_URL}/api/chatbot/test`
      );
      const data = await response.json();
      if (data.success) {
        const welcomeMessage: Message = {
          id: "welcome",
          text: data.data.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setShowWelcome(false);
      }
    } catch (error) {
      console.error("Error fetching test message:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      // Create conversation history including the current user message
      const conversationHistory = [
        ...messages.map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text,
        })),
        {
          role: "user",
          content: currentInput,
        },
      ];

      const response = await fetch(
        `${API_CONFIG.AI_BACKEND_URL}/api/chatbot/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: currentInput,
            conversationHistory: conversationHistory,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.data.message || data.message,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ChatContainer>
        <ChatHeader>
          <Box display="flex" alignItems="center" gap={1}>
            <SmartToy sx={{ color: "#1AE5A1", fontSize: "24px" }} />
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontWeight: "600" }}
            >
              BetSave AI Assistant
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "#627691" }}>
            <Close />
          </IconButton>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((message) => (
            <MessageBubble key={message.id} isUser={message.isUser}>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#627691", mt: 1, display: "block" }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </MessageBubble>
          ))}

          {isLoading && (
            <MessageBubble isUser={false}>
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} sx={{ color: "#1AE5A1" }} />
                <Typography variant="body2" sx={{ color: "#627691" }}>
                  Thinking...
                </Typography>
              </Box>
            </MessageBubble>
          )}

          <div ref={messagesEndRef} />
        </MessagesContainer>

        {showWelcome && (
          <QuickQuestionsContainer>
            <Typography
              variant="caption"
              sx={{ color: "#627691", mb: 1, display: "block" }}
            >
              Quick questions:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {[
                "What is BetSave?",
                "How does cashback work?",
                "What are the eligibility requirements?",
                "Which countries are restricted?",
              ].map((question, index) => (
                <QuickQuestionChip
                  key={index}
                  label={question}
                  onClick={() => handleQuickQuestion(question)}
                  size="small"
                />
              ))}
            </Box>
          </QuickQuestionsContainer>
        )}

        <InputContainer>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about BetSave..."
            disabled={isLoading}
            multiline
            maxRows={3}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#0f1629",
                border: "1px solid #2a3441",
                padding: "12px",
                "&:hover": { borderColor: "#3a4a5a" },
                "&.Mui-focused": {
                  //   borderColor: "#1AE5A1",
                  //   boxShadow: "0 0 0 2px rgba(26, 229, 161, 0.2)",
                },
                "& input, & textarea": {
                  color: "#fff",
                  "&::placeholder": { color: "#627691", opacity: 1 },
                },
              },
            }}
          />
          <SendButton
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim()}
            sx={{
              background:
                inputValue.trim() && !isLoading
                  ? "linear-gradient(135deg, #1AE5A1 0%, #00D4AA 100%)"
                  : "#2a3441",
              "&:hover": {
                background:
                  inputValue.trim() && !isLoading
                    ? "linear-gradient(135deg, #15cc8f 0%, #00b894 100%)"
                    : "#3a4a5a",
              },
            }}
          >
            <Send sx={{ fontSize: "18px" }} />
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: "16px",
  marginBottom: "90px",
  [theme.breakpoints.down(1096)]: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "0px",
  },
  [theme.breakpoints.down(480)]: { padding: "8px" },
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "420px",
  height: "600px",
  backgroundColor: "#0f1629",
  borderRadius: "16px",
  border: "1px solid #2a3441",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
  [theme.breakpoints.down(480)]: { height: "500px", borderRadius: "12px" },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 15px",
  borderBottom: "1px solid #2a3441",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "16px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": { background: "#2a3441", borderRadius: "3px" },
  "&::-webkit-scrollbar-thumb:hover": { background: "#3a4a5a" },
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "80%",
  minWidth: "120px",
  padding: "12px 16px",
  borderRadius: "16px",
  alignSelf: isUser ? "flex-end" : "flex-start",
  background: isUser
    ? "linear-gradient(135deg, #1AE5A1 0%, #00D4AA 100%)"
    : "rgba(255, 255, 255, 0.05)",
  border: isUser ? "none" : "1px solid #2a3441",
  color: isUser ? "#141C30" : "#fff",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  hyphens: "auto",
  animation: "fadeIn 0.3s ease-in",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
}));

const QuickQuestionsContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  borderTop: "1px solid #2a3441",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
}));

const QuickQuestionChip = styled(Chip)(({ theme }) => ({
  background: "rgba(26, 229, 161, 0.1)",
  color: "#1AE5A1",
  border: "1px solid rgba(26, 229, 161, 0.3)",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "rgba(26, 229, 161, 0.2)",
    transform: "translateY(-1px)",
  },
  "& .MuiChip-label": { fontSize: "12px" },
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px",
  borderTop: "1px solid #2a3441",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
}));

const SendButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  borderRadius: "50%",
  padding: 0,
  color: "#fff",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": { transform: "scale(1.05)" },
  "&:disabled": { color: "#627691", transform: "none" },
}));

export default ChatbotModal;

import { useState } from "react";
import { Dayjs } from "dayjs";
import {
  Button,
  Dialog,
  DialogTitle,
  FormHelperText,
  styled,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaCalendarAlt } from "react-icons/fa";

export default function DateRangePicker() {
  const [selectedRange, setSelectedRange] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [resultRange, setResultRange] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format date range for button
  const formatDateRange = () => {
    const { startDate, endDate } = resultRange;
    if (startDate && endDate) {
      return `${startDate.format("MMM YYYY")} ~ ${endDate.format("MMM YYYY")}`;
    }
    return "Select Date Range";
  };

  // Handle the date range selection with validation
  const handleDateChange = (
    newStartDate: Dayjs | null,
    newEndDate: Dayjs | null,
  ) => {
    // Check if start date is after end date
    if (newStartDate && newEndDate && newStartDate.isAfter(newEndDate)) {
      setError("Start date cannot be after end date");
    } else {
      setError(null);
      setSelectedRange({ startDate: newStartDate, endDate: newEndDate });
    }
  };

  const handleApply = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      setResultRange({
        startDate: selectedRange.startDate,
        endDate: selectedRange.endDate,
      });
      setOpen(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <SelectRangeButton
          variant="contained"
          color="primary"
          startIcon={<FaCalendarAlt />}
          onClick={() => setOpen(true)}
        >
          {formatDateRange()}
        </SelectRangeButton>

        <StyledDialog open={open} onClose={() => setOpen(false)}>
          <StyledDialogWrapper>
            <DialogTitle>Select Date Range</DialogTitle>
            <StyledDialogContent>
              <div style={{ display: "flex", gap: "20px" }}>
                <div>
                  <DatePicker
                    label="Start Date"
                    value={selectedRange.startDate}
                    onChange={(newValue) =>
                      handleDateChange(newValue, selectedRange.endDate)
                    }
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                </div>
                <div>
                  <DatePicker
                    label="End Date"
                    value={selectedRange.endDate}
                    onChange={(newValue) =>
                      handleDateChange(selectedRange.startDate, newValue)
                    }
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                </div>
              </div>
              {error && <FormHelperText error>{error}</FormHelperText>}
            </StyledDialogContent>
            <StyledDialogAction>
              <ApplyButton onClick={() => handleApply()}>Apply</ApplyButton>
            </StyledDialogAction>
          </StyledDialogWrapper>
        </StyledDialog>
      </div>
    </LocalizationProvider>
  );
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  paddingTop: "10px",
  "& .MuiPaper-root": {
    borderRadius: "17px",
    margin: "16px",
  },
}));

const StyledDialogWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#141C30",
  display: "flex",
  flexDirection: "column",
  borderRadius: "7px",
}));

const StyledDialogContent = styled(DialogTitle)(({ theme }) => ({
  paddingTop: "16px",
}));

const SelectRangeButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "#171e31",
  color: "#627691",
  borderRadius: "5px",
  padding: "8px 16px",
  fontSize: "14px",
}));

const StyledDialogAction = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "10px 20px 20px 20px",
  display: "flex",
  justifyContent: "flex-end",
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "#1AE5A1",
}));

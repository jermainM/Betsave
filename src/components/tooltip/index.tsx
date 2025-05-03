import { Tooltip as MuiTooltip } from "@mui/material";

interface BetsaveTooltipProps {
  children: React.ReactElement;
  title: string;
}

export const BetsaveTooltip = ({ children, title }: BetsaveTooltipProps) => {
  return (
    <>
      <MuiTooltip
        title={title}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#171E31",
              fontSize: "14px",
              padding: "15px",
              borderRadius: "10px",
              "& .MuiTooltip-arrow": {
                color: "#171E31",
              },
            },
          },
        }}
      >
        {children}
      </MuiTooltip>
    </>
  );
};

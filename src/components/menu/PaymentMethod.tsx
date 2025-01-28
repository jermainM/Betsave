import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';

interface MenuProps {
  icon: React.ReactNode;
  name: string;
}

export const PaymentMethodMenu = (props: MenuProps) => {
  const { icon, name } = props;

  return (
    <PaymentMethodMenuContainer>
      <MenuButton endIcon={<KeyboardArrowDown />}>
        <Label>
          <IconContainer>{icon}</IconContainer>
          {name}
        </Label>
      </MenuButton>
      {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu> */}
    </PaymentMethodMenuContainer>
  );
};

const PaymentMethodMenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const MenuButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  padding: '15px',
  height: '50px',
  backgroundColor: '#0f1629',
  width: '100%',
  minWidth: '20px',
  color: '#a9a9b0',
  fontSize: '16px',
  textTransform: 'none',
  [theme.breakpoints.down(480)]: {
    fontSize: '14px',
  },
}));

const Label = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: '18px',
  height: '18px',
  minWidth: '18px',
}));

import { East } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import { IoCashOutline } from 'react-icons/io5';
import { WithdrawProcessCard } from '../../components/card/WithdrawProcessCard';

export const Withdraw = () => {
  return (
    <WithdrawContainer>
      <Heading>
        <HeadingTitle>
          <HeadingTitleIcon>
            <IoCashOutline />
          </HeadingTitleIcon>
          Withdraw
        </HeadingTitle>
        <HeadingContent>
          Redeem your Betsave earnings to PayPal, Amazon, Bitcoin, and more.{' '}
          <br />
          Withdraw to your crypto wallet from $0.50 or to Stake starting at
          $0.25!
        </HeadingContent>
        <HeadingAction>
          Withdrawals <East fontSize="small" />
        </HeadingAction>
      </Heading>
      <WithdrawContent>
        <WithdrawItemGroup>
          <GroupTitle>Most Popular</GroupTitle>
          <WithdrawItemContainer>
            <WithdrawProcessCard title={'Paypal'} img={''} progress={100} />
            <WithdrawProcessCard title={'Visa'} img={''} progress={1.5} />
            <WithdrawProcessCard title={'Amazon'} img={''} progress={0} />
            <WithdrawProcessCard title={'Stake'} img={''} progress={39.18} />
            <WithdrawProcessCard title={'Google Play'} img={''} progress={0} />
          </WithdrawItemContainer>
        </WithdrawItemGroup>
        <WithdrawItemGroup>
          <GroupTitle>Crypto</GroupTitle>
          <WithdrawItemContainer>
            <WithdrawProcessCard title={'Bitcoin'} img={''} progress={49.1} />
            <WithdrawProcessCard title={'Dogecoin'} img={''} progress={0} />
            <WithdrawProcessCard title={'Litecoin'} img={''} progress={4.16} />
            <WithdrawProcessCard title={'Ethereum'} img={''} progress={2.08} />
          </WithdrawItemContainer>
        </WithdrawItemGroup>
      </WithdrawContent>
    </WithdrawContainer>
  );
};

const WithdrawContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  width: '100%',
}));

const Heading = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
}));

const HeadingTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '24px',
  color: '#fff',
  fontWeight: 'bold',
}));

const HeadingTitleIcon = styled(Box)(({ theme }) => ({
  fontSize: '32px',
  color: '#1ae5a1',
  display: 'flex',
  alignItems: 'center',
}));

const HeadingContent = styled(Typography)(({ theme }) => ({
  color: '#627691',
  fontSize: '16px',
}));

const HeadingAction = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#1AE5A1',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
}));

const WithdrawContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '60px',
}));

const WithdrawItemGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  color: '#fff',
  fontWeight: 'bold',
}));

const WithdrawItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
}));

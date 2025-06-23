import { useEffect, useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { ReferralLink } from "../../components/link/referral";
import { FaUser } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";
import { MdArrowOutward } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { TbClockHour8Filled } from "react-icons/tb";
import { FaLink, FaUsers, FaDollarSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNotification } from "../../provider/notification";
import { referralService } from "../../api/services/referralService";

interface MetricsData {
  totalReferralsLength: number;
  totalEarnings: number;
  totalPendingPayments: number;
}

export const ReferralProgram = () => {
  const { user } = useSelector((state: RootState) => state.session);
  const [referCode, setReferCode] = useState("");
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const { notifySuccess } = useNotification();

  const getReferCode = () => {
    if (!user || !user.betsaveId) {
      return;
    }

    const betsaveId = user.betsaveId;
    const referralCode = betsaveId.split("_")[1];
    setReferCode(referralCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode).then(() => {
      notifySuccess("Referral link copied to clipboard!");
    });
  };

  const getMetricsData = async () => {
    if (!user || !user.betsaveId) {
      return;
    }

    try {
      const response = await referralService.getReferralMetrics(user.betsaveId);
      console.log(response);
      setMetricsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReferCode();
    if (user && user.betsaveId) {
      getMetricsData();
    }
  }, [user]);

  return (
    <Container>
      <ReferralTitleContainer>
        <ReferralTitle>
          Share & Earn <span>$10</span> per referral!
        </ReferralTitle>
        <ReferralSubTitle>
          Share Your Link & Earn Rewards for Every Referral!
        </ReferralSubTitle>
      </ReferralTitleContainer>

      <ReferralLinkContainer>
        <ReferralLinkBox>
          <BoxTitle>Your referral Link</BoxTitle>
          <ReferralCopyContainer>
            <ReferralCode
              isEditable={false}
              value={`${window.location.origin}/r?ref=${referCode}`}
              onChange={(value) => setReferCode(value)}
            />
            <ReferralCopyAction>
              <EditButton>
                <BiSolidEditAlt />
              </EditButton>
              <CopyButton onClick={handleCopy}>Copy</CopyButton>
            </ReferralCopyAction>
          </ReferralCopyContainer>
        </ReferralLinkBox>
        <ReferralLinkBox>
          <BoxTitle>Share your referral Link</BoxTitle>
          <ReferralShareBox>
            <ReferralLink
              icon={<FaYoutube style={{ width: "100%", height: "100%" }} />}
              link="https://youtube.com/"
            />
            <ReferralLink
              icon={<FaTwitter style={{ width: "100%", height: "100%" }} />}
              link="https://x.com/"
            />
            <ReferralLink
              icon={
                <AiFillInstagram style={{ width: "100%", height: "100%" }} />
              }
              link="https://instagram.com/"
            />
            <ReferralLink
              icon={<FaTiktok style={{ width: "100%", height: "100%" }} />}
              link="https://tiktok.com/"
            />
            <ReferralLink
              icon={<FaFacebookF style={{ width: "100%", height: "100%" }} />}
              link="https://facebook.com/"
            />
            <ReferralLink
              icon={
                <FaTelegramPlane style={{ width: "100%", height: "100%" }} />
              }
              link="https://telegram.com/"
            />
          </ReferralShareBox>
        </ReferralLinkBox>
      </ReferralLinkContainer>

      <UserInfoContainer>
        <UserInfoItem
          icon={<FaUser />}
          title="Total Earnings"
          value={metricsData?.totalEarnings ?? 0}
          percent={27.4}
        />
        <UserInfoItem
          icon={<IoAnalytics />}
          title="Referrals Sent"
          value={metricsData?.totalReferralsLength ?? 0}
          percent={27.4}
        />
        <UserInfoItem
          icon={<TbClockHour8Filled />}
          title="Pending Payments"
          value={metricsData?.totalPendingPayments ?? 0}
          percent={27.4}
        />
      </UserInfoContainer>

      <ExplainContainer>
        <ExplainTitle>How it works</ExplainTitle>
        <ExplainItemContainer>
          <ExplainItem
            icon={<FaLink />}
            title="Copy your unique referral link"
            content="Copy your unique referral link and start earning today! Get $10 per referral. The more you share, the more you earn."
          />
          <ExplainItemWrapper>
            <ExplainItem
              icon={<FaUsers />}
              title="Share it with friends"
              content="Invite friends, expand your network, and earn rewards for every successful referral!"
              percent={30}
            />
            <ExplainItem
              icon={<FaDollarSign />}
              title="$10 per Sign up & Deposit"
              content="Earn $10 when your friends sign up and deposit! The more you refer, the more you earn."
            />
          </ExplainItemWrapper>
        </ExplainItemContainer>
      </ExplainContainer>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}));

const ReferralTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
}));

const ReferralTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "normal",
  textAlign: "center",
  span: {
    color: "#1AE5A1",
  },
}));

const ReferralSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
  textAlign: "center",
}));

const ReferralLinkContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down(1450)]: {
    flexDirection: "column",
  },
}));

const ReferralLinkBox = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "15px",
  backgroundColor: "#0f1629",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  [theme.breakpoints.down(360)]: {
    padding: "20px",
  },
}));

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  [theme.breakpoints.down(360)]: {
    fontSize: "16px",
  },
}));

const ReferralCopyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  backgroundColor: "#0d1321",
  padding: "10px",
  borderRadius: "7px",
  [theme.breakpoints.down(420)]: {
    flexDirection: "column",
  },
}));

interface ReferralCodeProps {
  isEditable: boolean;
  value: string;
  onChange: (value: string) => void;
}

const ReferralCode = (props: ReferralCodeProps) => {
  const { isEditable, value, onChange } = props;
  return (
    <ReferralCodeContainer
      disabled={!isEditable}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const ReferralCodeContainer = styled("input")(({ theme }) => ({
  fontSize: "16px",
  color: "#627691",
  padding: "8px 14px",
  borderRadius: "4px",
  backgroundColor: "#0d1321",
  outline: "none",
  textDecoration: "none",
  border: "none",
  width: "100%",
  [theme.breakpoints.down(876)]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down(420)]: {
    textAlign: "center",
  },
}));

const ReferralCopyAction = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#172235",
  width: "32px",
  height: "32px",
  minWidth: "32px",
  borderRadius: "7px",
  color: "#627691",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(255, 255, 255, 0.2)",
}));

const CopyButton = styled(Button)(({ theme }) => ({
  width: "74px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  fontSize: "16px",
  color: "#000",
  backgroundColor: "#1AE5A1",
  fontWeight: "bold",
}));

const ReferralShareBox = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "7px",
  backgroundColor: "#0d1321",
  padding: "18px 20px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  justifyContent: "space-between",
  [theme.breakpoints.down(360)]: {
    padding: "10px 12px",
  },
}));

const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  [theme.breakpoints.down(1520)]: {
    flexDirection: "column",
  },
}));

interface UserInfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  percent: number;
}

const UserInfoItem = (props: UserInfoItemProps) => {
  const { icon, title, value, percent } = props;
  return (
    <UserInfoItemContainer>
      <UserInfoItemHeader>
        <UserInfoItemTitle>
          <UserInfoItemIcon>{icon}</UserInfoItemIcon>
          {title}
        </UserInfoItemTitle>
        <MoreButton>
          <TfiMoreAlt />
        </MoreButton>
      </UserInfoItemHeader>
      <UserInfoItemContent>
        {value}
        <RevenueBadge>
          {percent}% <MdArrowOutward />
        </RevenueBadge>
      </UserInfoItemContent>
    </UserInfoItemContainer>
  );
};

const UserInfoItemContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "10px 20px 20px 30px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  backgroundColor: "#0f1629",
  borderRadius: "15px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const UserInfoItemHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));

const UserInfoItemContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "28px",
  color: "#fff",
}));

const UserInfoItemTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "14px",
  color: "#627691",
}));

const UserInfoItemIcon = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  color: "#627691",
}));

const MoreButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  color: "#627691",
  width: "42px",
  height: "42px",
  minWidth: "42px",
  borderRadius: "50%",
  fontSize: "22px",
}));

const RevenueBadge = styled(Box)({
  backgroundColor: "#102B35",
  color: "#1AE5A1",
  padding: "4px 8px",
  borderRadius: "5px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

const ExplainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  marginTop: "20px",
}));

const ExplainTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  color: "#fff",
  fontWeight: "bold",
  [theme.breakpoints.down(360)]: {
    fontSize: "16px",
  },
}));

const ExplainItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

interface ExplainItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  percent?: number;
}

const ExplainItem = (props: ExplainItemProps) => {
  const { icon, title, content, percent } = props;
  return (
    <ExplainItemBox>
      {percent && (
        <BadgeContainer>
          <RevenueBadge>+{percent}%</RevenueBadge>
        </BadgeContainer>
      )}
      <ExplainItemIcon>{icon}</ExplainItemIcon>
      <ExplainItemContent>
        <ExplainItemTitle>{title}</ExplainItemTitle>
        <ExplainItemValue>{content}</ExplainItemValue>
      </ExplainItemContent>
    </ExplainItemBox>
  );
};

const ExplainItemBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderRadius: "15px",
  width: "100%",
  display: "flex",
  gap: "20px",
  backgroundColor: "#0f1629",
  position: "relative",
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "15px",
  top: "15px",
  [theme.breakpoints.down(420)]: {
    top: "-15px",
  },
}));

const ExplainItemIcon = styled(Box)(({ theme }) => ({
  width: "36px",
  minWidth: "36px",
  height: "36px",
  borderRadius: "7px",
  backgroundColor: "#1ae5a1",
  fontSize: "20px",
  color: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down(480)]: {
    width: "32px",
    minWidth: "32px",
    height: "32px",
    fontSize: "16px",
  },
}));

const ExplainItemContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

const ExplainItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#fff",
  [theme.breakpoints.down(480)]: {
    fontSize: "18px",
  },
}));

const ExplainItemValue = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: "#627691",
  [theme.breakpoints.down(480)]: {
    fontSize: "14px",
  },
}));

const ExplainItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down(1480)]: {
    flexDirection: "column",
  },
}));

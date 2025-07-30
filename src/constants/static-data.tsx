import { IoAnalytics } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";
import { FaHistory, FaBookmark } from "react-icons/fa";

import { IoMdHome, IoMdSettings } from "react-icons/io";
import { SlEarphonesAlt } from "react-icons/sl";

import { styled } from "@mui/material";

import {
  BetOffersIcon,
  BookMakerIcon,
  GreenCashbackRateIcon,
  CheckIcon,
  GreenAbleOfferPng,
  GreenAffiliatePng,
  GreenLeaderboardPng,
  GreenMaxmizeWinIcon,
  GreenMyOfferPng,
  GreenPromoOfferPng,
  GreenRewardPng,
  GreenSeemslessIcon,
  GreenTopTierIcon,
  GreenTransparentPayoutIcon,
  GreenWithdrawPng,
  GreenHighStakeBettorsIcon,
  GreenHorseRaceIcon,
  Layer85Img,
  Layer87Img,
  Layer94Img,
  Mobile1Img,
  Mobile2Img,
  Mobile3Img,
  PayoutIcon,
  GreenExPromotionIcon,
  GreenReferralBonusIcon,
  GreenSignupOfferIcon,
  GreenSportsBetIcon,
  GreenCoin,
  BlackjackPng,
  SlotsPng,
  RoulettePng,
  CrashPng,
  DealerPng,
  UnicornPng,
  FootballPng,
  BasketPng,
  GlovesPng,
  GamepadPng,
  TopBetPng,
  CashbackPng,
  MessagePng,
  CalendarPng,
} from "./images";

const IconImg = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

export const STATIC_DATA = {
  whychoose: [
    {
      img: GreenMaxmizeWinIcon,
      title: "Maximize Your Wins",
      content:
        "Even when the odds are against you, earn guaranteed cashback on every bet.",
    },
    {
      img: GreenTopTierIcon,
      title: "Top-Tier Partners",
      content: "Access the best bookmakers in the industry",
    },
    {
      img: GreenSeemslessIcon,
      title: "Seamless Experience",
      content: "User-friendly platforms, no hidden fees, no hassle.",
    },
    {
      img: GreenTransparentPayoutIcon,
      title: "Transparent Payouts",
      content:
        "See exactly how much you’re earning and cashout your rewards every monthly",
    },
    {
      img: GreenTopTierIcon,
      title: "Top-Tier Partners",
      content: "Access the best bookmakers in the industry",
    },
    {
      img: GreenTransparentPayoutIcon,
      title: "Transparent Payouts",
      content:
        "See exactly how much you’re earning and cashout your rewards every monthly",
    },
    {
      img: GreenMaxmizeWinIcon,
      title: "Maximize Your Wins",
      content:
        "Even when the odds are against you, earn guaranteed cashback on every bet.",
    },
    {
      img: GreenSeemslessIcon,
      title: "Seamless Experience",
      content: "User-friendly platforms, no hidden fees, no hassle.",
    },
    {
      img: GreenMaxmizeWinIcon,
      title: "Maximize Your Wins",
      content:
        "Even when the odds are against you, earn guaranteed cashback on every bet.",
    },
    {
      img: GreenSeemslessIcon,
      title: "Seamless Experience",
      content: "User-friendly platforms, no hidden fees, no hassle.",
    },
  ],
  categories: [
    {
      img: GreenSportsBetIcon,
      title: "Sports Betting",
      content: "Place bets on your favorite teams and earn cashback",
      action: "Explore Cashback",
      link: "/",
    },
    {
      img: GreenHorseRaceIcon,
      title: "Horce Racing",
      content: "Bet on horce races and earn big cashback.",
      action: "Explore Racing Offers",
      link: "/",
    },
    {
      img: GreenSignupOfferIcon,
      title: "Sign-Up Offers",
      content: "Join new sportsbooks and get exclusive cashback deals.",
      action: "View Signup Offers",
      link: "/",
    },
    {
      img: GreenHighStakeBettorsIcon,
      title: "High-Stakes Bettors",
      content: "Earn additional cashback rewards for higher betting volumes",
      action: "Learn About Cashback",
      link: "/",
    },
    {
      img: GreenReferralBonusIcon,
      title: "Referral Bonuses",
      content: "Refer friends and earn cashback from their bets.",
      action: "Start Referring",
      link: "/",
    },
    {
      img: GreenExPromotionIcon,
      title: "Exclusive Promotions",
      content:
        "Get access to cashback offers for major sports events and races",
      action: "View Promotions",
      link: "/",
    },
  ],
  reason: [
    {
      img: GreenCashbackRateIcon,
      title: "Highest Cashback Rates",
      content: "Earn up to 10% cashback on your sports and horce racing bets.",
      link: "/",
    },
    {
      img: BetOffersIcon,
      title: "Exclusive Betting Offers",
      content: "Unlock exclusive partner promotions and bonuses today.",
      link: "/",
    },
    {
      img: PayoutIcon,
      title: "Easy Payouts",
      content:
        "Withdraw your rewards instantly via PayPal, back transfer, or gift cards.",
      link: "/",
    },
  ],
  earnCashback: [
    {
      img: Mobile1Img,
      icon: BookMakerIcon,
      title: "Choose a Bookmaker",
      content:
        "Browse our list of trusted bookmakers and sign up through our platform to unlock exclusive cashback offers!",
    },
    {
      img: Mobile2Img,
      icon: CheckIcon,
      title: "Place Your Bets",
      content:
        "Bet as you normally would on your favorite sports and races. No extra steps or hidden fees!",
    },
    {
      img: Mobile3Img,
      icon: GreenCoin,
      title: "Get Your Cashback",
      content:
        "Your cashback will be tracked and added to your account automatically. Withdraw monthly!",
    },
  ],
  giftcard: [
    {
      img: Layer85Img,
      icon: BookMakerIcon,
      title: "Place Your Bets",
      content:
        "Choose your favorite bookmaker, bet on sports, horce racing, or live events. The more you bet, the more cashback you earn!",
    },
    {
      img: Layer87Img,
      icon: CheckIcon,
      title: "Get Instant Cashback",
      content:
        "Track your earnings in real-time. Every bet earns you cashback based on our rewards tiers up to 10% for top bettors.",
    },
    {
      img: Layer94Img,
      icon: GreenCoin,
      title: "Cash Out Monthly",
      content:
        "Withdraw your cashback easily via bank transfers, PayPal, or gift cards",
    },
  ],
  navListItems: [
    {
      icon: <IconImg src={GreenPromoOfferPng} alt="nav-item-img" />,
      name: "Promotional Offers",
      idx: 0,
    },
    {
      icon: <IconImg src={GreenAbleOfferPng} alt="nav-item-img" />,
      name: "Offers",
      hasBadge: true,
      idx: 1,
    },
    {
      icon: <IconImg src={GreenMyOfferPng} alt="nav-item-img" />,
      name: "My Offers",
      idx: 2,
    },
    // {
    //   icon: <IconImg src={GreenWithdrawPng} alt="nav-item-img" />,
    //   name: "Withdraw",
    //   idx: 3,
    // },
    {
      icon: <IconImg src={GreenLeaderboardPng} alt="nav-item-img" />,
      name: "Leaderboard",
      idx: 4,
    },
    {
      icon: <IconImg src={GreenRewardPng} alt="nav-item-img" />,
      name: "Rewards",
      idx: 5,
    },
    {
      icon: <IconImg src={GreenAffiliatePng} alt="nav-item-img" />,
      name: "Affiliates",
      idx: 6,
    },
  ],
  accountListItems: [
    {
      icon: <IoMdHome style={{ width: "100%", height: "100%" }} />,
      name: "Dashboard",
      idx: 0,
    },
    {
      icon: <FaHistory style={{ width: "100%", height: "100%" }} />,
      name: "Cashback History",
      hasBadge: true,
      idx: 1,
    },
    {
      icon: <FaBookmark style={{ width: "100%", height: "100%" }} />,
      name: "Partner List",
      idx: 2,
    },
    {
      icon: <IoAnalytics style={{ width: "100%", height: "100%" }} />,
      name: "Referral Program",
      idx: 3,
    },
    {
      icon: <MdLocalOffer style={{ width: "100%", height: "100%" }} />,
      name: "Promo codes",
      idx: 4,
    },
    {
      icon: <IoMdSettings style={{ width: "100%", height: "100%" }} />,
      name: "Account Settings",
      idx: 5,
    },
    {
      icon: <SlEarphonesAlt style={{ width: "100%", height: "100%" }} />,
      name: "Help Center",
      idx: 6,
    },
  ],
  casinoItems: [
    {
      title: "SLOTS",
      onlineMembers: 729,
      link: "/",
      img: SlotsPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #152130 29.04%, #00EEFF 225.53%)",
        buttonBorder: "2px solid rgba(53, 252, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #35FCFF 0%, #00979B 100%)",
      },
    },
    {
      title: "BLACKJACK",
      onlineMembers: 1890,
      link: "/",
      img: BlackjackPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #201530 29.04%, #FF00FB 225.53%)",
        buttonBorder: "2px solid rgba(255, 110, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #FF2EFC 0%, #A500A1 100%)",
      },
    },
    {
      title: "ROULETTE",
      onlineMembers: 569,
      link: "/",
      img: RoulettePng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #151A30 29.04%, #005EFF 225.53%)",
        buttonBorder: "2px solid rgba(119, 201, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #77C9FF 0%, #005EFF 100%)",
      },
    },
    {
      title: "CRASH",
      onlineMembers: 321,
      link: "/",
      img: CrashPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #151930 29.04%, #5E00FF 225.53%)",
        buttonBorder: "2px solid rgba(154, 95, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #853EFF 0%, #360AD7 100%)",
      },
    },
    {
      title: "DEALER",
      onlineMembers: 1072,
      link: "/",
      img: DealerPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #151A30 29.04%, #D0FF00 225.53%)",
        buttonBorder: "2px solid rgba(223, 255, 82, 1)",
        buttonBackground: "linear-gradient(180deg, #D6FF21 0%, #6C9B00 100%)",
      },
    },
  ],

  sportsbookItems: [
    {
      title: "RACING",
      onlineMembers: 729,
      link: "/",
      img: UnicornPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #201530 29.04%, #FF00FB 225.53%)",
        buttonBorder: "2px solid rgba(255, 110, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #FF2EFC 0%, #A500A1 100%)",
      },
    },
    {
      title: "FOOTBALL",
      onlineMembers: 1890,
      link: "/",
      img: FootballPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #151930 29.04%, #5E00FF 225.53%)",
        buttonBorder: "2px solid rgba(154, 95, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #853EFF 0%, #360AD7 100%)",
      },
    },
    {
      title: "BASKETBALL",
      onlineMembers: 1890,
      link: "/",
      img: BasketPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #281613 29.04%, #FF5500 225.53%)",
        buttonBorder: "2px solid rgba(255, 127, 84, 1)",
        buttonBackground: "linear-gradient(180deg, #FF7F54 0%, #A92D00 100%)",
      },
    },
    {
      title: "UFC",
      onlineMembers: 1072,
      link: "/",
      img: GlovesPng,
      style: {
        linearColor:
          "linear-gradient(128.24deg, #301523 28.35%, #FF002F 226.66%)",
        buttonBorder: "2px solid rgba(255, 85, 116, 1)",
        buttonBackground: "linear-gradient(180deg, #FF5574 0%, #A8001F 100%)",
      },
    },
    {
      title: "ESPORTS",
      onlineMembers: 321,
      link: "/",
      img: GamepadPng,
      style: {
        linearColor:
          "linear-gradient(126.11deg, #151930 29.04%, #9000FF 225.53%)",
        buttonBorder: "2px solid rgba(178, 78, 255, 1)",
        buttonBackground: "linear-gradient(180deg, #B24EFF 0%, #6700B6 100%)",
      },
    },
  ],

  reasonData: [
    {
      icon: TopBetPng,
      title: "Top Betting & Casino Brands",
      subTitle: "Access leading sportsbooks and online casinos. ",
    },
    {
      icon: CashbackPng,
      title: "Cashback on Net Losses",
      subTitle: "Earn monthly cashback based on your net losses (NGR).",
    },
    {
      icon: MessagePng,
      title: "Simple & Seamless Platform",
      subTitle: "Track offers, activity, and rewards easily.",
    },
    {
      icon: CalendarPng,
      title: "Monthly Payouts",
      subTitle: "Receive cashback monthly with secure withdrawals.",
    },
  ],
  cashbackChallenges: [
    {
      navTitle: "Cashback Challenges",
      title: "Cashback Multiplier Challenges",
      subTitle:
        "Boost Your Cashback by Completing Challenges and Unlock Amazing Rewards.",
    },
    {
      navTitle: "Referral Missions",
      title: "Referral Missions",
      subTitle:
        "Refer friends and earn rewards when they make a minimum $20 deposit.",
    },
    {
      navTitle: "Streak Bonuses",
      title: "Streak Bonuses",
      subTitle: "Bet consistently and earn extra rewards!",
    },
    // {
    //   navTitle: "Loyalty Program",
    //   title: "Loyalty Program",
    //   subTitle: "The more you bet, the higher your rewards.",
    // },
  ],
};

export const TIER_CONFIG = {
  BRONZE: {
    min: 0,
    max: 499,
    cashbackRate: 5,
    name: "Bronze",
  },
  SILVER: {
    min: 500,
    max: 1499,
    cashbackRate: 7.5,
    name: "Silver",
  },
  GOLD: {
    min: 1500,
    max: 9999,
    cashbackRate: 10,
    name: "Gold",
  },
  PLATINUM: {
    min: 10000,
    max: Infinity,
    cashbackRate: 12.5,
    name: "Platinum",
  },
};

export const TIER_LIST = ["Bronze", "Silver", "Gold", "Platinum"];

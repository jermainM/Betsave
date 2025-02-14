import MaximizeIcon from '../assets/maximize.png';
import PartnerIcon from '../assets/partner.png';
import SeamlessIcon from '../assets/seamless.png';
import PaymoenyIcon from '../assets/pay-money-icon.png';

import SportsBetIcon from '../assets/sports-bet.png';
import HorseRaceIcon from '../assets/horce-race.png';
import SignupOfferIcon from '../assets/signup-offer.png';
import HighStakeBettorsIcon from '../assets/high-stakes-bettors.png';
import ReferralBonusIcon from '../assets/referral.png';
import PromotionIcon from '../assets/promotion.png';

import CashbackRateIcon from '../assets/esp/green/money-return.svg';
import BetOffersIcon from '../assets/offer-icon.png';
import PayoutIcon from '../assets/payout.png';

import Mobile1Img from '../assets/mobile-1.png';
import Mobile2Img from '../assets/mobile-2.png';
import Mobile3Img from '../assets/mobile-3.png';
import BookMakerIcon from '../assets/bookmaker.png';
import CheckIcon from '../assets/check.png';
import WalletOutlinedIcon from '../assets/wallet-outline.png';

import Layer85Img from '../assets/Layer-85.png';
import Layer87Img from '../assets/Layer-87.jpg';
import Layer94Img from '../assets/Layer-94.jpg';

import { GiMoneyStack } from 'react-icons/gi';
import { IoGameController, IoCashOutline, IoAnalytics } from 'react-icons/io5';
import { MdLocalOffer, MdLeaderboard } from 'react-icons/md';
import { FaAward } from 'react-icons/fa6';
import { FaUsers, FaHistory, FaBookmark } from 'react-icons/fa';

import { IoMdHome, IoMdSettings } from 'react-icons/io';
import { SlEarphonesAlt } from 'react-icons/sl';

import GrayAffiliateSvg from '../assets/GrayIcons/Affiliates.svg';
import GrayAbleOfferSvg from '../assets/GrayIcons/Available-offers.svg';
import GrayLeaderboardSvg from '../assets/GrayIcons/Leaderboard.svg';
import GrayMyOfferSvg from '../assets/GrayIcons/My-offers.svg';
import GrayPromoOfferSvg from '../assets/GrayIcons/Promotional-offers.svg';
import GrayRewardSvg from '../assets/GrayIcons/Reward.svg';
import GrayWithdrawSvg from '../assets/GrayIcons/Withdraw.svg';

import GreenAffiliateSvg from '../assets/GreenIcons/Affiliates.svg';
import GreenAbleOfferSvg from '../assets/GreenIcons/Available-offers.svg';
import GreenLeaderboardSvg from '../assets/GreenIcons/Leaderboard.svg';
import GreenMyOfferSvg from '../assets/GreenIcons/My-offers.svg';
import GreenPromoOfferSvg from '../assets/GreenIcons/Promotional-offers.svg';
import GreenRewardSvg from '../assets/GreenIcons/Reward.svg';
import GreenWithdrawSvg from '../assets/GreenIcons/Withdraw.svg';
import { styled } from '@mui/material';
import {
  GreenMaxmizeWinIcon,
  GreenSeemslessIcon,
  GreenTopTierIcon,
  GreenTransparentPayoutIcon,
} from './images';

const IconImg = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

export const STATIC_DATA = {
  whychoose: [
    {
      img: GreenMaxmizeWinIcon,
      title: 'Maximize Your Wins',
      content:
        'Even when the odds are against you, earn guaranteed cashback on every bet.',
    },
    {
      img: GreenTopTierIcon,
      title: 'Top-Tier Partners',
      content: 'Access the best bookmakers in the industry',
    },
    {
      img: GreenSeemslessIcon,
      title: 'Seamless Experience',
      content: 'User-friendly platforms, no hidden fees, no hassle.',
    },
    {
      img: GreenTransparentPayoutIcon,
      title: 'Transparent Payouts',
      content:
        'See exactly how much you’re earning and cashout your rewards every fortnight',
    },
    {
      img: GreenTopTierIcon,
      title: 'Top-Tier Partners',
      content: 'Access the best bookmakers in the industry',
    },
    {
      img: GreenTransparentPayoutIcon,
      title: 'Transparent Payouts',
      content:
        'See exactly how much you’re earning and cashout your rewards every fortnight',
    },
    {
      img: GreenMaxmizeWinIcon,
      title: 'Maximize Your Wins',
      content:
        'Even when the odds are against you, earn guaranteed cashback on every bet.',
    },
    {
      img: GreenSeemslessIcon,
      title: 'Seamless Experience',
      content: 'User-friendly platforms, no hidden fees, no hassle.',
    },
    {
      img: GreenMaxmizeWinIcon,
      title: 'Maximize Your Wins',
      content:
        'Even when the odds are against you, earn guaranteed cashback on every bet.',
    },
    {
      img: GreenSeemslessIcon,
      title: 'Seamless Experience',
      content: 'User-friendly platforms, no hidden fees, no hassle.',
    },
  ],
  categories: [
    {
      img: SportsBetIcon,
      title: 'Sports Betting',
      content: 'Place bets on your favorite teams and earn cashback',
      action: 'Explore Cashback',
      link: '/',
    },
    {
      img: HorseRaceIcon,
      title: 'Horce Racing',
      content: 'Bet on horce races and earn big cashback.',
      action: 'Explore Racing Offers',
      link: '/',
    },
    {
      img: SignupOfferIcon,
      title: 'Sign-Up Offers',
      content: 'Join new sportsbooks and get exclusive cashback deals.',
      action: 'View Signup Offers',
      link: '/',
    },
    {
      img: HighStakeBettorsIcon,
      title: 'High-Stakes Bettors',
      content: 'Earn additional cashback rewards for higher betting volumes',
      action: 'Learn About Cashback',
      link: '/',
    },
    {
      img: ReferralBonusIcon,
      title: 'Referral Bonuses',
      content: 'Refer friends and earn cashback from their bets.',
      action: 'Start Referring',
      link: '/',
    },
    {
      img: PromotionIcon,
      title: 'Exclusive Promotions',
      content:
        'Get access to cashback offers for major sports events and races',
      action: 'View Promotions',
      link: '/',
    },
  ],
  reason: [
    {
      img: CashbackRateIcon,
      title: 'Highest Cashback Rates',
      content: 'Earn up to 7% cashback on your sports and horce racing bets.',
      link: '/',
    },
    {
      img: BetOffersIcon,
      title: 'Exclusive Betting Offers',
      content: 'Unlock exclusive partner promotions and bonuses today.',
      link: '/',
    },
    {
      img: PayoutIcon,
      title: 'Easy Payouts',
      content:
        'Withdraw your rewards instantly via PayPal, back transfer, or gift cards.',
      link: '/',
    },
  ],
  earnCashback: [
    {
      img: Mobile1Img,
      icon: BookMakerIcon,
      title: 'Choose a Bookmaker',
      content:
        'Browse our list of trusted bookmakers and sign up through our platform to unlock exclusive cashback offers!',
    },
    {
      img: Mobile2Img,
      icon: CheckIcon,
      title: 'Place Your Bets',
      content:
        'Bet as you normally would on your favorite sports and races. No extra steps or hidden fees!',
    },
    {
      img: Mobile3Img,
      icon: WalletOutlinedIcon,
      title: 'Get Your Cashback',
      content:
        'Your cashback will be tracked and added to your account automatically. Withdraw anytime!',
    },
  ],
  giftcard: [
    {
      img: Layer85Img,
      icon: BookMakerIcon,
      title: 'Place Your Bets',
      content:
        'Choose your favorite bookmaker, bet on sports, horce racing, or live events. The more you bet, the more cashback you earn!',
    },
    {
      img: Layer87Img,
      icon: CheckIcon,
      title: 'Get Instant Cashback',
      content:
        'Track your earnings in real-time. Every bet earns you cashback based on our rewards tiers up to 10% for top bettors.',
    },
    {
      img: Layer94Img,
      icon: WalletOutlinedIcon,
      title: 'Cash Out Anytime',
      content:
        'Withdraw your cashback easily via back transfers e-wallets, or gift cards for sportswear, race day ticket, and more.',
    },
  ],
  navListItems: [
    {
      icon: <IconImg src={GrayPromoOfferSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenPromoOfferSvg} alt="nav-item-img" />,
      name: 'Promotional Offers',
      idx: 0,
    },
    {
      icon: <IconImg src={GrayAbleOfferSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenAbleOfferSvg} alt="nav-item-img" />,
      name: 'Available Offers',
      hasBadge: true,
      idx: 1,
    },
    {
      icon: <IconImg src={GrayMyOfferSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenMyOfferSvg} alt="nav-item-img" />,
      name: 'My Offers',
      idx: 2,
    },
    {
      icon: <IconImg src={GrayWithdrawSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenWithdrawSvg} alt="nav-item-img" />,
      name: 'Withdraw',
      idx: 3,
    },
    {
      icon: <IconImg src={GrayLeaderboardSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenLeaderboardSvg} alt="nav-item-img" />,
      name: 'Leaderboard',
      idx: 4,
    },
    {
      icon: <IconImg src={GrayRewardSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenRewardSvg} alt="nav-item-img" />,
      name: 'Rewards',
      idx: 5,
    },
    {
      icon: <IconImg src={GrayAffiliateSvg} alt="nav-item-img" />,
      selectedIcon: <IconImg src={GreenAffiliateSvg} alt="nav-item-img" />,
      name: 'Affiliates',
      idx: 6,
    },
  ],
  accountListItems: [
    {
      icon: <IoMdHome style={{ width: '100%', height: '100%' }} />,
      name: 'Dashboard',
      idx: 0,
    },
    {
      icon: <FaHistory style={{ width: '100%', height: '100%' }} />,
      name: 'Cashback History',
      hasBadge: true,
      idx: 1,
    },
    {
      icon: <FaBookmark style={{ width: '100%', height: '100%' }} />,
      name: 'Bookmaker List',
      idx: 2,
    },
    {
      icon: <IoAnalytics style={{ width: '100%', height: '100%' }} />,
      name: 'Referral Program',
      idx: 3,
    },
    {
      icon: <MdLocalOffer style={{ width: '100%', height: '100%' }} />,
      name: 'Promo codes',
      idx: 4,
    },
    {
      icon: <IoMdSettings style={{ width: '100%', height: '100%' }} />,
      name: 'Account Settings',
      idx: 5,
    },
    {
      icon: <SlEarphonesAlt style={{ width: '100%', height: '100%' }} />,
      name: 'Help Center',
      idx: 6,
    },
  ],
};

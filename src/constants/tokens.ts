import adaIcon from "../assets/crypto/ada.svg";
import btcIcon from "../assets/crypto/btc.svg";
import dogeIcon from "../assets/crypto/doge.svg";
import ethIcon from "../assets/crypto/eth.svg";
import solIcon from "../assets/crypto/sol.svg";
import usdcIcon from "../assets/crypto/usdc.svg";
import usdtIcon from "../assets/crypto/usdt.svg";
import xrpIcon from "../assets/crypto/xrp.svg";
import bnbIcon from "../assets/crypto/bnb.svg";
import trxIcon from "../assets/crypto/trx.svg";

interface Token {
  symbol: string;
  name: string;
  icon: string;
} 

export const tokens: Token[] = [
  {
    symbol: 'ADA',
    name: 'Cardano',
    icon: adaIcon,
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: bnbIcon,
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: btcIcon,
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    icon: dogeIcon,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: ethIcon,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    icon: solIcon,
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    icon: trxIcon,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: usdcIcon,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    icon: usdtIcon,
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    icon: xrpIcon,
  },
]; 
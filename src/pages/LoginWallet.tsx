import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import Footer from '../pages/Footer'; // Import the Footer component

const WalletSelectionPage = () => {
    return (
        <div className="WalletSelectionPage">
            <h1 className='welcome-title'>Aptos Rock-Paper-Scissors</h1>
            <WalletSelector />
            <Footer />
        </div>
    );
};

export default WalletSelectionPage;

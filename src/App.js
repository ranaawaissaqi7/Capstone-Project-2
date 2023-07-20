
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Routing from './routing/Routing';
import UserProductProvider from './context/userProduct/UserProduct';
import PaymentCardProvider from './context/paymentCard/PaymentCard';



function App() {
  return (
    <>
    
  <UserProductProvider>
    <PaymentCardProvider>
    <Routing/>
    </PaymentCardProvider>
    </UserProductProvider>
    
    </>
  );
}

export default App;

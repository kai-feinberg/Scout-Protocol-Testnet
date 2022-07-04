import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import Contacts from "./components/Contacts";

const App = () => (

  <div className="min-h-screen">
    <div className ="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Contacts/>
    <Transactions />
    <Footer />
  </div>
);

export default App;

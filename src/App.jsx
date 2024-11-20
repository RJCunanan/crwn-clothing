import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";

const Shop = () => {
  return (
    <div>
      I am the shop page
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />  {/* Renders Home route component on the "/" path */}
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App
import { FC, useState } from "react";
import reactLogo from "../assets/react.svg";
// import Form from '../components/assets/Form'
import Form from "@Components/Form"

const Home: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Form
        placeholder={ "login" }
      />
    </div>
  );
};

export default Home
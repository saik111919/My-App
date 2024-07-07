import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to={'/expenses'} className="btn btn-outline-primary" >
        Expense Traker
      </Link>
    </>
  );
};

export default Home;

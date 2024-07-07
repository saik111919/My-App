// import { Component } from "react";
// import PropTypes from "prop-types";

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("ErrorBoundary caught an error", error, errorInfo);
//     this.setState({ hasError: true });
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>;
//     }
//     return this.props.children;
//   }
// }

// ErrorBoundary.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default ErrorBoundary;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error("ErrorBoundary caught an error", error, errorInfo);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

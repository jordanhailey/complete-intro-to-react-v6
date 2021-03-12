import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";
import { ErrorState } from '../APIResponseTypes';


class ErrorBoundary extends Component {
  state = {
    redirect: "",
    hasError: false
  };
  static getDerivedStateFromError(): ErrorState {
    return { hasError: true, redirect: false };
  }
  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }
  componentDidUpdate(): void {}

  render():ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/"/>
    } else if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

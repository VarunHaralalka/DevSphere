import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // send to monitoring service here if desired
    console.error("Unhandled error:", error, errorInfo);
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-4">
          <div className="alert alert-danger text-center">
            <h4>Something went wrong.</h4>
            <p>Please reload the page or try again later.</p>
            <button className="btn btn-primary" onClick={this.handleReload}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ textAlign: 'center', padding: 40, margin: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>😢</div>
          <div className="sec" style={{ marginBottom: 8 }}>Oops! Something went wrong</div>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16 }}>
            Don't worry — your data is safe. Try refreshing the page.
          </p>
          <button
            className="game-btn game-btn-primary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

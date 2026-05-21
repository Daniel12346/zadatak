import { Component, type ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback}>
          <div className={styles.card}>
            <div className={styles.icon}>⚠</div>
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.message}>
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <div className={styles.actions}>
              <button className={styles.retryBtn} onClick={this.handleRetry}>
                Try again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

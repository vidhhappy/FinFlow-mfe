import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { name: string; children: ReactNode };
type State = { failed: boolean };

export class RemoteBoundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(`[FinFlow] ${this.props.name} remote failed`, error, info); }
  render() {
    if (this.state.failed) return (
      <section className="remote-error" role="alert">
        <span className="remote-error__icon" aria-hidden="true">!</span>
        <div><strong>{this.props.name} is temporarily unavailable</strong><p>The rest of FinFlow remains operational.</p></div>
        <button type="button" onClick={() => window.location.reload()}>Try again</button>
      </section>
    );
    return this.props.children;
  }
}

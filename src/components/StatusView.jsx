import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import LoadingState from './LoadingState.jsx'

function StatusView({ loading, error, emptyMessage, hasData }) {
  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!hasData && emptyMessage) {
    return <EmptyState message={emptyMessage} />
  }

  return null
}

export default StatusView

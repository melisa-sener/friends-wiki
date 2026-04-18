import { useEffect, useRef, useState } from 'react'

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong while loading data.'
}

export function useAsyncData(loader, reloadKey) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: '',
  })
  const loaderRef = useRef(loader)

  useEffect(() => {
    loaderRef.current = loader
  }, [loader])

  useEffect(() => {
    let active = true

    queueMicrotask(async () => {
      setState((current) => ({
        data: current.data,
        loading: true,
        error: '',
      }))

      try {
        const data = await loaderRef.current()

        if (active) {
          setState({
            data,
            loading: false,
            error: '',
          })
        }
      } catch (error) {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: getErrorMessage(error),
          })
        }
      }
    })

    return () => {
      active = false
    }
  }, [reloadKey])

  return state
}

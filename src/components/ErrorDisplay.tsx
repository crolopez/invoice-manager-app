import { useContext } from 'react'
import { ApiErrorStateContext } from '../Contexts'

export default function ErrorDisplay(): JSX.Element {
  const apiErrorState = useContext(ApiErrorStateContext)

  return (
    <>
      {
        apiErrorState.apiErrors.map(x => (
          <div className='card card-body bg-primary text-danger' key={x.id}>
            {x.detail}
          </div>
        ))
      }
    </>
  )
}

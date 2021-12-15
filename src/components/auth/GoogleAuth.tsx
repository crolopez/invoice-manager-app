import { useContext } from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { AuthTokenStateContext } from '../../Contexts'
import { refreshTokenSetup } from '../../utils/refreshToken'
import { getConfig } from '../../utils/getConfig'

type Response = GoogleLoginResponse | GoogleLoginResponseOffline

export default function GoogleAuth(): JSX.Element {
  const { setAuthToken } = useContext(AuthTokenStateContext)

  const isGoogleLoginResponse = (response: Response):
    response is GoogleLoginResponse => {
    return !!response &&
      typeof response === 'object' &&
      !!(response as GoogleLoginResponse).tokenObj
  }

  const onSuccess = (res: Response) => {
    if(!isGoogleLoginResponse(res)) {
      return
    }

    alert(
      `Logged as ${res.profileObj.name}`
    )

    console.log(`[Login success] User: ${res.profileObj.name}`)

    setAuthToken(res.accessToken)
    refreshTokenSetup(res)
  }

  const onFailure = (res: Response) => {
    console.log(`[Login failed] Response: ${res}`)
  }

  return (
    <div>
      <GoogleLogin
        clientId={getConfig().GOOGLE_CLIENT_ID}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

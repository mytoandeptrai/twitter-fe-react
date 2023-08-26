import React from 'react'
import { styled } from 'styled-components'
import { AuthFormFields, AuthHeader } from './components'
import { EAuthScreen, loginFields, registerFields, useAuth } from './hooks'
import { CommonButton } from '@/components/shared'

const Auth = () => {
  const { formRef, screen, isLoginScreen, onChangeScreen, onChangeGender, onSubmit } = useAuth()

  return (
    <React.Fragment>
      <StyledRoot>
        <StyledMain>
          <AuthHeader isLoginScreen={isLoginScreen} onChangeScreen={onChangeScreen} />
          <StyledForm onSubmit={onSubmit} ref={formRef}>
            <AuthFormFields
              loginFields={loginFields}
              registerFields={registerFields}
              onChangeGender={onChangeGender}
              screen={screen}
            />
            <CommonButton type='submit'>{screen === EAuthScreen.Login ? 'Login' : 'Register'}</CommonButton>
          </StyledForm>
        </StyledMain>
      </StyledRoot>
    </React.Fragment>
  )
}

export default Auth

const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor1};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  border-radius: 0.8rem;
  overflow: auto;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
  padding: 3rem;
  min-width: 50rem;
`
export const StyledForm = styled.form`
  button {
    margin-top: 20px;
  }
`

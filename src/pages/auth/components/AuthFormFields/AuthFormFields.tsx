import React, { memo, useMemo } from 'react'
import { EAuthScreen, TInputField } from '../../hooks'
import { GenderSelector, UncontrolledInput } from '@/components/shared'
import { styled } from 'styled-components'
import { EGender } from '@/constants'

type Props = {
  loginFields: TInputField[]
  registerFields: TInputField[]
  screen: EAuthScreen
  onChangeGender: (gender: EGender) => void
}

const AuthFormFields = ({ loginFields, registerFields, screen, onChangeGender }: Props) => {
  const isRegisterScreen = useMemo(() => screen === EAuthScreen.Register, [screen])

  const renderRegisterField = () => {
    if (isRegisterScreen) {
      return (
        <StyledRegisterFields>
          {registerFields.map((field) => (
            <UncontrolledInput {...field} key={field.name} required={isRegisterScreen} />
          ))}
          <GenderSelector onChange={onChangeGender} />
        </StyledRegisterFields>
      )
    }

    return null
  }

  return (
    <React.Fragment>
      {loginFields?.map((field) => <UncontrolledInput {...field} key={field?.name} required />)}
      {renderRegisterField()}
    </React.Fragment>
  )
}

export default memo(AuthFormFields)

const StyledRegisterFields = styled.div`
  display: block;
`

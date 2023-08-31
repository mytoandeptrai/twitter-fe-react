import { ImageWithPlaceHolder } from '@/components/shared'
import { IUser } from '@/types'
import React, { useMemo } from 'react'

type Props = {
  user: Pick<IUser, 'avatar' | 'gender' | 'name' | '_id'>
  customStyles?: string
}

const SmallAvatar = ({ user, customStyles = '' }: Props) => {
  const customStyle = useMemo(() => {
    const string = `--size: 3.5rem;
    width: var(--size);
    height: var(--size);
    border-radius: 0.5rem;
    ${customStyles}
`

    return string
  }, [customStyles])

  return (
    <React.Fragment>
      <ImageWithPlaceHolder src={user?.avatar} alt={`${user?.name} avatar`} customStyles={customStyle} />
    </React.Fragment>
  )
}

export default SmallAvatar

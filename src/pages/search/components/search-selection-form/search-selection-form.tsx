import { StyledFlex } from '@/components'
import { EBoxShadow, EFontSize, EFontWeight } from '@/constants'
import { ESearchType } from '@/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineFileSearch } from 'react-icons/ai'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

type Props = {
  onSubmit: (e: any) => void
  onChange: (e: any) => void
  valueInput: string
  disabled?: boolean
}

const SearchSelectionForm = ({ onChange, onSubmit, valueInput, disabled = false }: Props) => {
  const { t } = useTranslation()

  const options = useMemo(() => {
    return [
      {
        id: uuid(),
        value: ESearchType.Tweet,
        title: t('tweet')
      },
      {
        id: uuid(),
        value: ESearchType.Hashtag,
        title: t('hashtag')
      },
      {
        id: uuid(),
        value: ESearchType.Comment,
        title: t('comment')
      },
      {
        id: uuid(),
        value: 'people',
        title: t('people')
      }
    ]
  }, [t])

  const renderSearchInput = () => {
    return (
      <StyledInput
        type='text'
        name='search'
        placeholder={t('searchPlaceholder')}
        onChange={onChange}
        value={valueInput}
        disabled={disabled}
      />
    )
  }

  const renderSearchSelection = () => {
    return (
      <StyledFlex gap={1} align='center'>
        <StyledCategoryLabel htmlFor='category'>{t('searchCategory')}</StyledCategoryLabel>

        <StyledCategorySelections name='category' id='searchCategory' onChange={onChange} disabled={disabled}>
          {options.map((opt) => {
            const { value, id, title } = opt
            return (
              <option value={value} key={id}>
                {title}
              </option>
            )
          })}
        </StyledCategorySelections>
      </StyledFlex>
    )
  }

  const renderSearchSubmitButton = () => {
    return (
      <StyledSubmitButton onClick={onSubmit} type='submit' disabled={disabled}>
        <AiOutlineFileSearch />
        {t('search')}
      </StyledSubmitButton>
    )
  }

  return (
    <StyledSearchForm onSubmit={onSubmit}>
      {renderSearchInput()}
      {renderSearchSelection()}
      {renderSearchSubmitButton()}
    </StyledSearchForm>
  )
}

export default SearchSelectionForm

const StyledSearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 3rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  padding: 2rem;
  border-radius: 0.5rem;
  justify-content: center;
`

const StyledInput = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 0.5px solid #e6e6e6;
`

const StyledCategoryLabel = styled.label`
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
`

const StyledCategorySelections = styled.select`
  border: 0.5px solid #e6e6e6;
  min-width: 20rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  outline: none;
  text-transform: capitalize;

  option {
    text-transform: capitalize;
  }
`

const StyledSubmitButton = styled.button`
  background: ${({ theme }) => theme.textColor2};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textColor4};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

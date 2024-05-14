'use client'
import type { KeyboardEventHandler } from 'react'

import { arrayMove } from '@dnd-kit/sortable'
import { getTranslation } from '@payloadcms/translations'
import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

import type { Option } from './types.js'
import type { Props as ReactSelectAdapterProps } from './types.js'
export type { Option } from './types.js'

import { Chevron } from '../../icons/Chevron/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { DraggableSortable } from '../DraggableSortable/index.js'
import { ClearIndicator } from './ClearIndicator/index.js'
import { Control } from './Control/index.js'
import { MultiValue } from './MultiValue/index.js'
import { MultiValueLabel } from './MultiValueLabel/index.js'
import { MultiValueRemove } from './MultiValueRemove/index.js'
import { SingleValue } from './SingleValue/index.js'
import { ValueContainer } from './ValueContainer/index.js'
import './index.scss'

const createOption = (label: string) => ({
  label,
  value: label,
})

const SelectAdapter: React.FC<ReactSelectAdapterProps> = (props) => {
  const { i18n, t } = useTranslation()
  const [inputValue, setInputValue] = React.useState('') // for creatable select

  const {
    className,
    components,
    customProps,
    disabled = false,
    filterOption = undefined,
    getOptionValue,
    isClearable = true,
    isCreatable,
    isLoading,
    isSearchable = true,
    noOptionsMessage = () => t('general:noOptions'),
    numberOnly = false,
    onChange,
    onMenuClose,
    onMenuOpen,
    options,
    placeholder = t('general:selectValue'),
    showError,
    value,
  } = props

  const loadingMessage = () => t('general:loading') + '...'

  const classes = [className, 'react-select', showError && 'react-select--error']
    .filter(Boolean)
    .join(' ')

  if (!isCreatable) {
    return (
      <Select
        captureMenuScroll
        customProps={customProps}
        isLoading={isLoading}
        placeholder={getTranslation(placeholder, i18n)}
        {...props}
        className={classes}
        classNamePrefix="rs"
        components={{
          ClearIndicator,
          Control,
          DropdownIndicator: Chevron,
          MultiValue,
          MultiValueLabel,
          MultiValueRemove,
          SingleValue,
          ValueContainer,
          ...components,
        }}
        filterOption={filterOption}
        getOptionValue={getOptionValue}
        isClearable={isClearable}
        isDisabled={disabled}
        isSearchable={isSearchable}
        loadingMessage={loadingMessage}
        menuPlacement="auto"
        noOptionsMessage={noOptionsMessage}
        onChange={onChange}
        onMenuClose={onMenuClose}
        onMenuOpen={onMenuOpen}
        options={options}
        value={value}
      />
    )
  }
  const handleKeyDown: KeyboardEventHandler = (event) => {
    // eslint-disable-next-line no-restricted-globals
    if (numberOnly === true) {
      const acceptableKeys = [
        'Tab',
        'Escape',
        'Backspace',
        'Enter',
        'ArrowRight',
        'ArrowLeft',
        'ArrowUp',
        'ArrowDown',
      ]
      const isNumber = !/\D/.test(event.key)
      const isActionKey = acceptableKeys.includes(event.key)
      if (!isNumber && !isActionKey) {
        event.preventDefault()
        return
      }
    }
    if (!value || !inputValue || inputValue.trim() === '') return
    if (filterOption && !filterOption(null, inputValue)) {
      return
    }
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        onChange([...(value as Option[]), createOption(inputValue)])
        setInputValue('')
        event.preventDefault()
        break
      default:
        break
    }
  }

  return (
    <CreatableSelect
      captureMenuScroll
      isLoading={isLoading}
      placeholder={getTranslation(placeholder, i18n)}
      {...props}
      className={classes}
      classNamePrefix="rs"
      components={{
        ClearIndicator,
        Control,
        DropdownIndicator: Chevron,
        MultiValue,
        MultiValueLabel,
        MultiValueRemove,
        SingleValue,
        ValueContainer,
        ...components,
      }}
      filterOption={filterOption}
      inputValue={inputValue}
      isClearable={isClearable}
      isDisabled={disabled}
      isSearchable={isSearchable}
      loadingMessage={loadingMessage}
      menuPlacement="auto"
      noOptionsMessage={noOptionsMessage}
      onChange={onChange}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      onMenuClose={onMenuClose}
      onMenuOpen={onMenuOpen}
      options={options}
      value={value}
    />
  )
}

const SortableSelect: React.FC<ReactSelectAdapterProps> = (props) => {
  const { onChange, value } = props

  let ids: string[] = []
  if (value)
    ids = Array.isArray(value)
      ? value.map((item) => item?.id ?? `${item?.value}`)
      : [value?.id || `${value?.value}`]

  return (
    <DraggableSortable
      className="react-select-container"
      ids={ids}
      onDragEnd={({ moveFromIndex, moveToIndex }) => {
        let sorted = value
        if (value && Array.isArray(value)) {
          sorted = arrayMove(value, moveFromIndex, moveToIndex)
        }
        onChange(sorted)
      }}
    >
      <SelectAdapter {...props} />
    </DraggableSortable>
  )
}

export const ReactSelect: React.FC<ReactSelectAdapterProps> = (props) => {
  const { isMulti, isSortable } = props

  if (isMulti && isSortable) {
    return <SortableSelect {...props} />
  }

  return <SelectAdapter {...props} />
}

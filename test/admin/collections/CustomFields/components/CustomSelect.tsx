'use client'

import type { Option } from 'payload'

import { SelectField, useField } from '@payloadcms/ui'
import React from 'react'

export const CustomSelect = ({ path }: { path: string }) => {
  const { setValue, value } = useField<string>({ path })
  const [options, setOptions] = React.useState<{ label: string; value: string }[]>([])

  React.useEffect(() => {
    const fetchOptions = () => {
      const fetchedOptions = [
        {
          label: 'Label 1',
          value: 'value1',
        },
        {
          label: 'Label 2',
          value: 'value2',
        },
      ]
      setOptions(fetchedOptions)
    }
    void fetchOptions()
  }, [])

  const onChange = (selected: Option | Option[]) => {
    const options = Array.isArray(selected) ? selected : [selected]
    setValue(options.map((option) => (typeof option === 'string' ? option : option.value)))
  }

  return (
    <div>
      <SelectField
        hasMany
        name={path}
        onChange={onChange}
        options={options}
        path={path}
        value={value}
      />
    </div>
  )
}

import React, { useRef, useEffect, useState } from 'react'
import Select from 'react-select'

import { useField } from '@rocketseat/unform'

import { SelectCustom, Container } from './styles'

export default function ReactSelect ({
  name,
  label,
  options,
  multiple,
  ...rest
}) {
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  
  // console.log(defaultValue)

  function parseSelectValue (selectRef) {
    // console.log('parseSelectValue')
    const selectValue = selectRef.state.value
    // const selectValue = defaultValue

    if (!multiple) {
      return selectValue ? selectValue.id : ''
    }

    return selectValue ? selectValue.map(option => option.id) : []
  }

  useEffect(() => {
    
    // console.log('useEffect')
    registerField({
      name: fieldName,
      ref: ref.current,     
      // path: 'state.value',
      
      // parseValue: parseSelectValue,
      // clearValue: selectRef => {
      //   selectRef.select.clearValue()
      // },
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(
            (option) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    })
  }, [ref.current, fieldName]) // eslint-disable-line

  function getDefaultValue () {
    
    if (!defaultValue) return null

    if (!multiple) {
      return options.find(option => option.id === defaultValue)
    }

    return options.filter(option => defaultValue.includes(option.id))
  }

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <SelectCustom
        classNamePrefix='react-select'
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isLoading={options.length === 0}
        isMulti={multiple}
        // defaultValue={getDefaultValue()}
        defaultValue={defaultValue}
        ref={ref}
        // getOptionValue={option => option.id}
        // getOptionLabel={option => option.title}
        placeholder='Selecione...'
        noOptionsMessage={() => 'Nenhum item encontrado'}
        menuPlacement="auto"
        {...rest}
      />

      {error && <span>{error}</span>}
    </Container>
  )
}


// import React, { useRef, useEffect } from "react";
// import ReactSelect from "react-select";
// import { useField } from "@unform/core";
// // import { useField } from '@rocketseat/unform'

// const Select = ({ name, options, ...rest }) => {
//   const selectRef = useRef(null);
//   const { fieldName, defaultValue, registerField, error } = useField(name);

//   console.log(defaultValue);

//   useEffect(() => {
//     registerField({
//       name: fieldName,
//       ref: selectRef.current,
//       path: "state.value",
//       getValue: ref => {
//         if (rest.isMulti) {
//           if (!ref.state.value) {
//             return [];
//           }
//           return ref.state.value.map(option => option.value);
//         } else {
//           if (!ref.state.value) {
//             return "";
//           }
//           return ref.state.value.value;
//         }
//       }
//     });
//   }, [fieldName, registerField, rest.isMulti]);

//   return (
//     <ReactSelect
//       defaultValue={
//         defaultValue && options.find(option => option.value === defaultValue)
//       }
//       ref={selectRef}
//       classNamePrefix="react-select"
//       options={options}
//       {...rest}
//     />
//   );
// };
// export default Select;

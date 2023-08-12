import { GroupContainer, FormInputContainer, FormInputLabel } from './form-input.styles'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <GroupContainer>
      <FormInputContainer {...otherProps} />
      {label && (
        <FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''}`}>{label}</FormInputLabel>
      )}
    </GroupContainer>
  )
}

export default FormInput

import React, { useState } from 'react'
import RadioButtons from './RadioButtons'

/*
- Credit card
- Country
- Company name
- Company VAT or EIN/FTIN number
*/

const ContactInfoForm = ({ companyRequired = false, onChange }) => {
  const ENTITY_COMPANY = 'Company'
  const [entityType, setEntityType] = useState(ENTITY_COMPANY)
  const [contactInfo, setContactInfo] = useState({
    name: '',
    tax_id: '',
    email: ''
  })
  const setContactInfoAndUpdate = (props) => {
    setContactInfo(props)
    onChange && onChange(props)
  }

  const handleContactInfoChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setContactInfoAndUpdate({
      ...contactInfo,
      [event.target.name]: value
    })
  }

  const companyRequiredMessage = (companyRequired && entityType !== ENTITY_COMPANY) && 'Sorry, we only support companies as customers'

  return (
    <form>
      This is a:
      <RadioButtons
        group='entityType'
        options={[ENTITY_COMPANY, 'Person']}
        value={entityType}
        onChange={setEntityType}
      />

      {companyRequiredMessage && (
        <p>{companyRequiredMessage}.</p>
      )}

      <label>
        {entityType === ENTITY_COMPANY ? 'Company Name' : 'Name'}
        <input
          name='name'
          placeholder={entityType === ENTITY_COMPANY ? 'Company Name' : 'Name'}
          required
          value={contactInfo.name}
          onChange={handleContactInfoChange}
        />
      </label>
      {entityType === ENTITY_COMPANY && (
        <label>
          VAT ID (or EIN/FTIN)
          <input
            name='tax_id'
            placeholder='VAT ID (or EIN/FTIN)'
            required
            value={contactInfo.tax_id}
            onChange={handleContactInfoChange}
          />
        </label>
      )}
      <label>
        Email
        <input
          name='email'
          placeholder='Email'
          required
          type='email'
          value={contactInfo.email}
          onChange={handleContactInfoChange}
        />
      </label>
    </form>
  )
}
export default ContactInfoForm

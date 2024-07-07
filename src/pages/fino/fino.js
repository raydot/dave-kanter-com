import React, { useState } from 'react'
import '../../assets/scss/components/_fino.scss'

const Fino = props => {
  // const form = document.getElementById('#form')
  const gScriptURL =
    'https://script.google.com/macros/s/AKfycbzceLZQ0i1_ObLsjaz-UEh_HUWRphjV-0inuUe2pORu5OHPju5DYN4EB3RIdrJeDI0D/exec'

  const [buttonDisabled, setButtonDisabled] = useState(false)
  // const [values, setValues] = useState({
  //   Who: '',
  //   Amount: '123.00',
  //   Category: 'Testing',
  // })

  // function handleValueChange(e) {
  //   const [name, value] = e.target
  //   setValues(prevState => ({
  //     ...prevState,
  //     [name]: value,
  //   }))
  //   console.log(values)
  // }

  function submit(event) {
    let form = event.target
    console.log('log')
    console.log(getDate())

    // setValues('')
    event.preventDefault()

    setButtonDisabled(true)

    // console.log(values)
    let body = new FormData(form)

    fetch(gScriptURL, { method: 'POST', body: body })
      .then(response => {
        alert('Success!', response)
        console.log('response: ', response)
        setButtonDisabled(false)
      })
      .catch(error => {
        alert('Error!', error.message)
        console.log(error.message)
        setButtonDisabled(false)
      })
  }

  // function handleValueChange(event) {
  //   setValues(event.target.value)
  // }

  function getDate() {
    return Date.now()
  }

  return (
    <form onSubmit={submit} id="finoForm">
      {/* <label htmlFor="in_date">Date</label>
      <input type="text" ></input> */}
      <label htmlFor="in_who">Who?</label>
      <input
        name="Who"
        id="who"
        type="text"
        // value={values.Who}
        // onChange={handleValueChange}
      />
      <label htmlFor="in_amount">Amount</label>
      <input
        name="Amount"
        id="amount"
        type="text"
        // value={values.Amount}
        // onChange={handleValueChange}
      />
      <label htmlFor="in_category">Category</label>
      <input
        name="Note"
        id="note"
        type="text"
        // value={values.Category}
        // onChange={handleValueChange}
      />
      <button type="submit" id="submitButton" disabled={buttonDisabled}>
        Submit!
      </button>
    </form>
  )
}

export default Fino

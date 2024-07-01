import React from 'react'

function log() {
  console.log('log')
  console.log(getDate)
}

function getDate() {
  return Date.now()
}

function fino() {
  return (
    <form action={log}>
      <label for="in_date">Date</label>
      <input></input>
      <label for="in_who">Who?</label>
      <input></input>
      <label for="in_amount">Amount</label>
      <input></input>
      <label for="in_category">Category</label>
      <input></input>
    </form>
  )
}

export default fino

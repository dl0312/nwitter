import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnChange = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={handleOnChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handleOnChange}
        />
        <input type="sumbit" valeu="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth

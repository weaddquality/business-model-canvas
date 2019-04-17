const cases = require('jest-in-case')
import { validateForm } from './Signup'

cases(
  'validateForm(email, password, confirmPassword)',
  opts => {
    expect(validateForm(opts.email, opts.password, opts.confirmPassword)).toBe(opts.result)
  },
  [
    {
      name: 'correct credentials',
      email: 'stefan.franzen@addq.se',
      password: 'ADDQbmc123!',
      confirmPassword: 'ADDQbmc123!',
      result: true,
    },
    {
      name: 'passwords mismatching',
      email: 'stefan.franzen@addq.se',
      password: 'ADDQbmc123!',
      confirmPassword: 'ADDQbmc123',
      result: false,
    },
    {
      name: 'all arguments are missing',
      email: '',
      password: '',
      confirmPassword: '',
      result: false,
    },
    {
      name: 'email missing',
      email: '',
      password: 'ADDQbmc123!',
      confirmPassword: 'ADDQbmc123!',
      result: false,
    },
    {
      name: 'password missing',
      email: 'stefan.franzen@addq.se',
      password: '',
      confirmPassword: 'ADDQbmc123!',
      result: false,
    },
    {
      name: 'confirm password missing',
      email: 'stefan.franzen@addq.se',
      password: 'ADDQbmc123!',
      confirmPassword: '',
      result: false,
    },
    {
      name: 'email does not match "@addq.se"',
      email: 'stefan.franzen@addq.s',
      password: 'ADDQbmc123!',
      confirmPassword: 'ADDQbmc123!',
      result: false,
    },
    {
      name: 'email ends with "@addq.se"',
      email: 'stefan.franzen@addq.se',
      password: 'ADDQbmc123!',
      confirmPassword: 'ADDQbmc123!',
      result: true,
    },
    {
      name: 'email lack a leading character before "@addq.se"',
      email: '@addq.se',
      password: 'ADDQbmc123!',
      confirmPassword: 'ADDQbmc123!',
      result: false,
    },
  ]
)

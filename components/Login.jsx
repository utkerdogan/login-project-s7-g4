import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, FormFeedback } from 'reactstrap'


export default function Login() {


  const initialForm = {
    ad: '',
    soyad: '',
    email: '',
    password: '',
    terms: false,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validate();
  }, [form]);

  const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 4 characters long',
    terms: 'You must accept the terms and conditions',
  };

  const validate = () => {
    const newErrors = {};
  
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = errorMessages.email;
    }
  
    if (form.password && form.password.length < 4) {
      newErrors.password = errorMessages.password;
    }
  
    if (!form.terms) {
      newErrors.terms = errorMessages.terms;
    }
  
    const isFormFilled = form.email && form.password;
    setErrors(newErrors);
    setIsValid(isFormFilled && Object.keys(newErrors).length === 0);
  };

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <>
    <Card>
      <CardHeader>Kayıt ol</CardHeader>
    <CardBody>
    <Form>
      <FormGroup>
        <Label for="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="Email adresinizi girin"
          type="email"
          value={form.email}
          onChange={handleChange}
          invalid={!!errors.email}
        />
        {!!errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="password">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          placeholder="Sifrenizi girin"
          type="password"
          value={form.password}
          onChange={handleChange}
          invalid={!!errors.password}
        />
        {!!errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!!errors.terms}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {!!errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
      </FormGroup>
      <Button color="primary" disabled={!isValid}>
        Kayıt ol
      </Button>
    </Form>
      </CardBody>
    </Card>
    
    </>
  )
}
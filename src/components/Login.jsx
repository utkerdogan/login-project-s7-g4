import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const initialForm = {
    email: '',
    password: '',
    terms: false,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const errorMessages = {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 4 characters long',
    terms: 'You must accept the terms and conditions',
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = errorMessages.email;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 4) {
      newErrors.password = errorMessages.password;
    }

    if (!form.terms) {
      newErrors.terms = errorMessages.terms;
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      navigate('/success');
    }
  };

  return (
    <Card>
      <CardHeader>Kayıt ol</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email adresinizi girin"
              type="email"
              value={form.email}
              onChange={handleChange}
              invalid={!!errors.email}
              data-cy="email-input"
            />
            {errors.email && <FormFeedback data-cy="error-message">{errors.email}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Şifrenizi girin"
              type="password"
              value={form.password}
              onChange={handleChange}
              invalid={!!errors.password}
              data-cy="password-input"
            />
            {errors.password && <FormFeedback data-cy="error-message">{errors.password}</FormFeedback>}
          </FormGroup>
          <FormGroup check>
            <Input
              id="terms"
              name="terms"
              checked={form.terms}
              type="checkbox"
              onChange={handleChange}
              invalid={!!errors.terms}
              data-cy="terms-checkbox"
            />{' '}
            <Label htmlFor="terms" check>
              I agree to terms of service and privacy policy
            </Label>
            {errors.terms && <FormFeedback data-cy="error-message">{errors.terms}</FormFeedback>}
          </FormGroup>
          <Button color="primary" disabled={!isValid} data-cy="submit-button">
            Kayıt ol
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

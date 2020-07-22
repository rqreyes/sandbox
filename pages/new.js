import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';

const NewNote = () => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createNote = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = 'Title is required';
    }
    if (!form.description) {
      err.description = 'Description is required';
    }

    return err;
  };

  return (
    <div className='form-container'>
      <h1>Create Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline='centered' />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: 'Please enter a title', pointing: 'below' }
                  : null
              }
              label='Title'
              placeholder='Title'
              name='title'
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              error={
                errors.description
                  ? { content: 'Please enter a description', pointing: 'below' }
                  : null
              }
              label='Description'
              placeholder='Description'
              name='description'
              onChange={handleChange}
            />
            <Button type='submit'>Create</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default NewNote;

import React from 'react';
import { useFormik } from 'formik';

export function MessageForm(props) {
  const { onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.message);
      resetForm();
    },
  });

  return (
    <div className='messenger-form'>
      <form onSubmit={formik.handleSubmit}>
        <input
          id='message'
          name='message'
          type='message'
          className='messenger-roomForm-input'
          placeholder='Type message ...'
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <button type='submit' className='messenger-formButton'>Send</button>
      </form>
    </div>
  );
}

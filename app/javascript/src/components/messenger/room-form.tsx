import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { createRoom } from './actions';

export default function RoomForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm } )=> {
      createRoom(dispatch, { room: { name: values.name } });
      resetForm();
    },
  });

  return (
    <div className='messenger-content'>
      <div className='messenger-form'>
        <h2> Create new room</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            id='name'
            name='name'
            type='name'
            className='messenger-roomForm-input'
            placeholder='Type new chat room name...'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <button type='submit' className='messenger-formButton'>Submit</button>
        </form>
      </div>
    </div>
  );
}

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createSession, updateSession } from '../services/sessionService'; // Correct import
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SessionSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Date must be in the future'),
  time: Yup.string()
    .required('Time is required')
    .matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format (HH:mm)'),
  capacity: Yup.number()
    .required('Capacity is required')
    .min(1, 'Capacity must be at least 1'),
});

function SessionForm({ session }) {
  const navigate = useNavigate();
  const isEdit = !!session;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Formik
        initialValues={{
          title: session?.title || '',
          date: session?.date || '',
          time: session?.time || '',
          capacity: session?.capacity || 1,
        }}
        validationSchema={SessionSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (isEdit) {
              await updateSession(session._id, values);
              toast.success('Session updated successfully');
            } else {
              await createSession(values);
              toast.success('Session created successfully');
            }
            navigate('/sessions');
          } catch (error) {
            toast.error('Error saving session');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">
              {isEdit ? 'Edit Session' : 'Create Session'}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <Field
                type="text"
                name="title"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <Field
                type="date"
                name="date"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time</label>
              <Field
                type="time"
                name="time"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <Field
                type="number"
                name="capacity"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="capacity"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Saving...' : 'Save Session'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SessionForm;
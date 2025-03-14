import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/authService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            });
            toast.success('Registration successful');
            navigate('/login');
          } catch (error) {
            console.error('Registration error:', error); // Log the error
            toast.error(error.message || 'Registration failed');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Register</h2>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Field type="text" name="firstName" className="w-full p-2 border rounded" />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Field type="text" name="lastName" className="w-full p-2 border rounded" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Field type="email" name="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <Field type="password" name="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="w-full p-2 border rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;